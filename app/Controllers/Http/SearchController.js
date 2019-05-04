'use strict'

const Post = use('App/Models/Post')

class SearchController {
  async index({
    view,
    request
  }) {
    let posts = await Post.query()
      .forIndex()
      .whereRaw('"title" ~ ?', request.input('q'))
      .orWhereRaw('"body" ~ ?', request.input('q'))
      .whereNotNull('title') // this
      .paginate(request.input('page', 1), 20)

    return view.render('forum.index', {
      posts
    })
  }
}

module.exports = SearchController


//.whereRaw('MATCH (title, body) AGAINST (? IN BOOLEAN MODE)', request.input('q'))
