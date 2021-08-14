const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')



test('is password correct', async () => {
    const newUser = {
        "username": "Haamu",
        "name": "Kevin",
        "password": "lo"  
  }

    const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  })


test('is username correct', async () => {
    const newUser = {
        "username": "Ko",
        "name": "Simon",
        "password": "sana"  
  }

    const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    
   
  })

  afterAll(() => {
    mongoose.connection.close()
  })