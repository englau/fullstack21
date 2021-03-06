import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async blog  => {
  const config = {
    headers: { Authorization: token }
  }
  const updateBlog = {
    'title': blog.title,
    'author': blog.author,
    'url': blog.url,
    'likes': blog.likes +1,
    'user': blog.user
  }

  const response = await axios.put(`${baseUrl}/${blog.id}`, updateBlog, config)
  return response.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const response =  await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}


export default { getAll, create, update, setToken, deleteBlog }