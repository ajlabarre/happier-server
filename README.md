# happier-server

> This module abstracts all the code involved in writing a Hapi server from scratch. Include the module, instantiate with your config and done.

[![NPM](https://img.shields.io/npm/v/react-eternal-list.svg)](https://www.npmjs.com/package/react-eternal-list) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Requirements
* node >=8.10

## Installation
```
npm i --save happier-server
```

## Usage
    const HttpServer = require('happier-server').Server.HttpServer;

    const httpServer = new HttpServer({
        port: 8080 // Whichever port you want the server to run on
        routes: [/* hapi v18 routes */],
        logger, // used for error reporting and status updates outside of request logging
        swagger: {  // optional
            title: 'A title for your documentation'
            pathPrefix: 'A prefix for your documentation routes (e.g. /v1)',
            disabled: false, // optional, default false
            includeAuth: true // optional, default true.  Displays a field in the header for entering your jwt token
        }
    });

    // To start
    await httpServer.start();
    
    // To Stop
    await httpServer.stop();

## Contributing
If you would like to contribute to this project, open a PR!
    
## Copyright

MIT © [ajlabarre](https://github.com/ajlabarre)