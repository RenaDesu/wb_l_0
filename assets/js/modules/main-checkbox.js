const mainCheckBox = document.querySelector('#checkbox');
const checkBoxes = document.querySelectorAll('[data-checkbox]');

function selectAll() {
    mainCheckBox.addEventListener('change', (e) => {
        if (e.target.checked) {
            checkBoxes.forEach((checkBox) => {
                checkBox.checked = true;
            });
        } else {
            checkBoxes.forEach((checkBox) => {
                checkBox.checked = false;
            });
        }
    })

    checkBoxes.forEach((checkBox) => {
        checkBox.addEventListener('change', (e) => {
            if (!e.target.checked) {
                mainCheckBox.checked = false;
            }
        });
    });
}

export {
    selectAll
};