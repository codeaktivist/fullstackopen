import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'
import Blog from './Blog'

const mockRerender = () => console.log('Rerender called')

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

        render(<Blog blog={mockBlog} rerender={mockRerender} user={mockUser}/>)

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
        render(<Blog blog={mockBlog} rerender={mockRerender} user={mockUser}/>)

        const button = screen.getByRole('button')
        const user = UserEvent.setup()
        await user.click(button)

        const url = await screen.findByText(mockBlog.url, { exact: false })
        expect(url).toBeDefined()

        const likes = await screen.findByText(mockBlog.likes, { exact: false })
        expect(likes).toBeDefined()
    })
})