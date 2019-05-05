'use strict'

class ProfileController {
  async index({
    view
  }) {
    return view.render('profile.index')
  }
}

module.exports = ProfileController
