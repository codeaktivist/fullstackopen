import { useState } from 'react'
import blogService from '../services/blogs'

const Details = ({ blog, user, rerender }) => {
    const [thisBlog, setThisBlog] = useState(blog)

    const likeHandler = async () => {
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