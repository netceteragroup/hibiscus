# Hibiscus - The Style Guide and Pattern Library Tool for Magnolia CMS

## Intro
To understand the overall idea, we suggest you check out the slides of our [presentation on Atomic Design, Living Style Guides and the Holy Grail](http://www.slideshare.net/netceteragroup/atomic-design-living-style-guides-and-the-holy-grail?qid=ff419b36-a27c-427b-a8a4-e484ee6c2b0f&v=&b=&from_search=1) from the [Magnolia Conference 2016 in Basel](https://conference.magnolia-cms.com/2016/basel/program/netcetera.html). Maybe even more helpful is watching the [recording of the talk](https://www.youtube.com/watch?v=0qkRYDeXagE), especially the [demo part](https://www.youtube.com/watch?v=0qkRYDeXagE&feature=youtu.be&t=15m22s).

## Prerequisites

1. Clone the Git-Repository and open the folder in your console
1. ```cd hibiscus-ui```

## Procedure

Run the following commands in your console (in the directory of the project):
```npm install```

Now the project should be set up correctly and any of the following tasks can be used:

| command | description |
| --- | --- |
|npm install	|install needed npm-dependencies|
|npm run clean	|remove temporary and output directories|
|npm start	|run styleguide|
|npm run styleguide	|render styleguide (templates and scss) into ./dist-styleguide|
|npm run magnolia	|run development mode (see Quick integration into magnolia below)|
|npm run magnolia:dist	|create dist into ./dist-magnolia (to be exported to magnolia )|
|npm run combined	|combined dist (styleguide & magnolia)|

Basically, there are different options to run:
 - start -> styleguide develoment mode
 - magnolia- -> magnolia'serve' or 'dist' on either the styleguide or the magnolia-output. If not defined, the default is to run the serve command.

## Remarks

### Quick integration into magnolia

Prerequisite: have your magnolia instance running (e.g. in a tomcat) on port 8080. See [hibiscus-core/README.md](../hibiscus-ui/README.md).
To change the port, you can find the corresponding config in /gulp/development.js, task 'magnolia'

To make the templates and configuration available in your magnolia-instance, point your magnolia.resources.dir (in the magnolia.properties-file usually located in <your-tomcat-instance>/webapps/magnoliaAuthor/WEB-INF/config/default) to the output-folder (magnolia-resources) of hibiscus
e.g. magnolia.resources.dir=<path to hibiscus>/hibiscus/hibiscus-ui/magnolia-resources

**Make sure you have run ```npm run magnolia:dist``` and the resources can be found in hibiscus-ui/magnolia-resources/hibiscus-lite.**

To make the site-template available as a page, go to WebDev > Site, and in the 'Site definitions' tab, select 'templates/availability/templates'. Add a content node called hibiscus-lite and add a property called 'id' with value 'hibiscus-lite:pages/page-hibiscus-demo'

To allow for browser-refreshing for development, Magnolia's caching-mechanism should be disabled. To do so, go to Configuration > server > filters > cache and set (or create if not exists) a property 'enabled' with value 'false'.

Now, run the command ```npm run magnolia```, and any changes to the sources should now be live-reloaded in the browser.

### Dependencies to be updated manually
There are several files that were adjusted. If you update the underlying dependencies, please make sure to check those files for updates:
Altered sections are usually marked with ```// @@ hibiscus ADJUSTMENT```

### [Magnolia-lighter](https://github.com/topherzee/magnolia-lighter)
Magnolia lighter makes dealing with yaml-files a breeze.
Altered files:
- gulp-lighter-auto-ref.js
- yaml.js (corresponds to gulpfile.js from magnolia-lighter)

### [Patternlab-node: 1.3.0](https://www.npmjs.com/package/patternlab-node)
When updating the patternlab-dependency, make sure you check /gulp/patternlab.js (corresponds to patternlab/gulpfile.js), /gulp/builder/patternlab.js and /gulp/builder/patternlab_gulp.js for changes that need to be adapted.
Sections that were changed are marked with ```/\* #CHANGED \*/```

## Support

[hibiscus@netcetera.com](mailto:hibiscus@netcetera.com)

## License

[MIT](http://opensource.org/licenses/MIT) © Netcetera AG

## Thanks
* [Netcetera](http://netcetera.com) / Damian, Adrian, Dominik, Stojan, Bisera, Corsin and Marcel

## Credits
* [Patternlab](http://patternlab.io/) / [Dave Olsen](https://github.com/dmolsen) and [Brad Frost](https://github.com/bradfrost)
* [Patternlab-node](https://github.com/pattern-lab/patternlab-node)  / [Brian Muenzenmeyer](https://github.com/bmuenzenmeyer)
* [Magnolia-lighter](https://github.com/topherzee/magnolia-lighter) / [Christopher Zimmermann](https://github.com/topherzee)
