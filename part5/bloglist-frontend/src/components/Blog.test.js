import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'
import Blog from './Blog'
import Create from './Create'

const mockLike = () => console.log('Like called')
const mockRemove = () => console.log('Delete called')

const mockBlog = {
    title: 'Mock title',
    author: 'Mock Author',
    url: 'Mock url',
    likes: 13,
    id: '666',
    userID: '1234'
}

const mockUser = {
    username: 'mockuser',
    name: 'Mr. Mock',
    id: '1234'
}


describe('showing a blog post', () => {
    test('title and author only when collapsed', async () => {

        render(<Blog blog={mockBlog} user={mockUser} likeHandler={mockLike} removeHandler={mockRemove}/>)

        const title = await screen.findByText(mockBlog.title, { exact: false })
        expect(title).toBeDefined()

        const author = await screen.findByText(mockBlog.author, { exact: false })
        expect(author).toBeDefined()

        const url = screen.queryByText(mockBlog.url, { exact: false })
        expect(url).toBeNull()

        const likes = screen.queryByText(mockBlog.likes, { exact: false })
        expect(likes).toBeNull()
    })

    test('url and likes when expanded', async () => {
        render(<Blog blog={mockBlog} user={mockUser} likeHandler={mockLike} removeHandler={mockRemove}/>)

        const buttonShow = screen.getByRole('button')
        const user = UserEvent.setup()
        await user.click(buttonShow)

        const url = await screen.findByText(mockBlog.url, { exact: false })
        expect(url).toBeDefined()

        const likes = await screen.findByText(mockBlog.likes, { exact: false })
        expect(likes).toBeDefined()
    })

    test('re-render is called twice when two likes are added', async () => {
        const mockLikeHandler = jest.fn()
        const user = UserEvent.setup()

        render(<Blog blog={mockBlog} user={mockUser} likeHandler={mockLikeHandler} removeHandler={mockRemove}/>)

        const buttonShow = screen.getByText('show')
        await user.click(buttonShow)

        const buttonLike = screen. getByText('like')
        await user.click(buttonLike)
        await user.click(buttonLike)
        expect(mockLikeHandler.mock.calls).toHaveLength(2)
    })

    test('create blog handler is called with specified inputs', async () => {
        const newBlog = {
            title: 'New title',
            author: 'New Author',
            url: 'New url'
        }

        const MockSetNewBlog = () => true
        const MockSubmitHandler = jest.fn(e => {
            e.preventDefault()
            const data = new FormData(e.target)
            expect(data.get('title')).toEqual(newBlog.title)
            expect(data.get('author')).toEqual(newBlog.author)
            expect(data.get('url')).toEqual(newBlog.url)
        })

        const user = UserEvent.setup()

        render(<Create newBlog={newBlog} setNewBlog={MockSetNewBlog} submitHandler={MockSubmitHandler}/>)

        const titleInput = screen.getByLabelText('Title:')
        await user.type(titleInput, newBlog.title)

        const authorInput = screen.getByLabelText('Author:')
        await user.type(authorInput, newBlog.author)

        const urlInput = screen.getByLabelText('Url:')
        await user.type(urlInput, newBlog.url)

        const button = screen.getByText('Create')
        await user.click(button)

        expect(MockSubmitHandler.mock.calls).toHaveLength(1)
    })
})