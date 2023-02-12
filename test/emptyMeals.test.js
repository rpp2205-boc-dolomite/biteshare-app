import React from 'react';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen, queries, within} from '@testing-library/react'
import '@testing-library/jest-dom';
import MealsList from '../client/src/components/Dashboard/MealsList.jsx';
import Navbar from '../client/src/components/Dashboard/Navbar.jsx';
import Home from '../client/src/components/Dashboard/Home.jsx';
import RenderRouteWithOutletContext from './RenderWithOutlet.jsx';
var store = {
  user: {
    id: "63d5690765b903d98477c097",
    name: "stacey",
    phone_num: "+14086934417",
    friends: ['63d5838a04780bc64888352b', '63d56f15bc52fa12c202aaf4', '63d59928f8f3035eb877d500', '63d57c569e7990832e533c76', '63d56a0483bd4d48f67c9981']
  }
}

const results = [];

const server = setupServer(
  rest.get('/api/sessions', (req,res,ctx) => {
    return res(ctx.json(results));
  })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// describe('Home page is empty', () => {
//   beforeEach(() => {
//     Object.defineProperty(window, "localStorage", {
//       value: localStorageMock
//     })
//   })
//   test('', async () => {
//     const { container } = render(<Home />, {wrapper: MemoryRouter});
//     await waitFor(() => {
//       expect(container.querySelectorAll(".MuiBox-root.css-3edbg9")).toHaveLength(0)
//     })
//   })
// });

describe('Meals List page rendered', () => {
  test('Meals page is empty', async () => {
    const { container } = render(
      <RenderRouteWithOutletContext context={store}>
        <MealsList />
      </RenderRouteWithOutletContext>
    );
    await waitFor(() => {
      expect(container.querySelectorAll(".MuiBox-root.css-3edbg9")).toHaveLength(0)
    });
  })
});