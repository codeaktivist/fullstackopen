const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        passwordHash: {
            type: String,
            required: true
        }
    },{
        toJSON : {
            transform: (doc, ret) => {
                ret.id = doc._id.toString()
                delete ret.passwordHash
                delete ret._id
                delete ret.__v
            }
        }
    })

const User = mongoose.model('User', userSchema)

module.exports = User