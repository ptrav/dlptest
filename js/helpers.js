/**
 * @file helpers.js
 * @description A centralized library of helper functions for the application
 * @author Phil Traversa
 * @license https://www.gnu.org/licenses/agpl-3.0.txt
 */
(() => {
    window.dlpTestHelpers = {}; // create a global object to attach all helpers

    /**
     * Shuffles an array in place using the Fisher-Yates algorithm
     * @param {Array} array The array to shuffle
     */
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };
    window.dlpTestHelpers.shuffleArray = shuffleArray;

    /**
     * Helper used by formatCCN to set theme-responsive card brand logos.<p>
     * SVG icongraphy is from Font Awesome Free and licensed under CC BY 4.0
     * @param {string} type - The card type abbreviation ('VI', 'MC', 'AE', 'DC')
     * @returns {string} The raw, complete SVG string for the icon
     * @license https://creativecommons.org/licenses/by/4.0/
     */
    const getCardIcon = (type) => {
        const icons = {
            'VI': '<svg class="cc-icon" data-card-brand="Visa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M470.1 231.3s7.6 37.2 9.3 45l-33.4 0c3.3-8.9 16-43.5 16-43.5-.2 .3 3.3-9.1 5.3-14.9l2.8 13.4zM576 80l0 352c0 26.5-21.5 48-48 48L48 480c-26.5 0-48-21.5-48-48L0 80C0 53.5 21.5 32 48 32l480 0c26.5 0 48 21.5 48 48zM152.5 331.2l63.2-155.2-42.5 0-39.3 106-4.3-21.5-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1l-64.7 0-.7 3.1c15.8 4 29.9 9.8 42.2 17.1l35.8 135 42.5 0zm94.4 .2l25.2-155.4-40.2 0-25.1 155.4 40.1 0zm139.9-50.8c.2-17.7-10.6-31.2-33.7-42.3-14.1-7.1-22.7-11.9-22.7-19.2 .2-6.6 7.3-13.4 23.1-13.4 13.1-.3 22.7 2.8 29.9 5.9l3.6 1.7 5.5-33.6c-7.9-3.1-20.5-6.6-36-6.6-39.7 0-67.6 21.2-67.8 51.4-.3 22.3 20 34.7 35.2 42.2 15.5 7.6 20.8 12.6 20.8 19.3-.2 10.4-12.6 15.2-24.1 15.2-16 0-24.6-2.5-37.7-8.3l-5.3-2.5-5.6 34.9c9.4 4.3 26.8 8.1 44.8 8.3 42.2 .1 69.7-20.8 70-53zM528 331.4l-32.4-155.4-31.1 0c-9.6 0-16.9 2.8-21 12.9l-59.7 142.5 42.2 0s6.9-19.2 8.4-23.3l51.6 0c1.2 5.5 4.8 23.3 4.8 23.3l37.2 0z"/></svg>',
            'MC': '<svg class="cc-icon" data-card-brand="Mastercard" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M482.9 410.3c0 6.8-4.6 11.7-11.2 11.7-6.8 0-11.2-5.2-11.2-11.7s4.4-11.7 11.2-11.7c6.6 0 11.2 5.2 11.2 11.7zM172.1 398.6c-7.1 0-11.2 5.2-11.2 11.7S165 422 172.1 422c6.5 0 10.9-4.9 10.9-11.7-.1-6.5-4.4-11.7-10.9-11.7zm117.5-.3c-5.4 0-8.7 3.5-9.5 8.7l19.1 0c-.9-5.7-4.4-8.7-9.6-8.7zm107.8 .3c-6.8 0-10.9 5.2-10.9 11.7s4.1 11.7 10.9 11.7 11.2-4.9 11.2-11.7c0-6.5-4.4-11.7-11.2-11.7zm105.9 26.1c0 .3 .3 .5 .3 1.1 0 .3-.3 .5-.3 1.1-.3 .3-.3 .5-.5 .8-.3 .3-.5 .5-1.1 .5-.3 .3-.5 .3-1.1 .3-.3 0-.5 0-1.1-.3-.3 0-.5-.3-.8-.5-.3-.3-.5-.5-.5-.8-.3-.5-.3-.8-.3-1.1 0-.5 0-.8 .3-1.1 0-.5 .3-.8 .5-1.1 .3-.3 .5-.3 .8-.5 .5-.3 .8-.3 1.1-.3 .5 0 .8 0 1.1 .3 .5 .3 .8 .3 1.1 .5s.2 .6 .5 1.1zm-2.2 1.4c.5 0 .5-.3 .8-.3 .3-.3 .3-.5 .3-.8s0-.5-.3-.8c-.3 0-.5-.3-1.1-.3l-1.6 0 0 3.5 .8 0 0-1.4 .3 0 1.1 1.4 .8 0-1.1-1.3zM576 81l0 352c0 26.5-21.5 48-48 48L48 481c-26.5 0-48-21.5-48-48L0 81C0 54.5 21.5 33 48 33l480 0c26.5 0 48 21.5 48 48zM64 220.6c0 76.5 62.1 138.5 138.5 138.5 27.2 0 53.9-8.2 76.5-23.1-72.9-59.3-72.4-171.2 0-230.5-22.6-15-49.3-23.1-76.5-23.1-76.4-.1-138.5 62-138.5 138.2zM288 329.4c70.5-55 70.2-162.2 0-217.5-70.2 55.3-70.5 162.6 0 217.5zM145.7 405.7c0-8.7-5.7-14.4-14.7-14.7-4.6 0-9.5 1.4-12.8 6.5-2.4-4.1-6.5-6.5-12.2-6.5-3.8 0-7.6 1.4-10.6 5.4l0-4.4-8.2 0 0 36.7 8.2 0c0-18.9-2.5-30.2 9-30.2 10.2 0 8.2 10.2 8.2 30.2l7.9 0c0-18.3-2.5-30.2 9-30.2 10.2 0 8.2 10 8.2 30.2l8.2 0 0-23-.2 0zM190.6 392l-7.9 0 0 4.4c-2.7-3.3-6.5-5.4-11.7-5.4-10.3 0-18.2 8.2-18.2 19.3 0 11.2 7.9 19.3 18.2 19.3 5.2 0 9-1.9 11.7-5.4l0 4.6 7.9 0 0-36.8zm40.5 25.6c0-15-22.9-8.2-22.9-15.2 0-5.7 11.9-4.8 18.5-1.1l3.3-6.5c-9.4-6.1-30.2-6-30.2 8.2 0 14.3 22.9 8.3 22.9 15 0 6.3-13.5 5.8-20.7 .8l-3.5 6.3c11.2 7.6 32.6 6 32.6-7.5zm35.4 9.3l-2.2-6.8c-3.8 2.1-12.2 4.4-12.2-4.1l0-16.6 13.1 0 0-7.4-13.1 0 0-11.2-8.2 0 0 11.2-7.6 0 0 7.3 7.6 0 0 16.7c0 17.6 17.3 14.4 22.6 10.9zm13.3-13.4l27.5 0c0-16.2-7.4-22.6-17.4-22.6-10.6 0-18.2 7.9-18.2 19.3 0 20.5 22.6 23.9 33.8 14.2l-3.8-6c-7.8 6.4-19.6 5.8-21.9-4.9zM338.9 392c-4.6-2-11.6-1.8-15.2 4.4l0-4.4-8.2 0 0 36.7 8.2 0 0-20.7c0-11.6 9.5-10.1 12.8-8.4l2.4-7.6zm10.6 18.3c0-11.4 11.6-15.1 20.7-8.4l3.8-6.5c-11.6-9.1-32.7-4.1-32.7 15 0 19.8 22.4 23.8 32.7 15l-3.8-6.5c-9.2 6.5-20.7 2.6-20.7-8.6zM416.2 392l-8.2 0 0 4.4c-8.3-11-29.9-4.8-29.9 13.9 0 19.2 22.4 24.7 29.9 13.9l0 4.6 8.2 0 0-36.8zm33.7 0c-2.4-1.2-11-2.9-15.2 4.4l0-4.4-7.9 0 0 36.7 7.9 0 0-20.7c0-11 9-10.3 12.8-8.4l2.4-7.6zm40.3-14.9l-7.9 0 0 19.3c-8.2-10.9-29.9-5.1-29.9 13.9 0 19.4 22.5 24.6 29.9 13.9l0 4.6 7.9 0 0-51.7zm7.6-75.1l0 4.6 .8 0 0-4.6 1.9 0 0-.8-4.6 0 0 .8 1.9 0zm6.6 123.8c0-.5 0-1.1-.3-1.6-.3-.3-.5-.8-.8-1.1s-.8-.5-1.1-.8c-.5 0-1.1-.3-1.6-.3-.3 0-.8 .3-1.4 .3-.5 .3-.8 .5-1.1 .8-.5 .3-.8 .8-.8 1.1-.3 .5-.3 1.1-.3 1.6 0 .3 0 .8 .3 1.4 0 .3 .3 .8 .8 1.1 .3 .3 .5 .5 1.1 .8 .5 .3 1.1 .3 1.4 .3 .5 0 1.1 0 1.6-.3 .3-.3 .8-.5 1.1-.8s.5-.8 .8-1.1c.3-.6 .3-1.1 .3-1.4zm3.2-124.7l-1.4 0-1.6 3.5-1.6-3.5-1.4 0 0 5.4 .8 0 0-4.1 1.6 3.5 1.1 0 1.4-3.5 0 4.1 1.1 0 0-5.4zm4.4-80.5c0-76.2-62.1-138.3-138.5-138.3-27.2 0-53.9 8.2-76.5 23.1 72.1 59.3 73.2 171.5 0 230.5 22.6 15 49.5 23.1 76.5 23.1 76.4 .1 138.5-61.9 138.5-138.4z"/></svg>',
            'AE': '<svg class="cc-icon" data-card-brand="American Express" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M0 432c0 26.5 21.5 48 48 48l480 0c26.5 0 48-21.5 48-48l0-1.1-61.7 0-31.9-35.1-31.9 35.1-203.7 0 0-163.8-65.8 0 81.7-184.7 78.6 0 28.1 63.2 0-63.2 97.2 0 16.9 47.6 17-47.6 75.5 0 0-2.4c0-26.5-21.5-48-48-48L48 32C21.5 32 0 53.5 0 80L0 432zm440.4-21.7l42.2-46.3 42 46.3 51.4 0-68-72.1 68-72.1-50.6 0-42 46.7-41.5-46.7-51.4 0 67.5 72.5-67.4 71.6 0-33.1-83 0 0-22.2 80.9 0 0-32.3-80.9 0 0-22.4 83 0 0-33.1-122 0 0 143.2 171.8 0zm96.3-72l39.3 41.9 0-83.3-39.3 41.4zm-36.3-92l36.9-100.6 0 100.6 38.7 0 0-143.3-60.2 0-32.2 89.3-31.9-89.3-61.2 0 0 143.1-63.2-143.1-51.2 0-62.4 143.3 43 0 11.9-28.7 65.9 0 12 28.7 82.7 0 0-100.3 36.8 100.3 34.4 0zM282 185.4l19.5-46.9 19.4 46.9-38.9 0z"/></svg>',
            'DC': '<svg class="cc-icon" data-card-brand="Discover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M520.4 196.1c0-7.9-5.5-12.1-15.6-12.1l-4.9 0 0 24.9 4.7 0c10.3 0 15.8-4.4 15.8-12.8zM528 32L48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l480 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48zM483.9 170.9c22.6 0 52.9-4.1 52.9 24.4 0 12.6-6.6 20.7-18.7 23.2l25.8 34.4-19.6 0-22.2-32.8-2.2 0 0 32.8-16 0 0-82zM428 171l45.3 0 0 14-29.3 0 0 18.2 28.3 0 0 13.8-28.3 0 0 22.2 29.3 0 0 13.8-45.3 0 0-82zm-68.7 0l21.9 55.2 22.2-55.2 17.5 0-35.5 84.2-8.6 0-35-84.2 17.5 0zm-55.9 86.2a44.6 44.6 0 1 1 0-89.2 44.6 44.6 0 1 1 0 89.2zm-49.3-83.1l0 19c-20.1-20.1-46.8-4.7-46.8 19 0 25 27.5 38.5 46.8 19.2l0 19c-29.7 14.3-63.3-5.7-63.3-38.2 0-31.2 33.1-53 63.3-38zm-97.2 66.3c11.4 0 22.4-15.3-3.3-24.4-15-5.5-20.2-11.4-20.2-22.7 0-23.2 30.6-31.4 49.7-14.3l-8.4 10.8c-10.4-11.6-24.9-6.2-24.9 2.5 0 4.4 2.7 6.9 12.3 10.3 18.2 6.6 23.6 12.5 23.6 25.6 0 29.5-38.8 37.4-56.6 11.3l10.3-9.9c3.7 7.1 9.9 10.8 17.5 10.8zM55.4 253l-23.4 0 0-82 23.4 0c26.1 0 44.1 17 44.1 41.1 0 18.5-13.2 40.9-44.1 40.9zm67.5 0l-16 0 0-82 16 0 0 82zM544 433c0 8.2-6.8 15-15 15l-401 0c189.6-35.6 382.7-139.2 416-160l0 145zM74.1 191.6c-5.2-4.9-11.6-6.6-21.9-6.6l-4.2 0 0 54.2 4.2 0c10.3 0 17-2 21.9-6.4 5.7-5.2 8.9-12.8 8.9-20.7s-3.2-15.5-8.9-20.5z"/></svg>'
        };
        return icons[type] || '';
    };

    /**
     * Formats a credit card object into a display string with its brand icon and brand-correct hyphenation
     * @param {object} ccnObject The credit card object from JSON
     * @returns {string} Formatted HTML string with SVG icon and card number
     */
    const formatCCN = (ccnObject) => {
        if (typeof ccnObject !== 'object' || !ccnObject.type || !ccnObject.number) {
            return 'N/A';
        }

        const num = ccnObject.number;
        let formattedNumber;

        if (ccnObject.type === 'AE' && num.length === 15) {
            formattedNumber = `${num.slice(0, 4)}-${num.slice(4, 10)}-${num.slice(10)}`;
        } else if (num.length === 16) {
            formattedNumber = `${num.slice(0, 4)}-${num.slice(4, 8)}-${num.slice(8, 12)}-${num.slice(12)}`;
        } else {
            formattedNumber = num;
        }
        
        const iconHTML = getCardIcon(ccnObject.type);
        return `<span class="ccn-content-wrapper">${iconHTML} ${formattedNumber}</span>`;
    };
    window.dlpTestHelpers.formatCCN = formatCCN;
    
    /**
     * Generates a realistic US Driver's License number based on last name and state formatting rules<p>
     * Currently implemented: CA, TX, FL, IL, NY
     * @param {string} fullName The person's full name
     * @returns {string} A formatted DL number
     */
    const generateDL = (fullName) => {
        const lastName = fullName.split(' ')[1] || 'X';
        const lastNameInitial = lastName.charAt(0).toUpperCase();
        const stateFormats = [
            { state: 'CA', format: 'A#######' },
            { state: 'TX', format: '########' },
            { state: 'FL', format: 'A#############' },
            { state: 'IL', format: 'A###########' },
            { state: 'NY', format: '#########-#######' }
        ];
        const selected = stateFormats[Math.floor(Math.random() * stateFormats.length)];
        let dlNumber = '';
        for (const char of selected.format) {
            switch (char) {
                case 'A': dlNumber += lastNameInitial; break;
                case '#': dlNumber += Math.floor(Math.random() * 10); break;
                case '-': dlNumber += '-'; break;
                default: dlNumber += char; break;
            }
        }
        return `${selected.state} ${dlNumber}`;
    };
    window.dlpTestHelpers.generateDL = generateDL;

    // mouseover and mouseout event listeners and logic for tooltips
    const addTooltipEvents = () => {
        setTimeout(() => {
            const tooltipContainers = document.querySelectorAll('.tooltip-container');
            let tooltipElement;
            tooltipContainers.forEach(container => {
                container.addEventListener('mouseover', (event) => {
                    let text = ''; // initialize empty variable for tooltip text

                    // check for the hidden <div> only used in the custom test builder
                    const tooltipSource = container.querySelector('.tooltip-content');
                    if (tooltipSource) {
                        text = tooltipSource.innerHTML;
                    } else {
                        // FALLBACK: if no <div> is found, use data-attribute implemented on all other pages
                        text = container.dataset.tooltipText;
                    }
                    
                    if (!text) return; // exit if no text was found by either method

                    tooltipElement = document.createElement('div');
                    tooltipElement.className = 'page-tooltip';
                    tooltipElement.innerHTML = text;
                    document.body.appendChild(tooltipElement);

                    const iconRect = container.getBoundingClientRect();
                    const tooltipRect = tooltipElement.getBoundingClientRect();
                    let top = iconRect.top - tooltipRect.height - 10;
                    let left = iconRect.left + (iconRect.width / 2) - (tooltipRect.width / 2);
                    tooltipElement.style.top = `${top}px`;
                    tooltipElement.style.left = `${left}px`;
                    requestAnimationFrame(() => { tooltipElement.style.opacity = '1'; });
                });
                container.addEventListener('mouseout', () => {
                    if (tooltipElement) {
                        tooltipElement.remove();
                        tooltipElement = null;
                    }
                });
            });
        }, 0);
    };
    window.dlpTestHelpers.addTooltipEvents = addTooltipEvents;

    // measures the results table width and expands the main container if it overflows
    const autoExpandContainer = () => {
        const resultsContainer = document.getElementById('results-container');
        if (!resultsContainer) return;

        const table = resultsContainer.querySelector('table');
        const mainContainer = document.querySelector('main.container');
        if (table && mainContainer) {
            if (table.scrollWidth > mainContainer.clientWidth) {
                const newWidth = Math.min(table.scrollWidth + 100, window.innerWidth * 0.9);
                mainContainer.style.transition = 'max-width 0.4s ease-in-out';
                mainContainer.style.maxWidth = `${newWidth}px`;
            }
        }
    };
    window.dlpTestHelpers.autoExpandContainer = autoExpandContainer;
})();
