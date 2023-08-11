const deliveryContainer = document.querySelector('[data-delivery-container]');
const deliveryList = document.querySelector('[data-delivery-list]');
const deliveryTitle = document.querySelector('[data-delivery-title]');

const DATES = {
    date1: '5—6 февраля',
    date2: '7—8 февраля',
}

function delivery() {
    let card;
    let counter;
    let productInfo;
    let deliveryRow;
    let deliveryNewList;
    let deliveryItem;

    window.addEventListener('change', function (event) {
        if (event.target.hasAttribute('data-checkbox')) {
            
            // Карточка с выбранным чекбоксом
            card = event.target.closest('.card');
            counter = card.querySelector('[data-counter]');

            productInfo = {
                id: card.dataset.id,
                imgSrc: card.querySelector('.checkbox__label-pic').getAttribute('src'),
                imgSrcSet: card.querySelector('.checkbox__label-pic').getAttribute('srcset'),
                value: counter.value,
            };

            // Создаются необходимые элементы
            deliveryRow = createDeliveryRow(productInfo);
            deliveryNewList = createDeliveryList();
            deliveryItem = createDeliveryItem(productInfo);

        }

        if (event.target.hasAttribute('data-checkbox') && event.target.checked) {

            deliveryTitle.innerText = `${DATES.date1}`

            // Добавляются товары в список доставки
            deliveryList.appendChild(deliveryItem);

            if (card.getAttribute('data-id') === '2' && parseInt(counter.value) >= 10) {
                // Добавляются товары в список доставки
                const deliveryItemOtherDate = createDeliveryItemOtherDate(productInfo);
                deliveryList.appendChild(deliveryItem);
                deliveryNewList.appendChild(deliveryItemOtherDate);
                deliveryRow.appendChild(deliveryNewList);
                deliveryContainer.appendChild(deliveryRow);
            }
        }

        if (event.target.hasAttribute('data-checkbox') && !event.target.checked) {

            if (card.getAttribute('data-id') === '1') {
                const li = document.querySelector('[data-cardid="1"]');
                deliveryList.removeChild(li);
            } else if (card.getAttribute('data-id') === '2' && parseInt(counter.value) < 10) {
                const li = document.querySelector('[data-cardid="2"]');
                deliveryList.removeChild(li);
            } else if (card.getAttribute('data-id') === '3') {
                const li = document.querySelector('[data-cardid="3"]');
                deliveryList.removeChild(li);
            }

            if (card.getAttribute('data-id') === '2' && parseInt(counter.value) >= 10) {
                const li = document.querySelector('[data-cardid="2"]');
                deliveryList.removeChild(li);
                const row = document.querySelector('[data-rowid="2"]');
                deliveryContainer.removeChild(row);
            }

            const listCollection = deliveryList.children;

            if (listCollection.length == 0) {
                deliveryTitle.innerText = '';
            }
        }

        // if (event.target.hasAttribute('data-checkbox-main') && event.target.checked) {
        // 
        // }

        // if (event.target.hasAttribute('data-checkbox-main') && !event.target.checked) {
        // 
        // }
    });

    // Функция для создания элементов
    const makeElement = function (tagName, className, text) {
        const element = document.createElement(tagName);
        element.classList.add(className);
        if (text) {
            element.textContent = text;
        }
        return element;
    };

    // Функция для создания li для списка доставки
    const createDeliveryItem = function (product) {
        const deliveryItem = makeElement('li', 'delivery__item');
        deliveryItem.classList.add('mini-card');
        deliveryItem.setAttribute("data-cardid", `${product.id}`);

        deliveryItem.innerHTML = `<button class="mini-card__button button button--card" type="button">
                <img class="mini-card__img" src="${product.imgSrc}"
                    srcset="${product.imgSrcSet}">
                <span class="button__label button__label--card-mini" data-label="${product.id}">${product.value}</span>
            </button>`;

        return deliveryItem;
    };

    const createDeliveryItemOtherDate = function (product) {
        const deliveryItem = makeElement('li', 'delivery__item');
        deliveryItem.classList.add('mini-card');
        deliveryItem.setAttribute("data-cardid", `${product.id}`);
        deliveryItem.setAttribute("data-date", "other");

        deliveryItem.innerHTML = `<button class="mini-card__button button button--card" type="button">
                <img class="mini-card__img" src="${product.imgSrc}"
                    srcset="${product.imgSrcSet}">
                <span class="button__label button__label--card-mini">${product.value}</span>
            </button>`;

        return deliveryItem;
    };

    // Функция для создания блок с датами
    const createDeliveryRow = function (product) {
        const deliveryRow = makeElement('div', 'delivery__row');
        deliveryRow.setAttribute("data-rowid", `${product.id}`);
        const title = makeElement('h3', 'delivery__title', DATES.date2);

        deliveryRow.appendChild(title);

        return deliveryRow;
    };

    // Функция для создания списка доставки
    const createDeliveryList = function () {
        const deliveryList = makeElement('ul', 'delivery__list');
        return deliveryList;
    };
}

export {
    delivery
};