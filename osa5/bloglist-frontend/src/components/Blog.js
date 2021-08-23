import React, { useState } from 'react'


const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  /*const userid = '6117f3e9e955a02dc8c557d2'*/
  const [showAll, setShowAll] = useState(false)
  if (showAll === false) {
    return (
      <div>
        {blog.title} {blog.author} <button className='view' onClick={() => setShowAll(!showAll)}> view </button>
      </div>
    )
  } else {
    return (
      <div id='divid' style={blogStyle} className='blog'>
        {blog.title}  <button onClick={() => setShowAll(!showAll)}> hide</button>
        <p>{blog.author} </p>
        <p>{blog.url}</p>
        <p id ='parid'>likes: {blog.likes} <button className='like' onClick={() => handleLike(blog)} >like </button></p>
        <p>{blog.user.username}</p>
        {blog.user.username === user.username? <button onClick={() => handleDelete(blog)} >delete</button> : null}
      </div>
    )
  }
}

export default Blog