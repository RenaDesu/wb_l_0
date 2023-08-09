const totalPriceEl = document.querySelector('.total__price');
const totalPriceNoDiscountEl = document.querySelector('#total-price');
const totalDiscount = document.querySelector('#discount');
const totalProductsEl = document.querySelector('#total-products');
const debitToggle = document.querySelector('#debit');
const orderButton = document.querySelector('#order');

function total() {
    window.addEventListener('change', function (event) {

        // Чекбокс выбран
        if (event.target.hasAttribute('data-checkbox') && event.target.checked) {

            // Карточка с выбранным чекбоксом
            const card = event.target.closest('.card');

            //Кол-во товаров в корзине
            function totalProducts() {
                const productsCounter = card.querySelector('[data-counter]');

                let productsTotal = totalProductsEl.innerText;
                let productsTotalTotalNoSpaces = productsTotal.replace(/[^0-9]/g, '');
                let productsTotalClean = parseInt(productsTotalTotalNoSpaces);

                const productsCounterText = productsCounter.value;
                productsTotalClean += parseInt(productsCounterText);

                const productsTotalSpaces = productsTotalClean.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                const productsTotalFull = productsTotalSpaces + ' ' + 'товара';
                totalProductsEl.innerText = productsTotalFull;
            };

            totalProducts();

            //Расчет итоговой цены в корзине
            function totalPrice() {

                const priceElement = card.querySelector('.card__price-current');
                const descountElement = card.querySelector('.card__price-old');

                //с учетом скидки
                let priceTotal = totalPriceEl.innerText;
                let priceTotalNoSpaces = priceTotal.replace(/[^0-9]/g, '');
                let priceTotalClean = parseInt(priceTotalNoSpaces);

                const itemText = priceElement.innerText;
                const cleanItem = itemText.replace(/[^0-9]/g, '');
                priceTotalClean += parseInt(cleanItem);

                const priceTotalSpaces = priceTotalClean.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                const priceTotalFull = priceTotalSpaces + ' ' + 'сом';
                totalPriceEl.innerText = priceTotalFull;

                //без скидки
                let priceTotalNoDisc = totalPriceNoDiscountEl.innerText;
                let priceTotalNoDiscNoSpaces = priceTotalNoDisc.replace(/[^0-9]/g, '');
                let priceTotalNoDiscClean = parseInt(priceTotalNoDiscNoSpaces);

                const itemNoDiscText = descountElement.innerText;
                const cleanNoDiscItem = itemNoDiscText.replace(/[^0-9]/g, '');
                priceTotalNoDiscClean += parseInt(cleanNoDiscItem);

                const priceTotalNoDiscSpaces = priceTotalNoDiscClean.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                const priceTotaNoDisclFull = priceTotalNoDiscSpaces + ' ' + 'сом';
                totalPriceNoDiscountEl.innerText = priceTotaNoDisclFull;

                //скидка
                let discountTotal = totalDiscount.innerText;
                let discountTotalNoSpaces = discountTotal.replace(/[^0-9]/g, '');
                let discountTotalClean = parseInt(discountTotalNoSpaces);

                const discountSum = discountTotalClean + (parseInt(cleanNoDiscItem) - parseInt(cleanItem));
                const discountSumSpaces = discountSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                const discountSumFinal = '-' + discountSumSpaces + ' ' + 'сом'
                totalDiscount.innerText = discountSumFinal;
            }

            totalPrice();

            // Чекбокс не выбран
        } else if (event.target.hasAttribute('data-checkbox') && !event.target.checked) {

            // Карточка с чекбоксом
            const card = event.target.closest('.card');

            //Кол-во товаров в корзине
            function totalProducts() {
                const productsCounter = card.querySelector('[data-counter]');

                let productsTotal = totalProductsEl.innerText;
                let productsTotalTotalNoSpaces = productsTotal.replace(/[^0-9]/g, '');
                let productsTotalClean = parseInt(productsTotalTotalNoSpaces);

                const productsCounterText = productsCounter.value;
                productsTotalClean -= parseInt(productsCounterText);

                const productsTotalSpaces = productsTotalClean.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                const productsTotalFull = productsTotalSpaces + ' ' + 'товара';
                totalProductsEl.innerText = productsTotalFull;
            };

            totalProducts();

            //Расчет итоговой цены в корзине
            function totalPrice() {

                const priceElement = card.querySelector('.card__price-current');
                const descountElement = card.querySelector('.card__price-old');

                //с учетом скидки
                let priceTotal = totalPriceEl.innerText;
                let priceTotalNoSpaces = priceTotal.replace(/[^0-9]/g, '');
                let priceTotalClean = parseInt(priceTotalNoSpaces);

                const itemText = priceElement.innerText;
                const cleanItem = itemText.replace(/[^0-9]/g, '');
                priceTotalClean -= parseInt(cleanItem);

                const priceTotalSpaces = priceTotalClean.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                const priceTotalFull = priceTotalSpaces + ' ' + 'сом';
                totalPriceEl.innerText = priceTotalFull;

                //без скидки
                let priceTotalNoDisc = totalPriceNoDiscountEl.innerText;
                let priceTotalNoDiscNoSpaces = priceTotalNoDisc.replace(/[^0-9]/g, '');
                let priceTotalNoDiscClean = parseInt(priceTotalNoDiscNoSpaces);

                const itemNoDiscText = descountElement.innerText;
                const cleanNoDiscItem = itemNoDiscText.replace(/[^0-9]/g, '');
                priceTotalNoDiscClean -= parseInt(cleanNoDiscItem);

                const priceTotalNoDiscSpaces = priceTotalNoDiscClean.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                const priceTotaNoDisclFull = priceTotalNoDiscSpaces + ' ' + 'сом';
                totalPriceNoDiscountEl.innerText = priceTotaNoDisclFull;

                //скидка
                let discountTotal = totalDiscount.innerText;
                let discountTotalNoSpaces = discountTotal.replace(/[^0-9]/g, '');
                let discountTotalClean = parseInt(discountTotalNoSpaces);

                const discountSum = discountTotalClean - (parseInt(cleanNoDiscItem) - parseInt(cleanItem));
                const discountSumSpaces = discountSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                const discountSumFinal = '-' + discountSumSpaces + ' ' + 'сом'
                totalDiscount.innerText = discountSumFinal;
            }

            totalPrice();
        }
    });

    debitToggle.addEventListener('change', function (event) {
        if (event.target.checked) {
            const newText =  totalPriceEl.innerText;
            orderButton.innerText = 'Оплатить' + ' ' + newText;
        } else {
            orderButton.innerText = 'Заказать';
        }
    });
}

export {
    total
};