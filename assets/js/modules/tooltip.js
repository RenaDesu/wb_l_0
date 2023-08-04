import {TOOLTIP_DATA} from './data';


function showDeliveryTooltip() {
    let tooltipElem;

    document.onmouseover = function (event) {
        let target = event.target;

        let tooltipHtml = target.dataset.tooltip;
        if (!tooltipHtml) return;

        //элемент для подсказки

        tooltipElem = document.createElement('div');
        tooltipElem.className = 'tooltip';
        tooltipElem.innerHTML = tooltipHtml;
        document.body.append(tooltipElem);

        // позиционирование
        let coords = target.getBoundingClientRect();

        if (target.id == 'deliveryTooltip') {
            let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
            if (left < 0) left = 0;

            let top = coords.top + target.offsetHeight + 5;

            tooltipElem.style.left = left + 'px';
            tooltipElem.style.top = top + 'px';

        } else {

            if (window.matchMedia('(max-width: 1024px)').matches) {
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
};