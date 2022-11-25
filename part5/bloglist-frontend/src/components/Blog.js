import { useState } from 'react'
import Details from './Details'

const Blog = ({ blog }) => {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div className='blog' key={blog.id}>
            <div className='title'>
                {blog.title}
                <button onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? 'hide' : 'show' }
                </button></div>

            {showDetails
                ? <Details blog={blog} />
                : false
            }
        </div>
    )
}

export default Blog