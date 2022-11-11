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
        url: request.body.url,
        likes: request.body.likes
    })
    try {
        const result = await newBlog.save()
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