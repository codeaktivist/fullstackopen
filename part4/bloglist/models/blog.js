const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        message: 'Must provide title'
    },
    author: {
        type: String,
        required: true,
        message: 'Must provide author'
    },
    url: {
        type: String,
        required: true,
        message: 'Must provide URL'
    },
    likes: {
        type: Number,
        default: 0
    }
}, {
    toJSON: {
        transform: (objectInDb, objectReturned) => {
            delete objectReturned.__v
            delete objectReturned._id
            objectReturned.id = objectInDb._id
        }
    }
})

module.exports = mongoose.model('Blog', blogSchema)