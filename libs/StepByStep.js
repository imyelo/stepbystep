var StepByStep = function () {
  if (!(this instanceof StepByStep)) {
    return new StepByStep();
  }
  this.tasks = [];
  return this;
};
StepByStep.prototype.add = function (task) {
  this.tasks.push(task);
};
StepByStep.prototype.done = function (callback) {
  var self = this;
  var _do = function () {
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
