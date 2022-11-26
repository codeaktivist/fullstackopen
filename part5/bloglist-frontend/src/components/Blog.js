import { useState } from 'react'
import Details from './Details'
import PropTypes from 'prop-types'

const Blog = ({ blog, rerender, user }) => {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div className='blog' key={blog.id}>
            <div className='title'>
                {blog.title}
                <button onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? 'hide' : 'show' }
                </button></div>

            {showDetails
                ? <Details
                    blog={blog}
                    user={user}
                    rerender={rerender}/>
                : false
            }
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    rerender: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default Blog