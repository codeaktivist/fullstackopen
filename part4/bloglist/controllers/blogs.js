const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('userId', { blogs: 0 })
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    // const authHeader = request.get('Authorization')
    // if (!authHeader) {
    //     return response.status(403).json({ error: 'No authorization header' })
    // }

    // const token = authHeader.toLocaleLowerCase().startsWith('bearer')
    //     ? authHeader.substring(7)
    //     : null

    const token = request.token

    const decodedUser = await jwt.decode(token, process.env.SECRET)
    if (!decodedUser) {
        return response.status(403).json({ error: 'Token validation failed' })
    }

    const newBlog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        userId: decodedUser.id
    })
    try {
        const result = await newBlog.save()

        const authorUser = await User.findById(decodedUser.id)
        authorUser.blogs = authorUser.blogs.concat(result.id)
        authorUser.save()

        response.status(201).json(result)
    } catch (error) {
        next(error)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const updatedBlog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }

    try {
        const result = await Blog.findByIdAndUpdate(
            request.params.id,
            updatedBlog,
            { new: true, runValidators: true })
        if (result) {
            response.status(202).json(result)
        } else {
            response.status(404).json({ error: 'note for update not found' })
        }
    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findByIdAndRemove(request.params.id)
        if (blog) {
            response.status(202).json(blog)
        } else {
            response.status(404).json({ error: 'note for deletion not found' })
        }
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter