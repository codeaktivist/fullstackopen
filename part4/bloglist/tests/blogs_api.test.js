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
    const allBlogs = (await (await api.get('/api/blogs')).body)
    expect(allBlogs[0]).toHaveProperty('id')
})