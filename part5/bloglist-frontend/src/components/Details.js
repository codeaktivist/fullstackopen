const Details = ({ blog }) => {
    return (
        <>
            <div className='author'>{blog.author}</div>
            <div className='url'><a href={blog.url}>{blog.url}</a></div>
            <div className='likes'>Likes: {blog.likes}</div>
        </>
    )
}

export default Details