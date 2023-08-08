const missingContainer = document.querySelector('#missing-container');
const missingToggle = document.querySelector('#missing-toggle');
const missingIcon = document.querySelector('#missing-icon');
const selectionContainer = document.querySelector('#selection-container');
const selectionHeading = document.querySelector('#selection-heading');
const selectionCheckbox = document.querySelector('#selection-checkbox');
const selectionToggle = document.querySelector('#selection-toggle');
const selectionIcon = document.querySelector('#selection-icon');

function spoiler() {


    function onMissingToggleClick() {
        missingContainer.classList.toggle('missing__list--hidden');
        missingIcon.classList.toggle('icon--actions-hide');
    }

    function onSelectionToggleClick() {
        selectionContainer.classList.toggle('selection__list--hidden');
        selectionHeading.classList.toggle('selection__heading--active');
        selectionCheckbox.classList.toggle('selection__checkbox--hidden');
        selectionIcon.classList.toggle('icon--actions-hide');
    }

    missingToggle.addEventListener('click', onMissingToggleClick);
    selectionToggle.addEventListener('click', onSelectionToggleClick);
}

export {
    spoiler
};