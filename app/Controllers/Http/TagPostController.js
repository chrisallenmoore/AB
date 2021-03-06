'use strict'

const Post = use('App/Models/Post')

class TagPostController {
  async index({
    view,
    request,
    params
  }) {

    let posts = await Post.query()
      .forIndex()
      .whereHas('tag', (builder) => {
        builder.where('slug', params.slug)
      })
      .paginate(request.input('page', 1), 20)

    return view.render('forum.index', {
      posts
    })
  }
}

module.exports = TagPostController
