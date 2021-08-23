import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './Blogform'

const mockHandler = jest.fn()


test('renders title and author', () => {
    const blog = {
      title: 'Herrojen leikki',
      author: 'King Arthur',
      url: 'www',
      likes: 1
    }
  
    const component = render(
      <Blog blog={blog} user={blog.user}/>
    )
  
    expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`)
  })

  test('renders also url and likes when view pressed', () => {
    const blog = {
        title: 'Herrojen leikki',
        author: 'King Arthur',
        url: 'www',
        likes: 1,
        user: { name: 'Herra', id: '6117f3e9e955a02dc8c557d2', username: 'Huu' }
    }

    const component = render(
        <Blog blog={blog} user={blog.user}/>
    )
    const button = component.getByText('view')
    fireEvent.click(button)

        expect(component.container).toHaveTextContent(`${blog.title}`)
        expect(component.container).toHaveTextContent(`${blog.author}`)
        expect(component.container).toHaveTextContent(`${blog.url}`)
        expect(component.container).toHaveTextContent(`${blog.likes}`)
})

test('clickin the like button twice eventhandler is called twice', async () => {
    const blog = {
        title: 'Herrojen leikki',
        author: 'King Arthur',
        url: 'www',
        likes: 1,
        user: { name: 'Herra', id: '6117f3e9e955a02dc8c557d2', username: 'Huu' }
    }
    
    const component = render(
        <Blog blog={blog} user={blog.user} handleLike={mockHandler}/>)
      component.debug()
    
      const button = component.getByText('view')
      fireEvent.click(button)
    
      const likebutton = component.getByText('like')
      fireEvent.click(likebutton)
      fireEvent.click(likebutton)
      console.log(mockHandler.mock.calls)
    
      expect(mockHandler.mock.calls).toHaveLength(2)
    })

test('Blogform is calling correct callbackfunctions when new blog is created', () => {
    const newBlog = jest.fn()
    const component = render(
        <BlogForm handleBlogin={newBlog}/>
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
        target: { value: 'Karhun päiväuni'}
    })
    fireEvent.change(author, {
        target: { value: 'Heikki Mahla'}
    })
    fireEvent.change(url, {
        target: { value: 'www.karhu'}
    })
    fireEvent.submit(form)

    expect(newBlog.mock.calls).toHaveLength(1)
    expect(newBlog.mock.calls[0][0].title).toBe('Karhun päiväuni')
    expect(newBlog.mock.calls[0][0].author).toBe('Heikki Mahla')
    expect(newBlog.mock.calls[0][0].url).toBe('www.karhu')

})




