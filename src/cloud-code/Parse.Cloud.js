import { Parse }     from 'parse/node';
import * as triggers from '../triggers';

function validateClassNameForTriggers(className) {
  const restrictedClassNames = [ '_Session' ];
  if (restrictedClassNames.indexOf(className) != -1) {
    throw `Triggers are not supported for ${className} class.`;
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
ParseCloud.define = function(functionName, handler, validationHandler) {
  triggers.addFunction(functionName, handler, validationHandler, Parse.applicationId);
};

ParseCloud.job = function(functionName, handler) {
  triggers.addJob(functionName, handler, Parse.applicationId);
};

ParseCloud.beforeSave = function(parseClass, handler) {
  var className = getClassName(parseClass);
  triggers.addTrigger(triggers.Types.beforeSave, className, handler, Parse.applicationId);
};

ParseCloud.beforeDelete = function(parseClass, handler) {
  var className = getClassName(parseClass);
  triggers.addTrigger(triggers.Types.beforeDelete, className, handler, Parse.applicationId);
};

ParseCloud.afterSave = function(parseClass, handler) {
  var className = getClassName(parseClass);
  triggers.addTrigger(triggers.Types.afterSave, className, handler, Parse.applicationId);
};

ParseCloud.afterDelete = function(parseClass, handler) {
  var className = getClassName(parseClass);
  triggers.addTrigger(triggers.Types.afterDelete, className, handler, Parse.applicationId);
};

ParseCloud._removeAllHooks = () => {
  triggers._unregisterAll();
}

ParseCloud.httpRequest = require("./httpRequest");

//Supported configs
// masterOnlyWriteFields - Set of fields which are only writable by master
// immutableFields - Set of fields which are not mutable once the object is created.
// lockDownPublicAccess - if true, will lock down public access of the object.
const _classConfig = {};
ParseCloud.setClassConfig = (className, config) => {
  _classConfig[className] = Object.freeze(config);
};

ParseCloud.getClassConfig = (className) => {
  return _classConfig[className];
};

module.exports = ParseCloud;
