'use strict'

class BookController {
  async index({
    view
  }) {
    return view.render('books.index')
  }
}

module.exports = BookController
