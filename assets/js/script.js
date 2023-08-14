/**
 * Vendors
 */

// Пример подключения плагина
// import pluginName from 'plugin-name';



/**
 * Modules
 */
// Пример подключения модуля
// import myModule from './modules/my-module-function';
import {showDeliveryTooltip, showCompanyTooltip, showPriceTooltip} from './modules/tooltip';
import {validateForm} from './modules/form-validation';
import {spoiler} from './modules/spoiler';
import {modal} from './modules/modal';
import {tabs} from './modules/tabs';
import {productCounter} from './modules/product-counter';
import {total} from './modules/total';
import {removeCard} from './modules/remove-card'
import {delivery} from './modules/delivery';
import {croppText} from './modules/cropp-text';

showDeliveryTooltip();
showCompanyTooltip();
showPriceTooltip();
validateForm();
spoiler();
modal();
tabs();
productCounter();
total();
removeCard();
delivery();
croppText();