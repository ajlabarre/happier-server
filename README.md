# happier-server

> Lightweight module which abstracts Hapi server boilerplate cpde

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Requirements
* node >=8.10

## Installation
```
npm i --save happier-server
```

## Usage
Include the module
```
const HttpServer = require('happier-server').Server.HttpServer
```

Create a new Hapi server instance by providing a simple config object
```
const httpServer = new HttpServer({
    port: 8080 // The port you want the server to use. Will default to port 8080
    routes: [/* Hapi v18 routes. See below for example */],
    logger, // used for error reporting and status updates outside of request logging
    swagger: {  // optional
        title: 'A title for your documentation'
        pathPrefix: 'A prefix for your documentation routes (e.g. /v1)',
        disabled: false, // optional, default false
        includeAuth: true // optional, default true.  Displays a field in the header for entering your jwt token
        }
    });
```

To start the server
```
await httpServer.start()
```
    
To stop the server
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
          tags: ['api'], // Include the api tag to have the route included in swagger
          description: 'Retrieves information about the health of the API'
        },
        handler: async (request, h) => {
          return 200
        }
    }
]
```

## Local Development
If you would like to run happier-server in isolation, use the following

```
cd happier-server/
npm i
npm run start-local
```

## Contributing
If you would like to contribute to this project, open a PR!
    
## Copyright

MIT © [ajlabarre](https://github.com/ajlabarre)