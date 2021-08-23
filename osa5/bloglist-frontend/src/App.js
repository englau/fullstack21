import React, { useState, useRef, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import BlogForm from './components/Blogform'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  if (color === true) {
    return (
      <div className="errorGreen">
        {message}
      </div>
    )
  } else {

    return (
      <div className="errorRed">
        {message}
      </div>
    )
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [color, setColor] = useState(true)
  const blogFormRef = useRef()

  useEffect(() => {blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('Bloguser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLike = async (blog) => {
    await blogService.update(blog)
    blogService.getAll().then(blogs => setBlogs(blogs))
    setColor(true)
    setErrorMessage(`${blog.title} by ${blog.author} liked`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleDelete = async (blog) => {
    const result = window.confirm(`Remove ${blog.title} by ${blog.author}`)
    if (result) {
      const response = await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id ? b : response))
      setColor(true)
      setErrorMessage(`${blog.title} by ${blog.author} deleted`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else {
      console.log('none')
    }
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('Bloguser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exeption) {
      setColor(false)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const handleBlogin = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      await blogService.create(newBlog)
      blogService.getAll().then(blogs => setBlogs(blogs))
      setColor(true)
      setErrorMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {setErrorMessage(null)}, 5000)
    } catch (exeption) {
      setColor(false)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }


  const handleLogout = () => {
    window.localStorage.removeItem('Bloguser')
    setUser(null)
  }

  const kirjautunut = () => (
    <div>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )

  const loginForm = () => (

    <LoginForm buttonLabel="log in"
      handleSubmit={handleLogin}
      username={username}
      password={password}
      changeUsername={({ target }) => setUsername(target.value)}
      changePassword={({ target }) => setPassword(target.value)}
    />

  )

  const blogForm = () => (

    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm
        handleBlogin={handleBlogin}/>
    </Togglable>
  )
  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} color={color}/>
        {loginForm()}
      </div>)
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification message={errorMessage} color={color}/>
        {kirjautunut()}
        {blogForm()}

        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} handleDelete={handleDelete} handleLike={handleLike} user={user} />
        )}
      </div>

    )
  }
}

export default App