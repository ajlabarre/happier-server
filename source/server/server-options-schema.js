const Joi = require('joi')
const { HapiPlugin } = require('../shared/hapi_plugin')

module.exports = Joi.object(Object.assign(
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
))
