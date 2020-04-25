'use strict';

const assert = require('assert');
const Hapi = require('hapi');
const { HapiPlugin } = require('../shared/hapi_plugin');
const Joi = require('joi');

const optionsSchema = Joi.object(Object.assign(
    {
        port: Joi.number().min(0).max(65535).required().description('Port number for the server to listen on'),
        keepAliveTimeout: Joi.number().min(5000).max(300000).default(120000).description('Keep alive timeout to use in milliseconds.  Defaults to 2 minutes so we have a longer time than the default for an AWS load balancer (60 seconds)'),
        logger: Joi.object({
            debug: Joi.func().required(),
            info: Joi.func().required(),
            warn: Joi.func().required(),
            error: Joi.func().required()
        }).required().unknown(true).description('options.logger object')
    },
    HapiPlugin.optionsSchema
));

class HttpServer {
    constructor(options) {
        const validationResult = Joi.validate(options, optionsSchema);
        if(validationResult.error) {
            throw validationResult.error;
        }

        this.options = options;
        this.port = this.options.port;
        this.keepAliveTimeout = this.options.keepAliveTimeout;
        this.logger = this.options.logger;
        delete this.options.port;
        delete this.options.keepAliveTimeout;
        delete this.options.logger;
        this.server = null;
    }

    async start() {
        assert(!this.server, 'Server already started!');

        const hapiPlugin = HapiPlugin.build(this.options);

        this.server = new Hapi.Server(
            Object.assign(
                hapiPlugin.defaultHapiOptions,
                {
                    port: this.port,
                    compression: false // let api gateway/cloudfront/akamai deal with compression if we want it
                }
            )
        );

        this.server.listener.keepAliveTimeout = this.keepAliveTimeout;

        await hapiPlugin.register(this.server, this.options);
        await this.server.start();

        console.info(`HTTP server started at ${this.server.info.uri}`);
    }

    inject(options) {
        return this.server.inject(options);
    }

    async stop() {
        assert(this.server, 'Server has not been started');

        await this.server.stop();

        console.info('HTTP server stopped');
        this.server = null;
    }

    static build(options) {
        return new HttpServer(options);
    }
}

module.exports = { HttpServer };
