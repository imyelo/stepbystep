var chai = require('chai');
var expect = chai.expect;
var StepByStep = require('../');

describe('StepByStep', function () {
  describe('async tasks', function () {
    // gernerate a random array
    var src = (function () {
      var arr = [];
      for (var i = 0, len = 50; i < len; i++) {
        arr.push(Math.floor(Math.random() * 10000));
      }
      return arr;
    })();
    // update the dest array asyncly
    var update = function (dest, key, callback) {
      setTimeout(function () {
        dest.push(src[key]);
        callback();
      }, Math.floor(Math.random() * 30));
    };
    it('without StepByStep', function (done) {
      var dest = [];
      for (var i = 0, len = src.length; i < len; i++) {
        (function (i) {
          update(dest, i, function () {
          });
        })(i);
      };
      setTimeout(function () {
        expect(dest).to.be.not.deep.equal(src);
        done();
      }, 30 * src.length + 1);
    });
    it('normal', function (done) {
      var dest = [];
      var step = new StepByStep();
      for (var i = 0, len = src.length; i < len; i++) {
        (function (i) {
          step.add(function (next) {
            update(dest, i, function () {
              next();
            });
          });
        })(i);
      };
      step.done(function () {
        expect(dest).to.be.deep.equal(src);
        done();
      });
    });
  });
});
