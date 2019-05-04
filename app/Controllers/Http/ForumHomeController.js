'use strict'

const Post = use('App/Models/Post')

class ForumHomeController {
  async index({
    view,
    request
  }) {
    let posts = await Post.query()
      .forIndex()
      .paginate(request.input('page', 1), 20)

    return view.render('forum.index', {
      posts
    })
  }
}

module.exports = ForumHomeController
