const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


userRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

userRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body
    if (password.length < 3)
        return response.status(400).json({ error: 'password too short' })

    const existingUser = await User.findOne({ username })

    if (existingUser) {
        return response.status(400).json({ error: 'username must be unique' })
    }

    const newUser = new User(
        {
            username,
            name,
            passwordHash: await bcrypt.hash(password, 10)
        }
    )

    try {
        const result = await newUser.save()
        response.status(202).json(result)
    } catch (error) {
        next(error)
    }
})

module.exports = userRouter