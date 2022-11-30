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
    const token = request.token

    const decodedUser = await jwt.decode(token, process.env.SECRET)
    if (!decodedUser) {
        return response.status(401).json({ error: 'Token validation failed' })
    }

    // REWORK: An old token for a non-existing user also validates

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
        const blog = await Blog.findById(request.params.id)
        const user = request.user

        if (!user) {
            return response.status(401).json({ error: 'token authentication error, user not identified' })
        }

        if (!blog) {
            return response.status(404).json({ error: 'note for deletion not found' })
        }

        if (blog.userId.toString() !== user.id.toString()) {
            return response.status(401).json({ error: 'only author can delete blog' })
        }

        user.blogs = user.blogs.map(b => b.userId === user._id ? null : b)
        user.save()

        await Blog.findByIdAndRemove(request.params.id)

        response.status(202).json(blog)
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter