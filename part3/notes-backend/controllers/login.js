const User = require('../models/user')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body
    const existingUser = await User.findOne( { username })
    if (!existingUser) {
        return response.status(401).json({ error: 'Username (or password) incorrect' })
    }

    if (!(await bcrypt.compare(password, existingUser.passwordHash)))
        return response.status(401).json({ error: '(Username or) password incorrect' })

    const userForToken = {
        username: existingUser.username,
        id: existingUser._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 })

    response
        .status(200)
        .json({ token, user: username, name: existingUser.name })
})

module.exports = loginRouter