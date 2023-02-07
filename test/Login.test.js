import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import SignIn from '../client/src/components/Login.jsx';

test('test runs', async () => {
    expect(1+1).toEqual(2)
})

test('Login page should render', async () => {
    const { container } = render(<SignIn />)
    await waitFor(() => screen.getByText('Sign In'))

    expect(screen.getByText('Sign In')).toBeInTheDocument();
})

test('Should Return Error for account does not exist', async () => {
    const { container } = render(<SignIn />)
    await waitFor(() => screen.getByText('Sign In'))
    var phone_numInput = container.querySelector(`input[name="tel"]`)
    var passwordInput = container.querySelector(`input[name="password"]`)
   
    fireEvent.change(phone_numInput, {target: {value: '8138209478'}})
    fireEvent.change(passwordInput, {target: {value: 'wrong'}})
    fireEvent.click(screen.getByText('Sign In'))

    expect(screen.getByText('There is no account registered to this username.')).toBeInTheDocument();
})
test('Should return error message for incorrect password', async () => {
    const { container } = render(<SignIn />)
    await waitFor(() => screen.getByText('Sign In'))
    var phone_numInput = container.querySelector(`input[name="tel"]`)
    var passwordInput = container.querySelector(`input[name="password"]`)
   
    fireEvent.change(phone_numInput, {target: {value: '8138209478'}})
    fireEvent.change(passwordInput, {target: {value: 'wrong'}})
    fireEvent.click(screen.getByText('Sign In'))

    expect(screen.getByText('The password you have entered is incorrect.')).toBeInTheDocument();

})

test('Should redirect to /meals when signed in', async () => {
    const { container } = render(<SignIn />)
    await waitFor(() => screen.getByText('Sign In'))

})
