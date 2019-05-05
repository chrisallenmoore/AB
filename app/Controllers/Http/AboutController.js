'use strict'

class AboutController {
  async index({
    view
  }) {
    return view.render('about')
  }
}

module.exports = AboutController
