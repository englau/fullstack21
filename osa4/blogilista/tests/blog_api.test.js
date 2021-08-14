const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')


let tokenLogger 
beforeEach( async () =>{

  const response = await api
  .post('/api/login')
  .send( { username: "Huu",
  password: "sala"})
  .expect(200)
  .expect('Content-Type', /application\/json/)

  tokenLogger= response.body.token

} )


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(23)
})


test('blogs are indentified as id', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

test('you can post a new blog to system and list length is grown by one', async() => {
    
    const newBlog = {
      "title": "Villakoiran koti",
      "author": "Harri Hoo",
      "url": "www.blogi.fi",
      "likes": 8,
    }

    const blogsAtBegin = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({"Authorization":`bearer ${tokenLogger} `})
      .expect(201)
      .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(blogsAtBegin.length + 1)
  
      const contents = blogsAtEnd.map(b => b.title)
      expect(contents).toContain(
        'Villakoiran koti'
      )
    })

test('blogs likes set to 0 if missing', async() => {
    const newBlog = {
        "title": "Koiruuksien koiruus",
        "author": "Vilma Koo",
        "url": "www.blogi.fi",
        }

    const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set({"Authorization":`bearer ${tokenLogger} `})
    .expect(201)
    expect(response.body.likes).toBe(0)

    })


test('if missing title or url', async() => {
  const newBlog = {
    "author": "Vilma Koo",
    "likes": 8,
    }

await api
.post('/api/blogs')
.send(newBlog)
.set({"Authorization":`bearer ${tokenLogger} `})

expect(400)
})

test('adding new blog fails if token is missing', async() => {
  const newBlog = {
    "title": "Sateen jälkiin",
    "author": "Hoo Moilanen",
    "url": "www.blogi.fi",
    "likes": 9
    }

await api
.post('/api/blogs')
.send(newBlog)

expect(401)
})



afterAll(() => {
  mongoose.connection.close()
})