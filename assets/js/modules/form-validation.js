const form = document.querySelector('[data-form]');

const name = document.querySelector('#name');
const nameError = document.querySelector('#name + .form__error');
const nameLabel = document.querySelector('#name ~ .form__label');
const surename = document.querySelector('#surename');
const surenameError = document.querySelector('#surename + .form__error');
const surenameLabel = document.querySelector('#surename ~ .form__label');
const email = document.querySelector('#email');
const emailError = document.querySelector('#email + .form__error');
const emailLabel = document.querySelector('#email ~ .form__label');
const tel = document.querySelector('#tel');
const telError = document.querySelector('#tel + .form__error');
const telLabel = document.querySelector('#tel ~ .form__label');
const inn = document.querySelector('#inn');
const innError = document.querySelector('#inn + .form__error');
const innLabel = document.querySelector('#inn ~ .form__label');


function validateForm() {
    const isEmpty = str => !str.trim().length;

    //name
    name.addEventListener('change', function (event) {
        if (isEmpty(this.value)) {
            nameLabel.style.top = '15px';
            nameLabel.style.fontSize = '16px';
            nameLabel.style.lineHeight = '24px';

        } else {
            nameLabel.style.top = 0;
            nameLabel.style.fontSize = '13px';
            nameLabel.style.lineHeight = '16px';

        }
    });

    //surename
    surename.addEventListener('change', function (event) {
        if (isEmpty(this.value)) {
            surenameLabel.style.top = '15px';
            surenameLabel.style.fontSize = '16px';
            surenameLabel.style.lineHeight = '24px';

        } else {
            surenameLabel.style.top = 0;
            surenameLabel.style.fontSize = '13px';
            surenameLabel.style.lineHeight = '16px';

        }
    });

    //email
    email.addEventListener('change', function (event) {
        if (isEmpty(this.value)) {
            emailLabel.style.top = '15px';
            emailLabel.style.fontSize = '16px';
            emailLabel.style.lineHeight = '24px';

        } else {
            emailLabel.style.top = 0;
            emailLabel.style.fontSize = '13px';
            emailLabel.style.lineHeight = '16px';

        }
    });

    //tel 
    tel.addEventListener('change', function (event) {
        if (isEmpty(this.value)) {
            telLabel.style.top = '15px';
            telLabel.style.fontSize = '16px';
            telLabel.style.lineHeight = '24px';

        } else {
            telLabel.style.top = 0;
            telLabel.style.fontSize = '13px';
            telLabel.style.lineHeight = '16px';

        }
    });

    //inn
    inn.addEventListener('change', function (event) {
        if (isEmpty(this.value)) {
            innLabel.style.top = '15px';
            innLabel.style.fontSize = '16px';
            innLabel.style.lineHeight = '24px';

        } else {
            innLabel.style.top = 0;
            innLabel.style.fontSize = '13px';
            innLabel.style.lineHeight = '16px';

        }
    });

    form.addEventListener('submit', function (event) {

        if (!name.validity.valid || !surename.validity.valid || !email.validity.valid || !tel.validity.valid || !inn.validity.valid) {
            event.preventDefault();
            
            showError();

            name.addEventListener('change', function (event) {
                if (name.validity.valid) {
                    removeError(nameError, name);
                } else {
                    showError();
                }
            });
    
            surename.addEventListener('change', function (event) {
                if (surename.validity.valid) {
                    removeError(surenameError, surename);
                } else {
                    showError();
                }
            });
    
            email.addEventListener('change', function (event) {
    
                if (email.validity.valid) {
                    removeError(emailError, email);
                } else {
                    showError();
                }
            });
    
            tel.addEventListener('change', function (event) {
                if (tel.validity.valid) {
                    removeError(telError, tel);
                } else {
                    showError();
                }
            });
    
            inn.addEventListener('change', function (event) {
                if (inn.validity.valid) {
                    removeError(innError, inn);
                } else {
                    showError();
                }
            });
        } else {
            console.log('Форма валидна');
        }
    });


    function addErrorClass(input) {
        input.classList.add('form__input--error');
    }

    function removeError(labelError, inputError) {
        labelError.textContent = "";
        inputError.classList.remove('form__input--error');
    }

    function showError() {
        if (name.validity.valueMissing) {
            nameError.textContent = "Укажите имя";
            addErrorClass(name);
        }

        if (surename.validity.valueMissing) {
            surenameError.textContent = "Введите фамилию";
            addErrorClass(surename);
        }

        if (email.validity.valueMissing) {
            emailError.textContent = "Укажите электронную почту";
            addErrorClass(email);
        } else if (email.validity.typeMismatch) {
            emailError.textContent = "Проверьте адрес электронной почты";
            addErrorClass(email);
        }

        if (tel.validity.valueMissing) {
            telError.textContent = "Укажите номер телефона";
            addErrorClass(tel);
        } else if (tel.validity.patternMismatch) {
            telError.textContent = "Формат: +9 999 999 99 99";
            addErrorClass(tel);
        }

        if (inn.validity.valueMissing) {
            innError.textContent = "Укажите ИНН";
            addErrorClass(inn);
        } else if (inn.validity.patternMismatch) {
            innError.textContent = "Проверьте ИНН";
            addErrorClass(inn);
        }

    }
}

export {
    validateForm
};