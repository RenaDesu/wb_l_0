const paymentChangeButtons = document.querySelectorAll('[data-payment-change]');
const deliveryChangeButtons = document.querySelectorAll('[data-delivery-change]');
const paymentCloseButton = document.querySelector('[data-payment-close-button]');
const deliveryCloseButton = document.querySelector('[data-delivery-close-button]');
const paymentSubmitButton = document.querySelector('[data-payment-submit-button]');
const deliverySubmitButtons = document.querySelectorAll('[data-delivery-submit-button]');
const paymentModal = document.querySelector('#modal-payment');
const deliveryModal = document.querySelector('#modal-delivery');
const deliveryForm = document.querySelector('[data-delivery-form]');

const cardsSelected = document.querySelectorAll('[data-payment-card-selected]');
const radioCards = document.querySelectorAll('[data-radio-card]');

const deliverySelected = document.querySelectorAll('[data-delivery-selected]');
const deliveryAddressSelected = document.querySelector('[data-address-selected]');
const radioDelivery = document.querySelectorAll('[data-radio-delivery]');


function modal() {

    function onPaymentButtonClick() {
        paymentModal.classList.toggle('modal-container--closed');
    }

    function onDeliveryButtonClick() {
        deliveryModal.classList.toggle('modal-container--closed');
    }

    function onDeleteAddressButtonClick(e) {
        if (e.target.hasAttribute('data-delete-address')) {
            const address = e.target.closest('.form__item');
            address.remove();
        }
    }

    function onPaymentRadioChange() {
        radioCards.forEach((radio) => {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    const parent = e.target.closest('.radio');
                    const cardContainer = parent.querySelector('[data-payment-card]');
                    const cardContainerContent = cardContainer.innerHTML;
                    cardsSelected.forEach((card) => {
                        card.innerHTML = cardContainerContent;
                    });
                }
            });
        });
    }

    function onDeliveryRadioChange() {
        radioDelivery.forEach((radio) => {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    const parent = e.target.closest('.radio');
                    const cardContainer = parent.querySelector('[data-delivery-address]');
                    const cardContainerContent = cardContainer.innerHTML;
                    const addressContainer = parent.querySelector('.delivery__address')
                    const addressContent = addressContainer.innerHTML;
                    deliverySelected.forEach((card) => {
                        card.innerHTML = cardContainerContent;
                    });
                    deliveryAddressSelected.innerHTML = addressContent;
                }
            });
        });
    }


    //events
    paymentChangeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            onPaymentButtonClick();
            onPaymentRadioChange()
        });
    });

    deliveryChangeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            onDeliveryButtonClick();
            onDeliveryRadioChange();
        });
    });

    paymentCloseButton.addEventListener('click', () => {
        const defaultCheckbox = radioCards[0];

        defaultCheckbox.checked = true;
        
        const parent = defaultCheckbox.closest('.radio');     
        const cardContainer = parent.querySelector('[data-payment-card]');
        const cardContainerContent = cardContainer.innerHTML;

        cardsSelected.forEach((card) => {
            card.innerHTML = cardContainerContent;
        });
        
        onPaymentButtonClick();
    });

    deliveryCloseButton.addEventListener('click', () => {
        deliveryForm.reset();
        onDeliveryButtonClick();
    });

    paymentSubmitButton.addEventListener('click', () => {
        onPaymentButtonClick();
    });

    deliverySubmitButtons.forEach((button) => {
        button.addEventListener('click', () => {
            onDeliveryButtonClick();
        })
    });

    window.addEventListener('click', function(e) {
        onDeleteAddressButtonClick(e);
    });
}

export {
    modal
};