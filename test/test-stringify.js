'use strict';

/* eslint no-var: off */

var conversely = require('../dist/Conversely');
var assert = require('chai').assert;

describe('stringify()', function() {
  context('with function as argument', function() {
    it('should convert () => NaN to null', function() {
      assert.strictEqual( conversely.stringify( fnNumberNaN ), null);
    });
    it('should convert () => 0 to "0"', function() {
      assert.strictEqual( conversely.stringify( fnNumberZero ), '0');
    });
    it('should convert () => 1 to "1"', function() {
      assert.strictEqual( conversely.stringify( fnNumberOne ), '1');
    });
    it('should convert () => 2 to "2"', function() {
      assert.strictEqual( conversely.stringify( fnNumberTwo ), '2');
    });
    it('should convert () => "Huh?" to "Huh?"', function() {
      assert.strictEqual( conversely.stringify( fnStringHuh ), 'Huh?');
    });
    it('should convert () => "0" to "0"', function() {
      assert.strictEqual( conversely.stringify( fnStringZero ), '0');
    });
    it('should convert () => "1" to "1"', function() {
      assert.strictEqual( conversely.stringify( fnStringOne ), '1');
    });
    it('should convert () => "2" to "2"', function() {
      assert.strictEqual( conversely.stringify( fnStringTwo ), '2');
    });
    it('should convert () => false to "0"', function() {
      assert.strictEqual( conversely.stringify( fnBooleanFalse ), '0');
    });
    it('should convert () => true to "1"', function() {
      assert.strictEqual( conversely.stringify( fnBooleanTrue ), '1');
    });
    it('should convert () => null to null', function() {
      assert.strictEqual( conversely.stringify( fnNull ), null);
    });
  });
  context('with object as argument', function() {
    it('should convert new WhatYouSaid(NaN) to null', function() {
      assert.strictEqual( conversely.stringify( oNumberNaN ), null);
    });
    it('should convert new WhatYouSaid(0) to "0"', function() {
      assert.strictEqual( conversely.stringify( oNumberZero ), '0');
    });
    it('should convert new WhatYouSaid(1) to "1"', function() {
      assert.strictEqual( conversely.stringify( oNumberOne ), '1');
    });
    it('should convert new WhatYouSaid(2) to "2"', function() {
      assert.strictEqual( conversely.stringify( oNumberTwo ), '2');
    });
    it('should convert new WhatYouSaid("Huh?") to "Huh?"', function() {
      assert.strictEqual( conversely.stringify( oStringHuh ), 'Huh?');
    });
    it('should convert new WhatYouSaid("0") to "0"', function() {
      assert.strictEqual( conversely.stringify( oStringZero ), '0');
    });
    it('should convert new WhatYouSaid("1") to "1"', function() {
      assert.strictEqual( conversely.stringify( oStringOne ), '1');
    });
    it('should convert new WhatYouSaid("2") to "2"', function() {
      assert.strictEqual( conversely.stringify( oStringTwo ), '2');
    });
    it('should convert new WhatYouSaid(false) to "0"', function() {
      assert.strictEqual( conversely.stringify( fnBooleanFalse ), '0');
    });
    it('should convert new WhatYouSaid(true) to "1"', function() {
      assert.strictEqual( conversely.stringify( fnBooleanTrue ), '1');
    });
    it('should convert new WhatYouSaid(null) to null', function() {
      assert.strictEqual( conversely.stringify( fnNull ), null);
    });
    it('should convert {} to null', function() {
      assert.strictEqual( conversely.stringify( oObject ), null);
    });
    it('should convert {101} to "one oh one"', function() {
      assert.strictEqual( conversely.stringify( o101 ), 'one oh one');
    });
  });
  context('with function returning object as argument', function() {
    it('should convert () => new WhatYouSaid(NaN) to null', function() {
      assert.strictEqual( conversely.stringify( fnObjNumberNaN ), null);
    });
    it('should convert () => new WhatYouSaid(0) to "0"', function() {
      assert.strictEqual( conversely.stringify( fnObjNumberZero ), '0');
    });
    it('should convert () => new WhatYouSaid(1) to "1"', function() {
      assert.strictEqual( conversely.stringify( fnObjNumberOne ), '1');
    });
    it('should convert () => new WhatYouSaid(2) to "2"', function() {
      assert.strictEqual( conversely.stringify( fnObjNumberTwo ), '2');
    });
    it('should convert () => new WhatYouSaid("Huh?") to "Huh?"', function() {
      assert.strictEqual( conversely.stringify( fnObjStringHuh ), 'Huh?');
    });
    it('should convert () => new WhatYouSaid("0") to "0"', function() {
      assert.strictEqual( conversely.stringify( fnObjStringZero ), '0');
    });
    it('should convert () => new WhatYouSaid("1") to "1"', function() {
      assert.strictEqual( conversely.stringify( fnObjStringOne ), '1');
    });
    it('should convert () => new WhatYouSaid("2") to "2"', function() {
      assert.strictEqual( conversely.stringify( fnObjStringTwo ), '2');
    });
    it('should convert () => new WhatYouSaid(false) to "0"', function() {
      assert.strictEqual( conversely.stringify( fnObjBooleanFalse ), '0');
    });
    it('should convert () => new WhatYouSaid(true) to "1"', function() {
      assert.strictEqual( conversely.stringify( fnObjBooleanTrue ), '1');
    });
    it('should convert () => new WhatYouSaid(null) to null', function() {
      assert.strictEqual( conversely.stringify( fnObjNull ), null);
    });
  });
});
