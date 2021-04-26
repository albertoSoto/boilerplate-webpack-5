import '../scss/app.scss';

import {Printer} from './modules/printer';

/**
 * super comment
 * @type {Printer}
 */
const printerObj = new Printer();
printerObj.message('hello world');
