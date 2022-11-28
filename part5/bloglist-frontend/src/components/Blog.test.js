import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Show title and author only when collapsed', async () => {
    const mockBlog = {
        title: 'Mock title',
        author: 'Mock Author',
        url: 'Mock url',
        likes: 13,
        id: '666',
        userID: '1234'
    }

    const mockRerender = () => console.log('Rerender called')

    const mockUser = {
        username: 'mockuser',
        name: 'Mr. Mock',
        id: '1234'
    }

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