const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [4, 'username must have 4 or more characters'],
        maxLength: [20, 'username no longer than 20 characters']
    },
    name: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20
    },
    passwordHash: {
        type: String,
        required: true
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString()
        delete returnedObject.passwordHash
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User