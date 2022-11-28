import { useState } from 'react'
// import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import Details from './Details'

const Blog = ({ blog, likeHandler, removeHandler , user }) => {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div className='blog' key={blog.id}>
            <div className='title'>
                {blog.title} (by {blog.author})
                <button onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? 'hide' : 'show' }
                </button></div>

            {showDetails
                ? <Details
                    blog={blog}
                    user={user}
                    likeHandler={likeHandler}
                    removeHandler={removeHandler}/>
                : false
            }
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    likeHandler: PropTypes.func.isRequired,
    removeHandler: PropTypes.func.isRequired
}

export default Blog