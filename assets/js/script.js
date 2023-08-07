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

showDeliveryTooltip();
showCompanyTooltip();
selectAll();
validateForm();