const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeAll(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('receiving exiting notes', () => {
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
})

describe('creating a note', () => {
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

        const response = await api
            .post('/api/blogs')
            .send(newNote)

        expect(response.body.likes).toBe(0)
    })

    test('url and title must be present to create a new blog', async () => {
        const blogNoTitle = {
            author: 'NoTitle',
            url: 'http://notitle.com'
        }

        await api
            .post('/api/blogs')
            .send(blogNoTitle)
            .expect(400)

        const blogNoUrl = {
            title: 'Blog without url',
            author: 'NoUrl'
        }

        await api
            .post('/api/blogs')
            .send(blogNoUrl)
            .expect(400)
    })
})

describe('modifying notes', () => {
    test('update an existing note by id', async () => {
        const oldBlog = await Blog.findOne({})
        const newBlog = {
            title: 'Update to my first Blog',
            author: 'Update Martin First',
            url: 'http://updateblog.com/1',
            likes: 111
        }
        const result = await api
            .put(`/api/blogs/${oldBlog._id.toString()}`)
            .send(newBlog)
            .expect(202)
            .expect('Content-Type', /application\/json/)

        const resultBlog = result.body
        delete resultBlog.id
        expect(resultBlog).toEqual(newBlog)
    })

    test('update an non-existing id will fail', async () => {
        const newBlog = {
            title: 'Update to non-existant Blog',
            author: 'Update Not there First',
            url: 'http://updatenotthere.com/1',
            likes: 7
        }
        await api
            .put(`/api/blogs/${await helper.nonExistingId()}`)
            .send(newBlog)
            .expect(404)

        const allBlogs = (await api.get('/api/blogs')).body
        expect(allBlogs.map(b => b.url)).not.toContain(newBlog.url)
    })
})

describe('deleting a note', () => {
    test('with a valid / existing id', async () => {
        const allBlogs = (await api.get('/api/blogs')).body
        const response = await api
            .delete(`/api/blogs/${allBlogs[0].id}`)
            .expect(202)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toEqual(allBlogs[0])
    })

    test('deleting a non existing note fails with 404', async () => {
        await api
            .delete(`/api/blogs/${await helper.nonExistingId()}`)
            .expect(404)
    })
})

describe('user administration', () => {
    beforeAll(async () => {
        await User.deleteMany({})
    })

    test('add a new user', async () => {
        const usersAtStart = await User.find({})
        const newUser = {
            name: 'Muster',
            username: 'muster',
            password: 'easy'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(202)
            .expect('Content-Type', /application\/json/)

        expect(result.body.username).toEqual(newUser.username)

        const usersAtEnd = await User.find({})
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    })

    test('creating a user with an existing username fails', async () => {
        const usersAtStart = await User.find({})
        const duplicateUser = {
            name: 'Muster',
            username: 'muster',
            password: 'eas'
        }

        const result = await api
            .post('/api/users')
            .send(duplicateUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toEqual('username must be unique')

        const usersAtEnd = await User.find({})
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })

    test('creating a user with short username fails', async () => {
        const usersAtStart = await User.find({})
        const duplicateUser = {
            name: 'Muster',
            username: 'mu',
            password: 'easy'
        }

        const result = await api
            .post('/api/users')
            .send(duplicateUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toEqual('validation error')

        const usersAtEnd = await User.find({})
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creating a user with short password fails', async () => {
        const usersAtStart = await User.find({})
        const duplicateUser = {
            name: 'Muster',
            username: 'muster',
            password: 'ea'
        }

        const result = await api
            .post('/api/users')
            .send(duplicateUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toEqual('password too short')

        const usersAtEnd = await User.find({})
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

})