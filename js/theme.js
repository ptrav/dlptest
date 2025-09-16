/**
 * @file theme.js
 * @description Handles the light/dark mode theme switching for the application
 * @author Phil Traversa
 * @license https://www.gnu.org/licenses/agpl-3.0.txt
 */
(() => {
    'use strict';
    const htmlElement = document.documentElement;
    const storageKey = 'theme'; // for saving user preference

    // PART 1: Core Theme Functions

    /**
     * Shows a toast notification to the user
     * @param {string} message The message to display in the toast
     */
    function showToast(message) {
        // remove existing dialogs to prevent duplicates
        const existingToast = document.querySelector('.theme-toast');
        if (existingToast) {
            existingToast.remove();
        }

        // create the toast then animate it
        const toast = document.createElement('div');
        toast.className = 'theme-toast';
        toast.innerHTML = message;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // timer to remove the toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300); // match CSS transition
        }, 3000); // visible for 3 seconds
    }

    /**
     * Applies the specified theme to the document
     * @param {string} theme The theme to apply ('light' or 'dark')
     */
    function applyTheme(theme) {
        if (theme === 'dark') {
            htmlElement.classList.add('dark-mode');
        } else {
            htmlElement.classList.remove('dark-mode');
        }
    }

    /**
     * Updates the visual state of the toggle switch to match the current theme
     * @param {HTMLInputElement} toggleElement The theme toggle checkbox element
     */
    function syncToggleState(toggleElement) {
        if (toggleElement) {
            toggleElement.checked = htmlElement.classList.contains('dark-mode');
        }
    }

    // PART 2: Initialization and Event Listeners

    const osThemeMatcher = window.matchMedia('(prefers-color-scheme: dark)');

    // apply the initial theme immediately to mitigate FOUC
    const savedTheme = localStorage.getItem(storageKey);
    const initialTheme = savedTheme ? savedTheme : (osThemeMatcher.matches ? 'dark' : 'light');
    applyTheme(initialTheme);

    document.addEventListener('DOMContentLoaded', () => {
        const themeToggle = document.getElementById('theme-toggle');
        setTimeout(() => {
            if (themeToggle) {
                syncToggleState(themeToggle);

                /** 
                 * Mitigation for bad browser timing
                 * Use requestAnimationFrame to enable animations on the *next* paint cycle
                 * This gives the browser a chance to render the correct initial state of toggle before applying CSS transitions
                 */
                requestAnimationFrame(() => {
                    document.body.classList.add('js-loaded');
                });
            }
        }, 0);

        // event listener for user manually clicking the toggle
        if (themeToggle) {
            themeToggle.addEventListener('change', () => {
                const newTheme = themeToggle.checked ? 'dark' : 'light';
                localStorage.setItem(storageKey, newTheme);
                applyTheme(newTheme);
                showToast('User preference saved!<br><i>Clear browser cache to revert back to OS theme autodetection</i>');
            });
        }

        // event listener for live changes to OS theme preference
        osThemeMatcher.addEventListener('change', (event) => {
            // only reacts if the user has NOT manually overridden autodetection
            if (!localStorage.getItem(storageKey)) {
                const newOsTheme = event.matches ? 'dark' : 'light';
                applyTheme(newOsTheme);
                syncToggleState(themeToggle);
            }
        });
    });
})();
