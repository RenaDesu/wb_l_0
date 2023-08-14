const priceEl = document.querySelectorAll('.card__price-current');

function setSmallText(el) {

    const text = el.innerText;
    if (text.length > 11) {
        el.style.fontSize = '16px';
    } else {
        el.style.fontSize = '18px';
    }

}

export {
    setSmallText
};