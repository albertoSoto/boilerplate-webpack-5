import '../scss/app.scss';

import { Printer } from './modules/printer';

const printerObj = new Printer();
printerObj.message('hello world');
