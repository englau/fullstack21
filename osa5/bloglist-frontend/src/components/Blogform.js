import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'



const BlogForm = ({ handleBlogin }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const likes = 0

  const handleBlogNew = (event) => {
    event.preventDefault()
    handleBlogin({
      title,
      author,
      url,
      likes
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleBlogNew}>
        <div>
        Title
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
        Author
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
        Url
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleBlogin: PropTypes.func.isRequired
}

export default BlogForm