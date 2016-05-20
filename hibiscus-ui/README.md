# Hibiscus - The Style Guide and Pattern Library Tool for Magnolia CMS


## Prerequisites:

- Clone the Git-Repository and open the folder in your console
- cd into hibiscus-ui

## Procedure:

Run the following commands in your console (in the directory of the project):
'npm install'

Now the project should be set up correctly and any of the following tasks can be used:

'npm run [command]  // available commands: clean, setup, default, styleguide, dist, help'

The following tasks might be useful:

'npm install          // install needed npm-depencencies'

'npm run clean        // remove temporary and output directories'

'npm start            // run patternlab'

'npm run serve        // same as npm start'

'npm run styleguide   // render styleguide (templates and scss) into ./dist-styleguide'

'npm run dist         // create dist into ./dist-magnolia (to be exported to magnolia )'

'npm run combined     // combined dist (styleguide & magnolia)'

'npm run help         // show all available tasks'

'npm run parker         // show css statistics'

## Remarks:

### Quick integration into magnolia
To make the templates and configuration available in your magnolia-instance, point your magnolia.resources.dir(in the magnolia.properties-file) to the output-folder(magnolia-resources) of hibiscus
e.g. magnolia.resources.dir=<path to hibiscus>/hibiscus/hibiscus-ui/magnolia-resources

Make sure you have run 'npm run dist' and the resources can be found in hibiscus-ui/magnolia-resources/hibiscus-lite.

To make the template available as a page, go to WebDev > Site, and in the 'Site definitions' tab, select 'templates/availability/templates'. Add a content node called hibiscus-lite and add a property called 'id' with value 'hibiscus-lite:pages/hibiscus-demo'

### Parker:
CSS-statistics can be logged to the console by running 'npm run parker'

### Dependencies to be updated manually
There are several files that were adjusted. If you update the underlying dependencies, please make sure to check those files for updates:
Altered sections are usually marked with '// @@ hibiscus ADJUSTMENT'

### magnolia-lighter (https://github.com/topherzee/magnolia-lighter)
Altered files:
gulp-lighter-auto-ref.js
yaml.js (corresponds to gulpfile.js from magnolia-lighter)

### "patternlab-node": "1.3.0"
When updating the patternlab-dependency, make sure you check /gulp/patternlab.js (corresponds to patternlab/gulpfile.js), /gulp/builder/patternlab.js and /gulp/builder/patternlab_gulp.js for changes that need to be adapted.
Sections that were changed are marked with \/* #CHANGED \*/

## Support

[hibiscus@netcetera.com](mailto:hibiscus@netcetera.com)

## License

[MIT](http://opensource.org/licenses/MIT) © Netcetera AG

## Credits

* [Patternlab](http://patternlab.io/) / [Brad Frost](https://github.com/bradfrost)
* [Patternlab-node](https://github.com/pattern-lab/patternlab-node)  / [Brian Muenzenmeyer](https://github.com/bmuenzenmeyer)
