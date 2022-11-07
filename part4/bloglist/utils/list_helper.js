const dummy = (blogs) => {
    return blogs
        ? true
        : false
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, current) => {
        return sum + current.likes
    }, 0)
}

module.exports = {
    dummy,
    totalLikes
}