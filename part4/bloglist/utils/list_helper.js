const dummy = (blogs) => {
    return blogs
        ? true
        : false
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, current) => {
        console.log('ADD: ', current)
        console.log('SUM: ', sum + current.likes)
        return sum + current.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((best, current) => {
        console.log('BEST: ', best.likes)
        console.log('CURRENT: ', current.likes)
        return (current.likes >= best.likes)
            ? current
            : best
    }, { likes: 0 })
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}