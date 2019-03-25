/* eslint brace-style: ["error", "1tbs", { "allowSingleLine": true }] */
global.fnNumberNaN = function() {return NaN;};
global.fnNumberZero = function() {return 0;};
global.fnNumberOne = function() {return 1;};
global.fnNumberTwo = function() {return 2;};
global.fnStringHuh = function() {return 'Huh?';};
global.fnStringZero = function() {return '0';};
global.fnStringOne = function() {return '1';};
global.fnStringTwo = function() {return '2';};
global.fnBooleanTrue = function() {return true;};
global.fnBooleanFalse = function() {return false;};
global.fnNull = function() {return null;};

/**
 * Create an object with valueOf() method that echos the initial value.
 * @param {Any} value Initial value
 * @return {Object}
 */
function WhatYouSaid(value) {
  this['value'] = value;
  this['valueOf'] = function() {return this.value;};
  return this;
}

global.oNumberNaN = new WhatYouSaid(NaN);
global.oNumberZero = new WhatYouSaid(0);
global.oNumberOne = new WhatYouSaid(1);
global.oNumberTwo = new WhatYouSaid(2);
global.oStringHuh = new WhatYouSaid('Huh?');
global.oStringZero = new WhatYouSaid('0');
global.oStringOne = new WhatYouSaid('1');
global.oStringTwo = new WhatYouSaid('2');
global.oBooleanTrue = new WhatYouSaid(true);
global.oBooleanFalse = new WhatYouSaid(false);
global.oNull = new WhatYouSaid(null);
global.oObject = {};
global.o101 = {
  valueOf: function() {return 101;},
  toString: function() {return 'one oh one';},
};

global.fnObjNumberNaN = function() {return global.oNumberNaN;};
global.fnObjNumberZero = function() {return global.oNumberZero;};
global.fnObjNumberOne = function() {return global.oNumberOne;};
global.fnObjNumberTwo = function() {return global.oNumberTwo;};
global.fnObjStringHuh = function() {return global.oStringHuh;};
global.fnObjStringZero = function() {return global.oStringZero;};
global.fnObjStringOne = function() {return global.oStringOne;};
global.fnObjStringTwo = function() {return global.oStringTwo;};
global.fnObjBooleanTrue = function() {return global.oBooleanTrue;};
global.fnObjBooleanFalse = function() {return global.oBooleanFalse;};
global.fnObjNull = function() {return global.oNull;};
