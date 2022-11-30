const Create = ({ submitHandler, newBlog, setNewBlog }) => {
    return (
        <>
            <h2>Create new Blog</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor='titleInput'>
                        Title:
                    </label>
                    <input
                        id='titleInput'
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
                    <label htmlFor='authorInput'>
                        Author:
                    </label>
                    <input
                        id='authorInput'
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
                    <label htmlFor='urlInput'>
                        Url:
                    </label>
                    <input
                        id='urlInput'
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
                    <button type='submit'>Save</button>
                </p>
            </form>
        </>
    )
}

export default Create