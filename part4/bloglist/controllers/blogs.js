const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const newBlog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.ulm,
        likes: request.body.likes
    })
    try {
        const result = await newBlog.save()
        response.status(201).json(result)
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter