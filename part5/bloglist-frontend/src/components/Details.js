import { useState } from 'react'
import blogService from '../services/blogs'

const Details = ({ blog }) => {
    const [likes, setLikes] = useState(blog.likes)

    const onClickHandler = () => {
        setLikes(likes + 1)
        blogService.addLike(blog)
    }
    return (
        <>
            <div className='author'>{blog.author}</div>
            <div className='url'><a href={blog.url}>{blog.url}</a></div>
            <div className='likes'>
                Likes: {likes}
                <button onClick={onClickHandler}>like</button>
            </div>
        </>
    )
}

export default Details