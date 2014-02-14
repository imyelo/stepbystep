var StepByStep = function () {
  if (!(this instanceof StepByStep)) {
    return new StepByStep();
  }
  this.tasks = [];
  return this;
};
StepByStep.prototype.add = function () {
  var self = this;
  var i, len;
  function _add (task) {
    self.tasks.push(task);
  };
  function _adds (tasks) {
    var i, len;
    if (tasks instanceof Array) {
      for (i = 0, len = arguments.length; i < len; i++) {
        _add(tasks[i])
      }
    } else if (typeof tasks === 'function') {
      _add(tasks);
    }
  };
  for (i = 0, len = arguments.length; i < len; i++) {
    _add(arguments[i]);
  }
  return self;
};
StepByStep.prototype.done = function (callback) {
  var self = this;
  function _do () {
    var task = self.tasks.shift();
    if (task) {
      if (task.length) {
        task(function () {
          _do();
        }); 
      } else {
        task();
        _do();
      }
    } else {
      callback && callback();
    }
  };
  _do();
};

module.exports = StepByStep;