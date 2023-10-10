import { setLabelStyle } from "./utils";

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
    // Пробелы при заполнении телефона
    tel.addEventListener('keyup', function () {
        const txt = this.value;
        if (txt.length == 2 || txt.length == 6 || txt.length == 10 || txt.length == 13) {
            this.value = this.value + " ";
        }

    });

    //name label
    name.addEventListener('change', function (event) {
        setLabelStyle(this.value, nameLabel);
    });
    name.addEventListener('keydown', function (event) {
        setLabelStyle(this.value, nameLabel);
    });

    //surename label
    surename.addEventListener('change', function (event) {
        setLabelStyle(this.value, surenameLabel);
    });
    surename.addEventListener('keydown', function (event) {
        setLabelStyle(this.value, surenameLabel);
    });

    //email label
    email.addEventListener('change', function (event) {
        setLabelStyle(this.value, emailLabel);

        if (email.validity.typeMismatch) {
            emailError.textContent = "Проверьте адрес электронной почты";
            addErrorClass(email);
        } else {
            removeError(emailError, email);
        }
    });
    email.addEventListener('keydown', function (event) {
        setLabelStyle(this.value, emailLabel);
    });

    //tel label
    tel.addEventListener('change', function (event) {
        setLabelStyle(this.value, telLabel);
        
        if (tel.validity.patternMismatch) {
            telError.textContent = "Формат: +9 999 999 99 99";
            addErrorClass(tel);
        } else {
            removeError(telError, tel); 
        }
    });
    tel.addEventListener('keydown', function (event) {
        setLabelStyle(this.value, telLabel);
    });

    //inn label
    inn.addEventListener('change', function (event) {
        setLabelStyle(this.value, innLabel);
        
        if (inn.validity.patternMismatch) {
            innError.textContent = "Проверьте ИНН";
            addErrorClass(inn);
        } else {
            removeError(innError, inn);  
        }
    });
    inn.addEventListener('keydown', function (event) {
        setLabelStyle(this.value, innLabel);
    });

    form.addEventListener('submit', function (event) {

        if (!name.validity.valid || !surename.validity.valid || !email.validity.valid || !tel.validity.valid || !inn.validity.valid) {
            event.preventDefault();
            document.querySelector('input:invalid').focus();
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