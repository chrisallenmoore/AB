'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Authenticated {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({
    request,
    response,
    auth
  }, next) {
    // call next to advance the request

    try {
      await auth.check()
    } catch (error) {
      return response.route('auth.login')
    }

    await next()
  }
}

module.exports = Authenticated
