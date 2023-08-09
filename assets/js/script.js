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
import {showDeliveryTooltip, showCompanyTooltip} from './modules/tooltip';
import {selectAll} from './modules/main-checkbox';
import {validateForm} from './modules/form-validation';
import {spoiler} from './modules/spoiler';
import {modal} from './modules/modal';
import {tabs} from './modules/tabs';
import {productCounter} from './modules/product-counter';
import {total} from './modules/total';

showDeliveryTooltip();
showCompanyTooltip();
selectAll();
validateForm();
spoiler();
modal();
tabs();
productCounter();
total();