import { useState } from 'react'
import blogService from '../services/blogs'

const Create = (props) => {
    const emptyBlog = {
        title: '',
        author: '',
        url: ''
    }

    const [newBlog, setNewBlog] = useState(emptyBlog)

    const submitHandler = async (event) => {
        event.preventDefault()

        try {
            const response = await blogService.create({
                ...newBlog,
                token: props.user.token })
            if (response && response.data) {
                props.setBlogs(props.blogs.concat(response.data))
                props.setNotification({
                    type: 'info',
                    text: `Created: ${response.data.title}`
                })
                setTimeout(() => props.setNotification(null), 3000)
            }
        } catch (error) {
            props.setNotification({
                type: 'warning',
                text: error.response.data.error
            })
            setTimeout(() => props.setNotification(null), 3000)
        } finally {
            setNewBlog(emptyBlog)
            props.toggleRef.current.toggleVisible()
        }
    }

    return (
        <>
            <h2>Create new Blog</h2>
            <form onSubmit={submitHandler}>
                <div>
                    Title:<input
                        type='text'
                        name='title'
                        value={newBlog.title}
                        onChange={({ target }) => {
                            setNewBlog({
                                ...newBlog,
                                title: target.value }
                            )}}>
                    </input>
                </div>
                <div>
                    Author:<input
                        type='text'
                        name='author'
                        value={newBlog.author}
                        onChange={({ target }) => {
                            setNewBlog({
                                ...newBlog,
                                author: target.value }
                            )}}>
                    </input>
                </div>
                <div>
                    Url:<input
                        type='text'
                        name='url'
                        value={newBlog.url}
                        onChange={({ target }) => {
                            setNewBlog({
                                ...newBlog,
                                url: target.value }
                            )}}>
                    </input>
                </div>
                <p>
                    <button type='submit'>Create</button>
                </p>
            </form>
        </>
    )
}

export default Create