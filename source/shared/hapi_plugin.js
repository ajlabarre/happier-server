'use strict';

const Joi = require('joi'),
    Swagger = require('./swagger');

class HapiPlugin {
    constructor(options) {
        const validationResult = Joi.validate(options, Joi.object(HapiPlugin.optionsSchema));
        if(validationResult.error) {
            throw validationResult.error;
        }

        this.options = validationResult.value;
    }

    get defaultHapiOptions() {
        return {
            routes: {
                cors: {
                    origin: 'ignore',
                    headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match', 'Origin']
                },
                state: {
                    failAction: 'ignore'
                },
                payload: {
                    failAction: (request, h, error) => {
                        throw error;
                    }
                },
                validate: {
                    failAction: (request, h, error) => {
                        throw error;
                    }
                }
            }
        };
    }

    async register(server) {
        await Swagger.register(server, this.options.swagger);

        return server.route(this.options.routes);
    }

    static get optionsSchema() {
        return {
            routes: Joi.array().items(Joi.object()).required().min(1).description('List of all the Hapi routes that should be available on the server'),
            swagger: Swagger.optionsSchema.default(() => { return {}; }, 'Default configuration')
        };
    }

    static build(options) {
        return new HapiPlugin(options);
    }
}

module.exports = { HapiPlugin };
