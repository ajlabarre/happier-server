# happier-server

> This module abstracts all the code involved in writing a Hapi server from scratch. Include the module, instantiate with your config and start!

Use this simple module to easily create a v18 Hapi Server!

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Requirements
* node >=8.10

## Installation
```
npm i --save happier-server
```

## Usage
#### Include the module
```
const HttpServer = require('happier-server').Server.HttpServer
```

#### Create a new Hapi server instance by providing a simple config object
```
const httpServer = new HttpServer({
    port: process.env.PORT
    routes: [/* Hapi v18 routes. See below for example */],
    logger,
    swagger: {
        title: 'A title for your documentation'
        pathPrefix: 'A prefix for your documentation routes (e.g. /v1)',
        disabled: false, // optional, default false
        includeAuth: true // optional, default true.  Displays a field in the header for entering your jwt token
        }
    });
```

##### Server configuration object
- port (required) - Whichever port you want the server to run on
- routes (required) - An Array of v18 routes (see blow for example)
- logger (required) - used for error reporting and status updates outside of request logging. You can simply pass NodeJS console object or any other logger you want.
- swagger (optional) - API documentation tool

#### To start the server
```
await httpServer.start()
```
    
#### To stop the server
```
await httpServer.stop();
```

### Hapi v18 route example
```
module.exports = [
    {
        method: 'GET',
        path: '/_status',
        config: {
          tags: ['api'],
          description: 'Retrieves information about the health of the API'
        },
        handler: async (request, h) => {
          return 200
        }
    }
]
```

## Local Development
Use the following to directly run happier-server locally

```
cd happier-server/
npm i
npm run start-local
```

## Contributing
If you would like to contribute to this project, open a PR!
    
## Copyright

MIT © [ajlabarre](https://github.com/ajlabarre)