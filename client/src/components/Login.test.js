import { render, screen, waitFor } from '@testing-library/react'

import '@testing-library/jest-dom';
import SignIn from './Login.jsx';

test('test runs', async () => {
    expect(1+1).toEqual(2)
})

// test('Login page should render', async () => {
//     render(<SignIn />)
//     await waitFor(() => screen.getByRole('heading'))

//     expect(screen.getByRole('heading')).toHaveTextContent(/SignIn/);
// })

/*
test('Login page should give error messages for incorrect username or password', async () => {
    render(<SignIn />)
})
*/
