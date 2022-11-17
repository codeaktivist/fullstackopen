const Blog = require('../models/blog')

const initialUserA = {
    username: 'testA',
    name: 'Mr. A Test',
    password: 'passA'
}

const initialUserB = {
    username: 'otherB',
    name: 'Mr. B Test',
    password: 'passB'
}

const initialBlogs = [
    {
        title: 'My first blog',
        author: 'Tester First',
        url: 'http://blog.com/1',
        likes: 1
    },
    {
        title: 'My second blog',
        author: 'Tester Second',
        url: 'http://blog.com/2',
        likes: 2
    },
    {
        title: 'My third blog',
        author: 'Tester Third',
        url: 'http://blog.com/3',
        likes: 3
    }
]

const nonExistingId = async () => {
    const toBeDeletedNote = new Blog({
        title: 'A dummy note to delete',
        author: 'Dummy',
        url: 'http://delete.com'
    })
    await toBeDeletedNote.save()
    await toBeDeletedNote.remove()
    return toBeDeletedNote._id.toString()
}

module.exports = {
    initialUserA,
    initialUserB,
    initialBlogs,
    nonExistingId
}