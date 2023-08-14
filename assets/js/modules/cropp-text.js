const cardTitle = document.querySelectorAll('.card__title');

function croppText() {

    const truncateString = (s, w) => s.length > w ? s.substring(0, w) + "..." : s;
    if (window.matchMedia('(max-width: 1023px)').matches) {
        cardTitle.forEach((title) => {
            const text = title.innerText;

            title.innerText = truncateString(text, 44);
        });
    }
}

export {
    croppText
};