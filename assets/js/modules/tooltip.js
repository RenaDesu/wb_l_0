const originBoxes = document.querySelectorAll('[data-container]');
const priceBoxes = document.querySelectorAll('[data-container-price]');

function showCompanyTooltip() {
    for (const originBox of originBoxes) {
        containerInit(originBox);
    }

    function containerInit(containerNode) {
        const tooltip = containerNode.querySelector('[data-tooltip-company]');
        const tooltipIcon = containerNode.querySelector('[data-tooltip-icon]');

        tooltipIcon.addEventListener('mouseover', (e) => tooltipShow(tooltip));
        tooltipIcon.addEventListener('mouseout', (e) => tooltipHide(tooltip));
    }

    function tooltipShow(elemNode) {
        elemNode.style.display = 'block';
    }

    function tooltipHide(elemNode) {
        elemNode.style.display = 'none';
    }
}

function showPriceTooltip() {
    for (const priceBox of priceBoxes) {
        containerInit(priceBox);
    }

    function containerInit(containerNode) {
        const tooltip = containerNode.querySelector('[data-tooltip-price]');
        const tooltipToggle = containerNode.querySelector('[data-old]');

        tooltipToggle.addEventListener('mouseover', (e) => tooltipShow(tooltip));
        tooltipToggle.addEventListener('mouseout', (e) => tooltipHide(tooltip));
    }

    function tooltipShow(elemNode) {
        elemNode.style.display = 'block';
        const parent = elemNode.closest('[data-container-price]');
        const percent = parent.querySelector('[data-percent]');
        const percentValue = parent.querySelector('[data-percent-value]');
        const percentBuyerValue = parent.querySelector('[data-percent-buyer-value]');
        const price = parent.querySelector('[data-current]');
        const priceOld = parent.querySelector('[data-old]');

        const priceText =  price.innerText;    
        const priceOldText = priceOld.innerText;

        const priceTextNoSpaces = priceText.replace(/[^0-9]/g, '');
        const priceOldTextNoSpaces = priceOldText.replace(/[^0-9]/g, '');

        //Расчет процента скидки и сумм для тултипов со скидками
        const difference = parseInt(priceOldTextNoSpaces) - parseInt(priceTextNoSpaces);
        const percentCount = (difference / parseInt(priceOldTextNoSpaces)) * 100;
        const percentCountValue = percentCount.toFixed(1);

        const percenValuetCount = parseInt(priceOldTextNoSpaces) - parseInt(priceTextNoSpaces);
        const percenValuetCountSpaces = percenValuetCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

        const percentBuyerValueCount = (parseInt(priceOldTextNoSpaces) / 100) * 10;
        const percentBuyerValueCountSpaces = percentBuyerValueCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        
        //Значения процента скидки и сумм для тултипов со скидками
        percent.innerText = 'Скидка ' + percentCountValue + '%';
        percentValue.innerText = percenValuetCountSpaces + ' сом';
        percentBuyerValue.innerText = percentBuyerValueCountSpaces + ' сом';
    }

    function tooltipHide(elemNode) {
        elemNode.style.display = 'none';
    }
}

function showDeliveryTooltip() {
    let tooltipElem;

    document.onmouseover = function (event) {
        let target = event.target;

        let tooltipHtml = target.dataset.tooltip;
        if (!tooltipHtml) return;

        //Создается элемент для подсказки
        tooltipElem = document.createElement('div');
        tooltipElem.className = 'tooltip';
        tooltipElem.innerHTML = tooltipHtml;
        document.body.append(tooltipElem);

        //Позиционирование элемента подсказки
        let coords = target.getBoundingClientRect();

        if (target.id == 'deliveryTooltip') {
            let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
            if (left < 0) left = 0;

            let top = coords.top + target.offsetHeight + 5;

            tooltipElem.style.left = left + 'px';
            tooltipElem.style.top = top + 'px';

        } else {

            if (window.matchMedia('(max-width: 1023px)').matches) {
                let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
                if (left < 0) left = 0;

                let top = coords.top + target.offsetHeight + 5;

                tooltipElem.style.left = left + 'px';
                tooltipElem.style.top = top + 'px';

            } else if (window.matchMedia('(max-width: 1399px)').matches) {
                let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) + 33;
                if (left < 0) left = 0;

                let top = coords.top + target.offsetHeight + 5;

                tooltipElem.style.left = left + 'px';
                tooltipElem.style.top = top + 'px';

            } else if (window.matchMedia('(min-width: 1400px)').matches) {
                let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) + 190;
                if (left < 0) left = 0;

                let top = coords.top + target.offsetHeight + 5;

                tooltipElem.style.left = left + 'px';
                tooltipElem.style.top = top + 'px';
            }
        }
    };

    document.onmouseout = function (e) {

        if (tooltipElem) {
            tooltipElem.remove();
            tooltipElem = null;
        }

    };
}

export {
    showDeliveryTooltip,
    showCompanyTooltip,
    showPriceTooltip
};