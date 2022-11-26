const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const userExists = await User.findOne({ username })
    if (!userExists) {
        return response.status(403).json({ error: 'user not found' })
    }

    if (!await bcrypt.compare(password, userExists.passwordHash)) {
        return response.status(403).json({ error: 'wrong password' })
    }

    const token = await jwt.sign({ username, id: userExists._id }, process.env.SECRET, { expiresIn: 60 * 60 })
    response.json({ token, username, name: userExists.name, userId:userExists.id })
})

module.exports = loginRouter