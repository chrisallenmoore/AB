'use strict'

const Post = use('App/Models/Post')

class OwnPostController {
  async index({
    view,
    request,
    auth
  }) {

    let posts = await Post.query()
      .forIndex()
      .where('user_id', '=', auth.user.id)
      .paginate(request.input('page', 1), 20)

    return view.render('index', {
      posts
    })
  }
}

module.exports = OwnPostController
