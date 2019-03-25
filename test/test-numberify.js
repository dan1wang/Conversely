'use strict';

/* eslint no-var: off */

var conversely = require('../dist/Conversely');
var assert = require('chai').assert;

describe('numberify()', function() {
  context('with function as argument', function() {
    it('should convert () => NaN to null', function() {
      assert.strictEqual( conversely.numberify( fnNumberNaN ), null);
    });
    it('should convert () => 0 to 0', function() {
      assert.strictEqual( conversely.numberify( fnNumberZero ), 0);
    });
    it('should convert () => 1 to 1', function() {
      assert.strictEqual( conversely.numberify( fnNumberOne ), 1);
    });
    it('should convert () => 2 to 2', function() {
      assert.strictEqual( conversely.numberify( fnNumberTwo ), 2);
    });
    it('should convert () => "Huh?" to null', function() {
      assert.strictEqual( conversely.numberify( fnStringHuh ), null);
    });
    it('should convert () => "0" to 0', function() {
      assert.strictEqual( conversely.numberify( fnStringZero ), 0);
    });
    it('should convert () => "1" to 1', function() {
      assert.strictEqual( conversely.numberify( fnStringOne ), 1);
    });
    it('should convert () => "2" to 2', function() {
      assert.strictEqual( conversely.numberify( fnStringTwo ), 2);
    });
    it('should convert () => false to 0', function() {
      assert.strictEqual( conversely.numberify( fnBooleanFalse ), 0);
    });
    it('should convert () => true to 1', function() {
      assert.strictEqual( conversely.numberify( fnBooleanTrue ), 1);
    });
    it('should convert () => null to null', function() {
      assert.strictEqual( conversely.numberify( fnNull ), null);
    });
  });
  context('with object as argument', function() {
    it('should convert new WhatYouSaid(NaN) to null', function() {
      assert.strictEqual( conversely.numberify( oNumberNaN ), null);
    });
    it('should convert new WhatYouSaid(0) to 0', function() {
      assert.strictEqual( conversely.numberify( oNumberZero ), 0);
    });
    it('should convert new WhatYouSaid(1) to 1', function() {
      assert.strictEqual( conversely.numberify( oNumberOne ), 1);
    });
    it('should convert new WhatYouSaid(2) to 2', function() {
      assert.strictEqual( conversely.numberify( oNumberTwo ), 2);
    });
    it('should convert new WhatYouSaid("Huh?") to null', function() {
      assert.strictEqual( conversely.numberify( oStringHuh ), null);
    });
    it('should convert new WhatYouSaid("0") to 0', function() {
      assert.strictEqual( conversely.numberify( oStringZero ), 0);
    });
    it('should convert new WhatYouSaid("1") to 1', function() {
      assert.strictEqual( conversely.numberify( oStringOne ), 1);
    });
    it('should convert new WhatYouSaid("2") to null', function() {
      assert.strictEqual( conversely.numberify( oStringTwo ), 2);
    });
    it('should convert new WhatYouSaid(false) to 0', function() {
      assert.strictEqual( conversely.numberify( fnBooleanFalse ), 0);
    });
    it('should convert new WhatYouSaid(true) to 1', function() {
      assert.strictEqual( conversely.numberify( fnBooleanTrue ), 1);
    });
    it('should convert new WhatYouSaid(null) to null', function() {
      assert.strictEqual( conversely.numberify( fnNull ), null);
    });
    it('should convert {} to null', function() {
      assert.strictEqual( conversely.numberify( oObject ), null);
    });
    it('should convert {101} to 101', function() {
      assert.strictEqual( conversely.numberify( o101 ), 101);
    });
  });
  context('with function returning object as argument', function() {
    it('should convert () => new WhatYouSaid(NaN) to null', function() {
      assert.strictEqual( conversely.numberify( fnObjNumberNaN ), null);
    });
    it('should convert () => new WhatYouSaid(0) to 0', function() {
      assert.strictEqual( conversely.numberify( fnObjNumberZero ), 0);
    });
    it('should convert () => new WhatYouSaid(1) to 1', function() {
      assert.strictEqual( conversely.numberify( fnObjNumberOne ), 1);
    });
    it('should convert () => new WhatYouSaid(2) to 2', function() {
      assert.strictEqual( conversely.numberify( fnObjNumberTwo ), 2);
    });
    it('should convert () => new WhatYouSaid("Huh?") to null', function() {
      assert.strictEqual( conversely.numberify( fnObjStringHuh ), null);
    });
    it('should convert () => new WhatYouSaid("0") to 0', function() {
      assert.strictEqual( conversely.numberify( fnObjStringZero ), 0);
    });
    it('should convert () => new WhatYouSaid("1") to 1', function() {
      assert.strictEqual( conversely.numberify( fnObjStringOne ), 1);
    });
    it('should convert () => new WhatYouSaid("2") to null', function() {
      assert.strictEqual( conversely.numberify( fnObjStringTwo ), 2);
    });
    it('should convert () => new WhatYouSaid(false) to 0', function() {
      assert.strictEqual( conversely.numberify( fnObjBooleanFalse ), 0);
    });
    it('should convert () => new WhatYouSaid(true) to 1', function() {
      assert.strictEqual( conversely.numberify( fnObjBooleanTrue ), 1);
    });
    it('should convert () => new WhatYouSaid(null) to null', function() {
      assert.strictEqual( conversely.numberify( fnObjNull ), null);
    });
  });
});
