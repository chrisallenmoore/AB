'use strict'

const {
  validateAll
} = use('Validator')

const Post = use('App/Models/Post')
const moment = require('moment')

class PostController {

  create({
    view
  }) {
    return view.render('forum.posts.create')
  }

  async show({
    view,
    params
  }) {
    let post = await Post.query()
      .with('user')
      .with('tag')
      .with('replies')
      .with('replies.user')
      .with('answer.user')
      .where('slug', '=', params.slug)
      .firstOrFail()

    return view.render('forum.posts.show', {
      post: post.toJSON()
    })
  }



  async store({
    request,
    session,
    response,
    auth
  }) {
    // validate
    const {
      title,
      tag,
      body
    } = request.all()

    const rules = {
      title: 'required',
      tag: 'required|exists:tags,id', // @todo foreign key constraint
      body: 'required'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()

      return response.redirect('back')
    }
    // insert

    const post = new Post()

    post.fill({
      title,
      body,
      tag_id: tag,
      user_id: auth.user.id,
      last_reply_at: moment()
    })

    await post.save()
    // redirect
    return response.route('forum') // @todo update this
  }
}

module.exports = PostController
