const blogsRouter = require('express').Router()
const userExtractor= require('../utils/middleware').userExtractor
const Blog = require('../models/blog')





blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user', {username: 1, name: 1})

  response.json(blogs.map(b => b.toJSON()))

  })
  
  blogsRouter.post('/', userExtractor, async (request, response) => {
    const blog = new Blog(request.body) 

    if (!blog.likes) {
      blog.likes = 0
  }

  if (!blog.title || !blog.url) {
    return response.status(400).json({error: 'missing title or url'})
  }

    const user = request.user

    blog.user = user._id

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)

    })

    

  blogsRouter.delete('/:id', userExtractor, async (request, response) => {

    const bId = request.params.id
    const luser = request.user
    const toblog = await Blog.findById(bId)
   
    if (toblog.user.toString() === luser.id.toString()) {
      await Blog.findByIdAndRemove(bId)
      response.status(204).end()
    } else {
      return response.status(401).json({error: 'Cannot delete'})
    }
    
  })

  blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
      response.json(updatedBlog)
    })
  

  module.exports = blogsRouter