/**
 * @file customtestbuilder.js
 * @description Handles the logic for the Custom Test Builder and launches new page with results
 * @author Phil Traversa
 * @license https://www.gnu.org/licenses/agpl-3.0.txt
 * @requires helpers.js
 */
document.addEventListener('DOMContentLoaded', () => {
    if (!window.dlpTestHelpers) {
        console.error('FATAL: helpers.js has not loaded properly.');
        alert('A required file is missing (helpers.js) and the builder will not function. Please check the browser console for details.');
        return;
    }

    const customForm = document.getElementById('custom-form');
    const generateBtn = document.getElementById('generate-btn');
    const ccnCheckbox = document.getElementById('ccn');
    const ccnLabel = document.querySelector('label[for="ccn"]');

    let ccnClickCount = 0;
    let clickTimer = null;
    let isHardMode = false;

    const enterHardMode = () => {
        if (isHardMode) return; // prevent user retriggering HARD MODE
        isHardMode = true;

        // HARD MODE: disable all other interactive page elements
        const elementsToDisable = document.querySelectorAll('.card, .checkbox-item:not(:has(#ccn)) input, .checkbox-item:not(:has(#ccn)) label');
        elementsToDisable.forEach(el => {
            el.style.pointerEvents = 'none';
            el.style.opacity = '0.6';
            if (el.tagName === 'INPUT') {
                el.disabled = true;
            }
        });

        // HARD MODE: change bottom button color and text
        generateBtn.classList.add('hard-mode-btn');
        generateBtn.textContent = 'Generate Custom PII Test Data: HARD MODE';

        // HARD MODE: show modal
        document.getElementById('hard-mode-overlay').style.display = 'block';
        document.getElementById('hard-mode-modal').style.display = 'block';

        // HARD MODE: replace CCN tooltip on index.html with new text
        const ccnTooltip = document.querySelector('label[for="ccn"] .tooltip-container');
        if (ccnTooltip) {
            ccnTooltip.dataset.tooltipText = '<span class="hard-mode-red"><b>HARD MODE enabled</b></span><br><br>Your DLP software may be fooled by simultaneously valid yet invalid CCNs.<br><br><i>Refresh the page to revert back to normal mode</i>';
        }
    };

    // HARD MODE counter logic
    const ccnClickListener = () => {
        clearTimeout(clickTimer);
        ccnClickCount++;

        if (ccnClickCount === 5) {
            enterHardMode();
        }
        
        // HARD MODE: reset click counter if user stops for two seconds
        clickTimer = setTimeout(() => {
            ccnClickCount = 0;
        }, 2000);
    };

    if (ccnCheckbox && ccnLabel) {
        ccnCheckbox.addEventListener('click', ccnClickListener);
    }
    
    // HARD MODE: dismiss modal
    document.getElementById('hard-mode-ok-btn').addEventListener('click', () => {
        document.getElementById('hard-mode-overlay').style.display = 'none';
        document.getElementById('hard-mode-modal').style.display = 'none';
    });

    // primary form submission logic
    customForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';

        try {
            let selectedPiiTypes, filesToFetch;

            if (isHardMode) {
                // HARD MODE: override selections and normal behavior
                selectedPiiTypes = [{ key: 'ccns', label: 'Credit Card Number' }];
                filesToFetch = ['names', 'ccns-bogus'];

            } else {
                // NORMAL MODE: standard logic
                const checkedBoxes = document.querySelectorAll('input[name="pii-type"]:checked');
                selectedPiiTypes = Array.from(checkedBoxes).map(box => ({ key: box.value, label: box.dataset.label }));
                filesToFetch = ['names', ...selectedPiiTypes.map(p => p.key).filter(k => k !== 'dls')];
            }

            const promises = filesToFetch.map(file => fetch(`data/${file}.json`));
            const responses = await Promise.all(promises);
            for (const response of responses) {
                if (!response.ok) throw new Error(`Failed to load data file: ${response.url}`);
            }

            const datasets = await Promise.all(responses.map(res => res.json()));
            datasets.forEach(dataset => window.dlpTestHelpers.shuffleArray(dataset));

            const dataMap = {};
            
            // HARD MODE: map 'ccns-bogus' to 'ccns' for processing
            filesToFetch.forEach((key, index) => {
                const dataKey = key === 'ccns-bogus' ? 'ccns' : key;
                dataMap[dataKey] = datasets[index];
            });

            const minLength = Math.min(...Object.values(dataMap).map(arr => arr.length));
            const recordCount = Math.min(30, minLength);

            const combinedData = [];
            for (let i = 0; i < recordCount; i++) {
                const record = {};
                const currentName = dataMap['names'][i];
                record['name'] = currentName;

                selectedPiiTypes.forEach((pii) => {
                    const simpleKey = pii.label.toLowerCase().replace(/[^a-z0-9]/g, '');
                    if (pii.key === 'dls') {
                        record[simpleKey] = window.dlpTestHelpers.generateDL(currentName);  // shared generateDL function from helpers.js
                    } else {
                        const dataArray = dataMap[pii.key];
                        const dataValue = dataArray[i];
                        if (pii.key === 'ach') {
                            record[simpleKey] = `${dataValue.routing} ${dataValue.account}`;
                        } else {
                            record[simpleKey] = dataValue;
                        }
                    }
                });
                combinedData.push(record);
            }

            const headers = ['Name', ...selectedPiiTypes.map(pii => pii.label)];
            const reportPayload = {
                headers: headers,
                data: combinedData,
                isHardMode: isHardMode
            };

            sessionStorage.setItem('dlpTestPayload', JSON.stringify(reportPayload));
            window.open('custom.html', '_blank');

        } catch (error) {
            console.error('An error occurred during data generation:', error);
            alert('Could not generate data. Please check the console for errors.');
        } finally {
            generateBtn.disabled = false;
            // set button text based on mode
            generateBtn.textContent = isHardMode 
                ? 'Generate Custom PII Test Data: HARD MODE' 
                : 'Generate Custom PII Test Data';
        }
    });
});
