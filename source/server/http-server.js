'use strict'

const assert = require('assert')
const Hapi = require('hapi')
const { HapiPlugin } = require('../shared/hapi_plugin')
const Joi = require('joi')
const optionsSchema = require('./server-options-schema')

class HttpServer {
  constructor (options) {
    const validationResult = Joi.validate(options, optionsSchema)
    if (validationResult.error) {
      throw validationResult.error
    }

    this.options = options
    this.port = this.options.port
    this.keepAliveTimeout = this.options.keepAliveTimeout
    this.logger = this.options.logger
    delete this.options.port
    delete this.options.keepAliveTimeout
    delete this.options.logger
    this.server = null
  }

  async start () {
    assert(!this.server, 'Server already started!')

    const hapiPlugin = HapiPlugin.build(this.options)

    this.server = new Hapi.Server(
      Object.assign(
        hapiPlugin.defaultHapiOptions,
        {
          port: this.port,
          compression: false // let api gateway/cloudfront/akamai deal with compression if we want it
        }
      )
    )

    this.server.listener.keepAliveTimeout = this.keepAliveTimeout

    await hapiPlugin.register(this.server, this.options)
    await this.server.start()

    console.info(`HTTP server started at ${this.server.info.uri}`)
  }

  inject (options) {
    return this.server.inject(options)
  }

  async stop () {
    assert(this.server, 'Server has not been started')

    await this.server.stop()

    console.info('HTTP server stopped')
    this.server = null
  }

  static build (options) {
    return new HttpServer(options)
  }
}

module.exports = { HttpServer }
