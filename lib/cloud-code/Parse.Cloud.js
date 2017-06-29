'use strict';

var _node = require('parse/node');

var _triggers = require('../triggers');

var triggers = _interopRequireWildcard(_triggers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function validateClassNameForTriggers(className) {
  var restrictedClassNames = ['_Session'];
  if (restrictedClassNames.indexOf(className) != -1) {
    throw 'Triggers are not supported for ' + className + ' class.';
  }
  return className;
}

function getClassName(parseClass) {
  if (parseClass && parseClass.className) {
    return validateClassNameForTriggers(parseClass.className);
  }
  return validateClassNameForTriggers(parseClass);
}

var ParseCloud = {};
ParseCloud.define = function (functionName, handler, validationHandler) {
  triggers.addFunction(functionName, handler, validationHandler, _node.Parse.applicationId);
};

ParseCloud.job = function (functionName, handler) {
  triggers.addJob(functionName, handler, _node.Parse.applicationId);
};

ParseCloud.beforeSave = function (parseClass, handler) {
  var className = getClassName(parseClass);
  triggers.addTrigger(triggers.Types.beforeSave, className, handler, _node.Parse.applicationId);
};

ParseCloud.beforeDelete = function (parseClass, handler) {
  var className = getClassName(parseClass);
  triggers.addTrigger(triggers.Types.beforeDelete, className, handler, _node.Parse.applicationId);
};

ParseCloud.afterSave = function (parseClass, handler) {
  var className = getClassName(parseClass);
  triggers.addTrigger(triggers.Types.afterSave, className, handler, _node.Parse.applicationId);
};

ParseCloud.afterDelete = function (parseClass, handler) {
  var className = getClassName(parseClass);
  triggers.addTrigger(triggers.Types.afterDelete, className, handler, _node.Parse.applicationId);
};

ParseCloud._removeAllHooks = function () {
  triggers._unregisterAll();
};

ParseCloud.httpRequest = require("./httpRequest");

//Supported configs
// masterOnlyWriteFields - Set of fields which are only writable by master
// immutableFields - Set of fields which are not mutable once the object is created.
// lockDownPublicAccess - if true, will lock down public access of the object.
var _classConfig = {};
ParseCloud.setClassConfig = function (className, config) {
  _classConfig[className] = Object.freeze(config);
};

ParseCloud.getClassConfig = function (className) {
  return _classConfig[className];
};

module.exports = ParseCloud;