import blogService from '../services/blogs'

const Create = (props) => {
    const submitHandler = async (event) => {
        event.preventDefault()

        try {
            const response = await blogService.create({
                ...props.newBlog,
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
            props.setNewBlog(props.emptyBlog)
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
                        value={props.newBlog.title}
                        onChange={({ target }) => {
                            props.setNewBlog({
                                ...props.newBlog,
                                title: target.value }
                            )}}>
                    </input>
                </div>
                <div>
                    Author:<input
                        type='text'
                        name='author'
                        value={props.newBlog.author}
                        onChange={({ target }) => {
                            props.setNewBlog({
                                ...props.newBlog,
                                author: target.value }
                            )}}>
                    </input>
                </div>
                <div>
                    Url:<input
                        type='text'
                        name='url'
                        value={props.newBlog.url}
                        onChange={({ target }) => {
                            props.setNewBlog({
                                ...props.newBlog,
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