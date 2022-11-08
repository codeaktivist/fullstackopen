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

const mostBlogs = (blogs) => {
    debugger // eslint-disable-line no-debugger
    const authors = new Map()
    blogs.map((b) => {
        (authors.has(b.author))
            ? authors.set(b.author, authors.get(b.author) + 1)
            : authors.set(b.author, 1)
    })
    let mostAuthor = ''
    let mostCount = 0
    authors.forEach((count, author) => {
        console.log(author, count)
        if (count >= mostCount) {
            mostAuthor = author
            mostCount = count
        }
    })
    return {
        author: mostAuthor,
        blogs: mostCount
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}