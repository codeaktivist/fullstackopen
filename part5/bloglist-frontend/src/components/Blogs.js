const Blogs = ({ blogs }) => {
    return (
        blogs.map(b => {
            return (
                <div className='blog' key={b.id}>
                    <div className='title'>{b.title}</div>
                    <div className='author'>{b.author}</div>
                    <div className='url'><a href={b.url}>{b.url}</a></div>
                    <div className='likes'>Likes: {b.likes}</div>
                </div>
            )
        })
    )
}

export default Blogs