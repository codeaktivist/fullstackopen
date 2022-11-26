import { useState } from 'react'
import blogService from '../services/blogs'

const Details = ({ blog, rerender }) => {
    // const [likes, setLikes] = useState(blog.likes)
    const [thisBlog, setThisBlog] = useState(blog)

    const onClickHandler = async () => {
        // await blogService.addLike(blog)
        // setLikes(likes + 1)
        setThisBlog({
            ...thisBlog,
            likes: thisBlog.likes + 1
        })
        await blogService.addLike(thisBlog)
        rerender()

    }

    return (
        <>
            <div className='author'>{blog.author}</div>
            <div className='url'><a href={blog.url}>{blog.url}</a></div>
            <div className='likes'>
                Likes: {thisBlog.likes}
                <button onClick={onClickHandler}>like</button>
            </div>
        </>
    )
}

export default Details