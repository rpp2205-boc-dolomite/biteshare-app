import React from 'react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen, queries, within } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom';
import MealsList from '../client/src/components/Meals/MealsList.jsx';
import Navbar from '../client/src/components/Navbar.jsx';
import Home from '../client/src/components/Home/Home.jsx';

test('Navbar is rendered', async () => {
  const { container } = render(<Navbar />, { wrapper: MemoryRouter })
  await waitFor(() => {
    screen.getByText('Home');
    screen.getByText('Meals');
    screen.getByText('Friends');
    screen.getByText('Logout');
  })
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Meals')).toBeInTheDocument();
  expect(screen.getByText('Friends')).toBeInTheDocument();
  expect(screen.getByText('Logout')).toBeInTheDocument();
})

describe('On click functionality for Logout', () => {
  // beforeEach(() => {
  //   global.localStorage = {
  //     clear: function () {
  //       return {};
  //     }
  //   };
  // });

  test('Local storage is cleared', async () => {
    const { container } = render(<Navbar />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByRole('link', { name: 'Logout' }));
    await waitFor(() => {
      expect(window.value).toBe(undefined);
    });
  });
});

describe('Navbar when displayed on guest page', () => {
  test('Sign In, Sign Up buttons rendered', async () => {
    const { container } = render(<Navbar guest={'guest'} />, { wrapper: MemoryRouter });
    await waitFor(() => {
      screen.getByText('Sign In')
      screen.getByText('Sign Up')
    });
  });
});
