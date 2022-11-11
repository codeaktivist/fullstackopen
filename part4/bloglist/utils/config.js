require('dotenv').config()

const PORT = process.env.PORT || 3003

const MONGO_URL = (process.env.NODE_ENV === 'test')
    ? process.env.TEST_MONGO_URL
    : process.env.MONGO_URL

module.exports = {
    PORT,
    MONGO_URL
}