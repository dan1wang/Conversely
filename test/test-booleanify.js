'use strict';

/* eslint no-var: off */

var conversely = require('../dist/Conversely');
var assert = require('chai').assert;

describe('booleanify()', function() {
  context('with function as argument', function() {
    it('should convert () => NaN to null', function() {
      assert.strictEqual( conversely.booleanify( fnNumberNaN ), null);
    });
    it('should convert () => 0 to false', function() {
      assert.strictEqual( conversely.booleanify( fnNumberZero ), false);
    });
    it('should convert () => 1 to true', function() {
      assert.strictEqual( conversely.booleanify( fnNumberOne ), true);
    });
    it('should convert () => 2 to null', function() {
      assert.strictEqual( conversely.booleanify( fnNumberTwo ), null);
    });
    it('should convert () => "Huh?" to null', function() {
      assert.strictEqual( conversely.booleanify( fnStringHuh ), null);
    });
    it('should convert () => "0" to false', function() {
      assert.strictEqual( conversely.booleanify( fnStringZero ), false);
    });
    it('should convert () => "1" to true', function() {
      assert.strictEqual( conversely.booleanify( fnStringOne ), true);
    });
    it('should convert () => "2" to null', function() {
      assert.strictEqual( conversely.booleanify( fnStringTwo ), null);
    });
    it('should convert () => false to false', function() {
      assert.strictEqual( conversely.booleanify( fnBooleanFalse ), false);
    });
    it('should convert () => true to true', function() {
      assert.strictEqual( conversely.booleanify( fnBooleanTrue ), true);
    });
    it('should convert () => null to null', function() {
      assert.strictEqual( conversely.booleanify( fnNull ), null);
    });
  });
  context('with object as argument', function() {
    it('should convert new WhatYouSaid(NaN) to null', function() {
      assert.strictEqual( conversely.booleanify( oNumberNaN ), null);
    });
    it('should convert new WhatYouSaid(0) to false', function() {
      assert.strictEqual( conversely.booleanify( oNumberZero ), false);
    });
    it('should convert new WhatYouSaid(1) to true', function() {
      assert.strictEqual( conversely.booleanify( oNumberOne ), true);
    });
    it('should convert new WhatYouSaid(2) to null', function() {
      assert.strictEqual( conversely.booleanify( oNumberTwo ), null);
    });
    it('should convert new WhatYouSaid("Huh?") to null', function() {
      assert.strictEqual( conversely.booleanify( oStringHuh ), null);
    });
    it('should convert new WhatYouSaid("0") to false', function() {
      assert.strictEqual( conversely.booleanify( oStringZero ), false);
    });
    it('should convert new WhatYouSaid("1") to true', function() {
      assert.strictEqual( conversely.booleanify( oStringOne ), true);
    });
    it('should convert new WhatYouSaid("2") to null', function() {
      assert.strictEqual( conversely.booleanify( oStringTwo ), null);
    });
    it('should convert new WhatYouSaid(false) to false', function() {
      assert.strictEqual( conversely.booleanify( fnBooleanFalse ), false);
    });
    it('should convert new WhatYouSaid(true) to true', function() {
      assert.strictEqual( conversely.booleanify( fnBooleanTrue ), true);
    });
    it('should convert new WhatYouSaid(null) to null', function() {
      assert.strictEqual( conversely.booleanify( fnNull ), null);
    });
    it('should convert {} to null', function() {
      assert.strictEqual( conversely.booleanify( oObject ), null);
    });
    it('should convert {101} to null', function() {
      assert.strictEqual( conversely.booleanify( o101 ), null);
    });
  });
  context('with function returning object as argument', function() {
    it('should convert () => new WhatYouSaid(NaN) to null', function() {
      assert.strictEqual( conversely.booleanify( fnObjNumberNaN ), null);
    });
    it('should convert () => new WhatYouSaid(0) to false', function() {
      assert.strictEqual( conversely.booleanify( fnObjNumberZero ), false);
    });
    it('should convert () => new WhatYouSaid(1) to true', function() {
      assert.strictEqual( conversely.booleanify( fnObjNumberOne ), true);
    });
    it('should convert () => new WhatYouSaid(2) to null', function() {
      assert.strictEqual( conversely.booleanify( fnObjNumberTwo ), null);
    });
    it('should convert () => new WhatYouSaid("Huh?") to null', function() {
      assert.strictEqual( conversely.booleanify( fnObjStringHuh ), null);
    });
    it('should convert () => new WhatYouSaid("0") to false', function() {
      assert.strictEqual( conversely.booleanify( fnObjStringZero ), false);
    });
    it('should convert () => new WhatYouSaid("1") to true', function() {
      assert.strictEqual( conversely.booleanify( fnObjStringOne ), true);
    });
    it('should convert () => new WhatYouSaid("2") to null', function() {
      assert.strictEqual( conversely.booleanify( fnObjStringTwo ), null);
    });
    it('should convert () => new WhatYouSaid(false) to false', function() {
      assert.strictEqual( conversely.booleanify( fnObjBooleanFalse ), false);
    });
    it('should convert () => new WhatYouSaid(true) to true', function() {
      assert.strictEqual( conversely.booleanify( fnObjBooleanTrue ), true);
    });
    it('should convert () => new WhatYouSaid(null) to null', function() {
      assert.strictEqual( conversely.booleanify( fnObjNull ), null);
    });
  });
});
