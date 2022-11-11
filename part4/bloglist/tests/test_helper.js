const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'My first blog',
        author: 'Martin First',
        url: 'http://blog.com/1',
        likes: 1
    },
    {
        title: 'My second blog',
        author: 'Martin Second',
        url: 'http://blog.com/2',
        likes: 2
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
    initialBlogs,
    nonExistingId
}