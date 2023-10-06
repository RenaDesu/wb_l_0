const priceEl = document.querySelectorAll('.card__price-current');

function setSmallText(el) {

    const text = el.innerText;
    if (text.length > 11) {
        el.style.fontSize = '16px';
    } else {
        if (window.matchMedia('(max-width: 1023px)').matches) {
            el.style.fontSize = '16px';
        } else {
            el.style.fontSize = '20px';
        }
        
    }

}

export {
    setSmallText
};