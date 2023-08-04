const originBoxes = document.querySelectorAll('[data-container]');

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
    showCompanyTooltip
};