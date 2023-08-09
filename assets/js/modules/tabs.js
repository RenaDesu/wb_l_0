const tabButtons = document.querySelectorAll('[data-tab]');
const point1 = document.querySelector('[data-delivery-point1]');
const point2 = document.querySelector('[data-delivery-point2]');

function tabs() {
    tabButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const target = e.target;
            const id = target.dataset.tab;
            const container = target.closest('[data-tabs]');

            const buttons = container.querySelectorAll('[data-tab]');
            buttons.forEach((button) => {
                button.classList.remove('tabs__item--active');
            });
            const tabSections = container.querySelectorAll('[data-tab-section]');
            tabSections.forEach((sections) => {
                sections.classList.remove('tabs__block--active');
            });
            

            target.classList.add('tabs__item--active');
            container.querySelector(`[data-tab-section="${id}"]`).classList.add('tabs__block--active');

            if (target.classList.contains('tabs__item--active')) {
                const text = target.textContent;
                point1.textContent = text;
                point2.textContent = `Доставка ${text.toLowerCase()}`;
            }
        });
    });
}

export {
    tabs
};