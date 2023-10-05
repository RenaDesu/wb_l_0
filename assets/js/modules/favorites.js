function addToFavorites() {
    window.addEventListener('click', function (e) {
        const target = e.target;
        if (target.hasAttribute('data-favorites')) {
            target.classList.toggle('icon--actions-favorites');
        }
    });
}
addToFavorites();