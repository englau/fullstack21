const { request, response } = require('express')
const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const blog = require('../models/blog')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({
        error: 'invalid token'
      })
    } else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({
        error: 'token expired'
      })
    }
  
    next(error)
  }




const tokenExtractor = (request, response, next) => {

    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token =authorization.substring(7)
      
    }
   
   next()
  }

  const userExtractor = async (request, response, next) => {

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }else{

      request.user = await User.findById(decodedToken.id)

    }
    next()
 
  }


module.exports = {tokenExtractor, userExtractor, errorHandler, unknownEndpoint }