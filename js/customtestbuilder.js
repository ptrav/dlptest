/**
 * @file customtestbuilder.js
 * @description Handles the logic for the Custom Test Builder and launches new page with results
 * @author Phil Traversa
 * @license https://www.gnu.org/licenses/agpl-3.0.txt
 * @requires helpers.js
 */
document.addEventListener('DOMContentLoaded', () => {
    if (!window.dlpTestHelpers) {
        console.error('FATAL: helpers.js has not loaded properly');
        alert('A critical file is missing and the custom test builder cannot function. Please check the browser console for errors.');
        return;
    }

    const customForm = document.getElementById('custom-form');
    const generateBtn = document.getElementById('generate-btn');

    // event listener for the generate button
    customForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';

        const checkedBoxes = document.querySelectorAll('input[name="pii-type"]:checked');
        const selectedPiiTypes = Array.from(checkedBoxes).map(box => ({ key: box.value, label: box.dataset.label }));

        try {
            // determine which JSON files to load based on user selection
            const filesToFetch = ['names', ...selectedPiiTypes.map(p => p.key).filter(k => k !== 'dls')];
            const promises = filesToFetch.map(file => fetch(`data/${file}.json`));

            const responses = await Promise.all(promises);

            // error handling for failed network requests or missing JSONs
            for (const response of responses) {
                if (!response.ok) throw new Error(`Failed to load data file: ${response.url}`);
            }

            const datasets = await Promise.all(responses.map(res => res.json()));

            // use the shared shuffleArray function from helpers.js for each dataset
            datasets.forEach(dataset => window.dlpTestHelpers.shuffleArray(dataset));
            
            // map shuffled datasets back to their keys for easy access
            const dataMap = {};
            filesToFetch.forEach((key, index) => { dataMap[key] = datasets[index]; });

            // determine the number of records to generate, capped at 30 or the quantity of the smallest dataset
            const minLength = Math.min(...Object.values(dataMap).map(arr => arr.length));
            const recordCount = Math.min(30, minLength);
            
            const combinedData = [];
            for (let i = 0; i < recordCount; i++) {
                const record = {};
                const currentName = dataMap['names'][i];
                record['name'] = currentName;

                selectedPiiTypes.forEach((pii) => {
                    const simpleKey = pii.label.toLowerCase().replace(/[^a-z0-9]/g, '');
                    
                    // check for specific PII types that require extra processing
                    if (pii.key === 'dls') {
                        record[simpleKey] = window.dlpTestHelpers.generateDL(currentName);  // shared generateDL function from helpers.js
                    } else {
                        const dataArray = dataMap[pii.key];
                        const dataValue = dataArray[i];

                        // apply formatting for ACH and CCN objects
                        if (pii.key === 'ach') {
                            record[simpleKey] = `${dataValue.routing} ${dataValue.account}`;
                        } else {
                            record[simpleKey] = dataValue;
                        }
                    }
                });
                combinedData.push(record);
            }
            
            // prepare final payload, store payload, then open results page
            const headers = ['Name', ...selectedPiiTypes.map(pii => pii.label)];
            const reportPayload = {
                headers: headers,
                data: combinedData
            };
            
            sessionStorage.setItem('dlpTestPayload', JSON.stringify(reportPayload));
            window.open('custom.html', '_blank');
        } catch (error) {
            // error handling catch-all
            console.error('An error occurred during data generation:', error);
            alert('Could not generate data. Please check the console for errors.');
        } finally {
            // reset button state
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate Custom Data Page';
        }
    });
});
