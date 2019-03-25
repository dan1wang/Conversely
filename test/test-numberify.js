'use strict';

/* eslint no-var: off */

var conversely = require('../build/Conversely');
var assert = require('chai').assert;

describe('numberify()', function() {
  context('with function as argument', function() {
    it('should convert () => NaN to null', function() {
      assert.equal( conversely.numberify( fnNumberNaN ), null);
    });
    it('should convert () => 0 to 0', function() {
      assert.equal( conversely.numberify( fnNumberZero ), 0);
    });
    it('should convert () => 1 to 2', function() {
      assert.equal( conversely.numberify( fnNumberOne ), 1);
    });
    it('should convert () => 2 to 2', function() {
      assert.equal( conversely.numberify( fnNumberTwo ), 2);
    });
    it('should convert () => "Huh?" to null', function() {
      assert.equal( conversely.numberify( fnStringHuh ), null);
    });
    it('should convert () => "0" to 0', function() {
      assert.equal( conversely.numberify( fnStringZero ), 0);
    });
    it('should convert () => "1" to 1', function() {
      assert.equal( conversely.numberify( fnStringOne ), 1);
    });
    it('should convert () => "2" to null', function() {
      assert.equal( conversely.numberify( fnStringTwo ), 2);
    });
    it('should convert () => true to 1', function() {
      assert.equal( conversely.numberify( fnBooleanTrue ), true);
    });
    it('should convert () => false to 0', function() {
      assert.equal( conversely.numberify( fnBooleanFalse ), 0);
    });
    it('should convert () => null to null', function() {
      assert.equal( conversely.numberify( fnNull ), null);
    });
  });
  context('with object as argument', function() {
    it('should convert new WhatYouSaid(NaN)  to null', function() {
      assert.equal( conversely.numberify( oNumberNaN ), null);
    });
    it('should convert new WhatYouSaid(0) to 0', function() {
      assert.equal( conversely.numberify( oNumberZero ), 0);
    });
    it('should convert new WhatYouSaid(1) to 1', function() {
      assert.equal( conversely.numberify( oNumberOne ), 1);
    });
    it('should convert new WhatYouSaid(2) to 2', function() {
      assert.equal( conversely.numberify( oNumberTwo ), 2);
    });
    it('should convert new WhatYouSaid("Huh?") to null', function() {
      assert.equal( conversely.numberify( oStringHuh ), null);
    });
    it('should convert new WhatYouSaid("0") to 0', function() {
      assert.equal( conversely.numberify( oStringZero ), 0);
    });
    it('should convert new WhatYouSaid("1") to 1', function() {
      assert.equal( conversely.numberify( oStringOne ), 1);
    });
    it('should convert new WhatYouSaid("2") to null', function() {
      assert.equal( conversely.numberify( oStringTwo ), 2);
    });
    it('should convert new WhatYouSaid(true) to 1', function() {
      assert.equal( conversely.numberify( fnBooleanTrue ), true);
    });
    it('should convert new WhatYouSaid(false) to 0', function() {
      assert.equal( conversely.numberify( fnBooleanFalse ), 0);
    });
    it('should convert new WhatYouSaid(null) to null', function() {
      assert.equal( conversely.numberify( fnNull ), null);
    });
  });
  context('with function returning object as argument', function() {
    it('should convert new WhatYouSaid(NaN)  to null', function() {
      assert.equal( conversely.numberify( fnObjNumberNaN ), null);
    });
    it('should convert () => new WhatYouSaid(0) to 0', function() {
      assert.equal( conversely.numberify( fnObjNumberZero ), 0);
    });
    it('should convert () => new WhatYouSaid(1) to 1', function() {
      assert.equal( conversely.numberify( fnObjNumberOne ), 1);
    });
    it('should convert () => new WhatYouSaid(2) to 2', function() {
      assert.equal( conversely.numberify( fnObjNumberTwo ), 2);
    });
    it('should convert () => new WhatYouSaid("Huh?") to null', function() {
      assert.equal( conversely.numberify( fnObjStringHuh ), null);
    });
    it('should convert () => new WhatYouSaid("0") to 0', function() {
      assert.equal( conversely.numberify( fnObjStringZero ), 0);
    });
    it('should convert () => new WhatYouSaid("1") to 1', function() {
      assert.equal( conversely.numberify( fnObjStringOne ), 1);
    });
    it('should convert () => new WhatYouSaid("2") to null', function() {
      assert.equal( conversely.numberify( fnObjStringTwo ), 2);
    });
    it('should convert () => new WhatYouSaid(true) to 1', function() {
      assert.equal( conversely.numberify( fnObjBooleanTrue ), true);
    });
    it('should convert () => new WhatYouSaid(false) to 0', function() {
      assert.equal( conversely.numberify( fnObjBooleanFalse ), 0);
    });
    it('should convert () => new WhatYouSaid(null) to null', function() {
      assert.equal( conversely.numberify( fnObjNull ), null);
    });
  });
});
