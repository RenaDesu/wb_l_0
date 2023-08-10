function removeCard() {
    window.addEventListener('click', function (event) {
        if (event.target.hasAttribute('data-remove')) {
            const card = event.target.closest('.card');

            card.remove();
        }
    });
}

export {removeCard};