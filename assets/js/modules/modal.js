const paymentChangeButtons = document.querySelectorAll('[data-payment-change]');
const closeButtons = document.querySelectorAll('[data-close-button]');
const submitButtons = document.querySelectorAll('[data-submit-button]');
const paymentModal = document.querySelector('#modal-payment');
const cardsSelected = document.querySelectorAll('[data-payment-card-selected]');
const cards = document.querySelectorAll('[data-payment-card]');
const radioCards = document.querySelectorAll('[data-radio-card]');

// const paymentCard1 = document.querySelector('#payment-card1');
// const paymentCard2 = document.querySelector('#payment-card2');

function modal() {

    function onPaymentButtonClick() {
        paymentModal.classList.toggle('modal-container--closed');
    }



    //  const innerHTML1 = paymentCard1.innerHTML;
    //  paymentCard2.innerHTML = innerHTML1;


    //events
    paymentChangeButtons.forEach((button) => {
        button.addEventListener('click', onPaymentButtonClick);
    });

    closeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            onPaymentButtonClick();
        })
    });

    submitButtons.forEach((button) => {
        button.addEventListener('click', () => {
            onPaymentButtonClick();
        })
    });

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

export {
    modal
};