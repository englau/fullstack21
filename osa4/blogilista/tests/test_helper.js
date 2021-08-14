const blog = require('../models/blog')
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Hillan matkassa",
    author: "Hilla Hoo",
    url: "www.blogi.fi",
    likes: 10
  },
  {
    title: "Puudelin iltarukous",
    author: "Hilla Hoo",
    url: "www.blogi.fi",
    likes: 21
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'kohtapoistuu', author: 'poistuu', url: 'www' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}