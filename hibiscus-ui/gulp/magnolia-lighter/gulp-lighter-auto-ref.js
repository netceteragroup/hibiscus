/*
Adds common references to a "magnolia-lighter" yaml templateDefinition if they are missing.
* If a templateScript is not defined, then it will be added automatically.
* If a dialog is not defined, and one exists at the expected path, then it will be added automatically.

Expects buffer of JSON.
*/

'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var util = require('util');
var fs = require('fs');

var PLUGIN_NAME = 'gulp-lighter-auto-ref';

//#templateScript: /hello-magnolia/templates/components/quotation.ftl
var SCRIPT_EXTENSION = 'ftl';
var YAML_EXTENSION = 'yaml';

module.exports = function() {

  function logObject(name,obj){
    // console.log(name + ":" + util.inspect(obj, {showHidden: false, depth: null}));
  }

  return through.obj(function(file, enc, callback) {

    if (file.isStream()) {
      return this.emit('error', new gutil.PluginError(PLUGIN_NAME, PLUGIN_NAME + ': Streaming not supported!'));
    }

    if (file.isBuffer()) {
      if (file.contents.length === 0) {
        this.emit('error', new PluginError(PLUGIN_NAME, 'File ' + file.path + ' is empty. YAML loader cannot load empty content'));
        return callback();
      }

      try {
        var fileObj = JSON.parse(file.contents.toString('utf8'));

        if (fileObj){
          var relPath = file.path.substring(file.base.length);

          // Auto reference - templateScript.
          if(!fileObj['templateScript']){
            var relPathScript = (relPath.substring(0, relPath.lastIndexOf('.')) + '.' + SCRIPT_EXTENSION).replace(/\\/g, '/');
            // console.log("file.path:" + file.path);
            // console.log("relPath:" + relPath);
            // console.log("relPathScript:" + relPathScript);


            //Check for existance of file
            // @@ hibiscus ADJUSTMENT
            var pathScript = (file.base + relPathScript).replace('source\\yaml\\','magnolia-resources\\');
            // console.log("pathScript:" + pathScript);
            try {
                var stats = fs.statSync(pathScript);
                //If it didnt exist it would error - now add it do definition.
                fileObj['templateScript'] = '/' + relPathScript;
            } catch (e) {
                // nothing
                console.log("error on stat" + pathScript + ":" + e);
            }
          }

          // @@ hibiscus ADJUSTMENT (replace Strings in tasks of section below)

          // Auto reference - dialog.
          if(!fileObj['dialog']){
            var relPathDialog = relPath.substring(0, relPath.lastIndexOf('.')) + '.' + YAML_EXTENSION;
            relPathDialog = relPathDialog.replace('/templates/','/dialogs/').replace('\\templates\\','\\dialogs\\');
            // console.log("relPathDialog:" + relPathDialog);
            //Check for existance of file!
            var pathDialog = file.base + relPathDialog;
            // console.log("pathDialog:" + pathDialog);
            try {
                stats = fs.statSync(pathDialog);
                //If it didnt exist it would error - now add it do definition.
                if (relPathDialog.indexOf('/') > -1) {
                   var index = relPathDialog.indexOf('/');
                 } else {
                   var index = relPathDialog.indexOf('\\')
                 }
                var moduleName = relPathDialog.substring(0, index);
                if (relPathDialog.indexOf('/dialogs/') > -1) {
                   var start = relPathDialog.indexOf('/dialogs/')+ '/dialogs/'.length;

                 } else {
                   var start = relPathDialog.indexOf('\\dialogs\\')+ '\\dialogs\\'.length;
                 }
                var dialogPath = relPathDialog.substring(start);
                var dialogName = dialogPath.substring(0, dialogPath.lastIndexOf('.'));
                // console.log('moduleName: ' + moduleName);
                // console.log('dialogPath: ' + dialogPath);
                // console.log('dialogName: ' + dialogName);

                fileObj['dialog'] = moduleName + ':' + dialogName.replace('\\', '/');
            } catch (e) {
                // nothing
                //console.log("error on stat" + pathScript + ":" + e);
            }
          }


          // //See props of file.
          // for (var key in file) {
          //     if (!file.hasOwnProperty(key)) continue;
          //     console.log("file: " + key + ": " + file[key]);
          // }

          var mergedBuffer = new Buffer(JSON.stringify(fileObj, null, '  '),'utf8');
          file.contents = mergedBuffer;
        }

      } catch (err) {
       return this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
      }


    }
    this.push(file);
    callback();

  });
};
