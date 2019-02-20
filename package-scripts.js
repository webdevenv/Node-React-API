const npsUtils = require('nps-utils');
module.exports = {
  scripts: {
    default: {
      // NPM START for deployment
      script: 'nps nodemon.node.production',
      hiddenFromHelp: true,
    },
    build: {
      script: npsUtils.series.nps(
        'parcel.dom.build',
        'parcel.node.build',
      ),
      description: 'Build both Node and DOM for production',
    },
    /*
    <==========================================>
    <                  Node.js                 >
    <==========================================>
    */
    node: {
      // Development mode
      default: {
        script: npsUtils.concurrent.nps(
          'parcel.node',
          'nodemon.node',
        ),
        description: 'Development mode for Node.js',
      },
      // Builds
      build: {
        default: {
          script: npsUtils.series.nps('parcel.node.build'),
          description: 'Build Node.js project',
        },
        run: {
          script: npsUtils.series.nps(
            'parcel.node.build',
            'nodemon.node',
          ),
          description: 'Build Node.js project and run server',
        },
      },
      test: {
        default: {
          script:
            'cross-env NODE_ENV=development TESTING=true mocha --require babel-core/register src/**/*.test.js',
          description: 'Mocha test',
        },
        watch: {
          script:
            'cross-env NODE_ENV=development TESTING=true nodemon --exec "npm start node.test"',
          description: 'Mocha test watcher',
        },
      },
      // Debug mode
      debug: {
        script: npsUtils.concurrent.nps(
          'parcel.node',
          'nodemon.node.debug',
        ),
        description: 'Debug Node.js project',
      },
    },
    /*
    <==========================================>
    <                    DOM                   >
    <==========================================>
    */
    dom: {
      // Development mode
      default: {
        script: npsUtils.concurrent.nps(
          'parcel.dom',
          'nodemon.dom',
        ),
        description: 'Development mode for DOM',
      },
      // Builds
      build: {
        default: {
          script: 'nps parcel.dom.build',
          description: 'Build DOM project',
        },
        run: {
          script: npsUtils.series.nps(
            'parcel.dom.build',
            'nodemon.dom',
          ),
          description: 'Build DOM project and run server',
        },
      },
      test: {
        /*
        TODO
        - Summary: Testing for Frontend
        * Description: Testing tool might get added in the future
        */
        script: '',
        description: '',
        hiddenFromHelp: true,
      },
    },
    /*
    <==========================================>
    <                   Nodemon                >
    <==========================================>
    */
    nodemon: {
      node: {
        // Default as development
        default: {
          script:
            'cross-env NODE_ENV=development nodemon ./dist/app.js',
          hiddenFromHelp: true,
        },
        production: {
          script:
            'cross-env NODE_ENV=production nodemon ./prod/app.js',
          hiddenFromHelp: true,
        },
        debug: {
          script: 'nodemon --inspect-brk ./dist/app.js',
          hiddenFromHelp: true,
        },
      },

      dom: {
        default: {
          script:
            'cross-env NODE_ENV=production FrontEnd=true nodemon ./prod/app.js',
          hiddenFromHelp: true,
        },
      },
    },
    /*
    <==========================================>
    <                    Parcel                >
    <==========================================>
    */
    parcel: {
      node: {
        default: {
          script:
            'cross-env NODE_ENV=development parcel watch src/app.js --public-url ./ --target node',
          hiddenFromHelp: true,
        },
        build: {
          script:
            'cross-env NODE_ENV=production parcel build src/app.js --public-url ./ --out-dir prod --target node',
          hiddenFromHelp: true,
        },
      },
      dom: {
        default: {
          script:
            'cross-env NODE_ENV=development parcel watch public/src/index.html --out-dir public/dist --target browser',
          hiddenFromHelp: true,
        },
        build: {
          script:
            'cross-env NODE_ENV=production parcel build public/src/index.html --out-dir public/prod --target browser',
          hiddenFromHelp: true,
        },
      },
    },
    /*
    <==========================================>
    <                  EsLint                  >
    <==========================================>
    */
    eslint: {
      default: {
        script: 'eslint --fix --no-ignore **/*.js',
        hiddenFromHelp: true,
      },
    },
    /*
    <==========================================>
    <                  MongoDB                 >
    <==========================================>
    */
    // <-------------- Add your own MongoDB path --------------> //
    mongodb: {
      script: 'mongod.exe --dbpath \\path-to-MongoDB-data\\',
      description: 'Run MongoDB server',
      hiddenFromHelp: true,
    },
    /*
    <==========================================>
    <                  Others                  >
    <==========================================>
    */
    localTunnel: {
      script: 'lt --port 3000',
      description: 'Expose localhost port 3000',
    },
    update: {
      script: 'npm-check -u',
      description: 'Package interactive updater',
    },
  },
};
