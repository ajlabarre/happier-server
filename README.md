# happier-server

Abstracts all the code involved in writing a Hapi server from scratch. All you have to do is include the happier-server module, instantiate the HttpServer with a simple confiuration object, then start!

## Requirements
* node >=12

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
Copyright © 2019 AJ LaBarre, all rights reserved.
