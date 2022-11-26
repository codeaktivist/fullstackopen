import { useState } from 'react'
import Details from './Details'

const Blog = ({ blog, rerender }) => {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div className='blog' key={blog.id}>
            <div className='title'>
                {blog.title}
                <button onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? 'hide' : 'show' }
                </button></div>

            {showDetails
                ? <Details blog={blog} rerender={rerender}/>
                : false
            }
        </div>
    )
}

export default Blog