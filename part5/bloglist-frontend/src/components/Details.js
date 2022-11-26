import { useState } from 'react'
import blogService from '../services/blogs'

const Details = ({ blog, user, rerender }) => {
    // const [likes, setLikes] = useState(blog.likes)
    const [thisBlog, setThisBlog] = useState(blog)

    const likeHandler = async () => {
        // await blogService.addLike(blog)
        // setLikes(likes + 1)
        setThisBlog({
            ...thisBlog,
            likes: thisBlog.likes + 1
        })
        await blogService.addLike(thisBlog)
        rerender()
    }

    const removeHandler = async () => {
        if (window.confirm(`Remove blog: ${blog.title}`)) {
            await blogService.remove(blog.id, user.token)
            rerender()
        }
    }

    return (
        <>
            <div className='author'>{blog.author}</div>
            <div className='url'><a href={blog.url}>{blog.url}</a></div>
            <div className='likes'>
                Likes: {thisBlog.likes}
                <button onClick={likeHandler}>like</button>
            </div>
            {user.userId === (blog.userId.id || blog.userId)
                ? <div>
                    <button onClick={removeHandler}>delete</button>
                </div>
                : false
            }
        </>
    )
}

export default Details