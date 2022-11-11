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

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((best, current) => {
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
    const authors = new Map()
    blogs.map((b) => {
        (authors.has(b.author))
            ? authors.set(b.author, authors.get(b.author) + 1)
            : authors.set(b.author, 1)
    })
    const bestAuthor = {
        author: '',
        blogs: 0
    }
    authors.forEach((count, author) => {
        if (count >= bestAuthor.blogs) {
            bestAuthor.author = author
            bestAuthor.blogs = count
        }
    })
    return bestAuthor
}

const mostLikes = (blogs) => {
    const authors = new Map()
    blogs.map(b => {
        authors.has(b.author)
            ? authors.set(b.author, authors.get(b.author) + b.likes)
            : authors.set(b.author, b.likes)
    })
    const bestAuthor = {
        author: '',
        likes: 0
    }
    authors.forEach((likes, author) => {
        if (likes >= bestAuthor.likes) {
            bestAuthor.author = author
            bestAuthor.likes = likes
        }
    })
    return bestAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}