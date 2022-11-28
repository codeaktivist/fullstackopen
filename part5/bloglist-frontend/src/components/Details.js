const Details = ({ blog, user, likeHandler, removeHandler }) => {
    return (
        <>
            <div className='url'><a href={blog.url}>{blog.url}</a></div>
            <div className='likes'>
                Likes: {blog.likes}
                <button onClick={likeHandler}>like</button>
            </div>
            {user.userId === (blog.userId?.id || blog.userId)
                ? <div>
                    <button onClick={() => removeHandler(blog)}>delete</button>
                </div>
                : false
            }
        </>
    )
}

export default Details