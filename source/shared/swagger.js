'use strict';

const Joi = require('joi');

const optionsSchema = Joi.object({
    title: Joi.string().optional().description('Title to use for the documentation'),
    pathPrefix: Joi.string().optional().allow('').default('').description('Path to prefix all routes with (e.g. /v1'),
    includeAuth: Joi.boolean().optional().default(true),
    disabled: Joi.boolean().optional().default(false)
});

async function register(hapiServer, options) {
    const validationResult = Joi.validate(options, optionsSchema.required());
    if(validationResult.error) {
        throw validationResult.error;
    }
    options = validationResult.value;

    if(options.disabled) {
        return;
    }

    const securityDefinitions = [];
    if(options.includeAuth) {
        securityDefinitions.push({
            type: "apiKey",
            name: "Authorization",
            in: "header"
        });
    }

    await hapiServer.register([
        require('inert'),
        require('vision'),
        {
            plugin: require('hapi-swagger'),
            options: {
                info: {
                    title: options.title || 'API Documentation',
                    version: require('../../package').version
                },
                documentationPath: options.pathPrefix + '/documentation',
                swaggerUIPath: options.pathPrefix + '/swaggerui/',
                securityDefinitions
            }
        }
    ]);
}

module.exports = { register, optionsSchema };
