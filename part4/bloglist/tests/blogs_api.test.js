const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')

let testUserA = ''
let testUserB = ''


beforeAll(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    // create initialUsersA and token via log-in api
    const responseUserA = await api
        .post('/api/users')
        .send(helper.initialUserA)
        .expect(202)
        .expect('Content-Type', /application\/json/)

    testUserA = responseUserA.body

    const responseLoginA = await api
        .post('/api/login')
        .send({ username: testUserA.username, password: helper.initialUserA.password })
        .expect(200)
        .expect('Content-Type', /application\/json/)

    testUserA.token = responseLoginA.body.token
    expect(responseLoginA.body.username).toEqual(testUserA.username)

    const decodedUserA = await jwt.decode(responseLoginA.body.token, process.env.SECRET)
    expect(decodedUserA.id).toEqual(testUserA.id)


    // create initialUsersB and token via log-in api
    const responseUserB = await api
        .post('/api/users')
        .send(helper.initialUserB)
        .expect(202)
        .expect('Content-Type', /application\/json/)

    testUserB = responseUserB.body

    const responseLoginB = await api
        .post('/api/login')
        .send({ username: testUserB.username, password: helper.initialUserB.password })
        .expect(200)
        .expect('Content-Type', /application\/json/)

    testUserB.token = responseLoginB.body.token
    expect(responseLoginB.body.username).toEqual(testUserB.username)

    const decodedUserB = await jwt.decode(responseLoginA.body.token, process.env.SECRET)
    expect(decodedUserB.id).toEqual(testUserA.id)


    // create initial blogs for initialUserA
    for (const b of helper.initialBlogs) {
        b.userId = testUserA.id
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${testUserA.token}`)
            .send(b)
            .expect(201)
    }

})

// BONUS DEBUG FOR LATER: promiseArray / Promise.all throws Error 500, VersionError, save() on second Blog: can't find UserId?!?
// const promiseArray = helper.initialBlogs.map(async (b) => {
//     b.userId = testUser.id
//     console.log('CURRENT:', b)
//     const result = await api
//         .post('/api/blogs')
//         .set('Authorization', `bearer ${testUser.token}`)
//         .send(b)
//         .expect(201)

//     return result
// })
// const results = await Promise.all(promiseArray)
// console.log('PROMISEARRAY:', results[0].body)
// console.log('PROMISEARRAY:', results[1].body)

describe('receiving exiting notes', () => {
    test('get all blogs as JSON from server', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('has an property named "id"', async () => {
        const allBlogs = (await api.get('/api/blogs')).body
        expect(allBlogs[0]).toHaveProperty('id')
    })
})

describe('creating a note', () => {
    test('create a new blog post uses token information', async () => {
        const newBlog = {
            title: 'A test blog with a valid token',
            author: 'Jester',
            url: 'http://jest.com',
            likes: 1001
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${testUserA.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

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

    test('creating blogs without token fails', async () => {
        const blogsAtStart = (await api.get('/api/blogs')).body

        const newBlog = {
            title: 'A test blog without a token',
            author: 'Jester',
            url: 'http://jest.com',
            likes: 1001
        }
        const result = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)

        expect(result.body.error).toEqual('Token validation failed')

        const blogsAtEnd = (await api.get('/api/blogs')).body
        const contents = blogsAtEnd.map(b => {
            return({
                title: b.title,
                author: b.author,
                url: b.url,
                likes: b.likes
            })
        })

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
        expect(contents).not.toContainEqual(newBlog)
    })

    test('missing like property defaults to zero likes', async () => {
        const newNote = {
            title: 'This blog has no like property',
            author: 'Nolike',
            url: 'http://nolike.com'
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${testUserA.token}`)
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
            .set('Authorization', `bearer ${testUserA.token}`)
            .send(blogNoTitle)
            .expect(400)

        const blogNoUrl = {
            title: 'Blog without url',
            author: 'NoUrl'
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${testUserA.token}`)
            .send(blogNoUrl)
            .expect(400)
    })
})

describe('modifying notes', () => {
    test('User A updates his / her first blog', async () => {
        const oldBlog = await Blog.findOne({ title: helper.initialBlogs[0].title })
        const newBlog = {
            title: 'Update to my first Blog',
            author: 'Update by User A',
            url: 'http://updateblog.com/1',
            likes: 11
        }
        const result = await api
            .put(`/api/blogs/${oldBlog._id.toString()}`)
            .set('Authorization', `bearer ${testUserA.token}`)
            .send(newBlog)
            .expect(202)
            .expect('Content-Type', /application\/json/)

        expect(result.body.title).toEqual(newBlog.title)
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
            .set('Authorization', `bearer ${testUserA.token}`)
            .send(newBlog)
            .expect(404)

        const allBlogs = (await api.get('/api/blogs')).body
        expect(allBlogs.map(b => b.url)).not.toContain(newBlog.url)
    })
})

describe('deleting a note', () => {
    test('User A deletes his second blog successfully', async () => {
        const blogToDelete = await Blog.findOne({ title: helper.initialBlogs[1].title })

        const response = await api
            .delete(`/api/blogs/${blogToDelete._id.toString()}`)
            .set('Authorization', `bearer ${testUserA.token}`)
            .expect(202)
            .expect('Content-Type', /application\/json/)

        expect(response.body.title).toEqual(helper.initialBlogs[1].title)
    })

    test('deleting a non existing note fails with 404', async () => {
        await api
            .delete(`/api/blogs/${await helper.nonExistingId()}`)
            .set('Authorization', `bearer ${testUserA.token}`)
            .expect(404)
    })
})

describe('user administration', () => {
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

describe('Authentication', () => {
    test('logging in provides a token containing adequat info', async () => {

    })

    test('log-in of unknown user is rejected', async () => {

    })


})