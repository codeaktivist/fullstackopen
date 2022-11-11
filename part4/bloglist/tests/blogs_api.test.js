const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeAll(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('get all blogs as JSON from server', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('has an "id" named property', async () => {
    const allBlogs = (await api.get('/api/blogs')).body
    expect(allBlogs[0]).toHaveProperty('id')
})

test('create a new blog post', async () => {
    const newBlog = {
        title: 'A test blog added by jest',
        author: 'Jester',
        url: 'http://jest.com',
        likes: 1001
    }
    await Blog.create(new Blog(newBlog))
    const allBlogs = (await api.get('/api/blogs')).body
    const contents = allBlogs.map(b => {
        return({
            title: b.title,
            author: b.author,
            url: b.url,
            likes: b.likes
        })
    })

    expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContainEqual(newBlog)
})

test('missing like property defaults to zero likes', async () => {
    const newNote = {
        title: 'This blog has no like property',
        author: 'Nolike',
        url: 'http://nolike.com'
    }

    const response = await Blog.create(newNote)
    expect(response.likes).toBe(0)
})