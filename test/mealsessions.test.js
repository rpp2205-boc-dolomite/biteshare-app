import React from 'react';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen, queries, within} from '@testing-library/react'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import '@testing-library/jest-dom';
import MealsList from '../client/src/components/Meals/MealsList.jsx';
import Navbar from '../client/src/components/Navbar.jsx';
import Home from '../client/src/components/Home/Home.jsx';
import RenderRouteWithOutletContext from './RenderWithOutlet.jsx';
var store = {
  user: {
    id: "63d5690765b903d98477c097",
    name: "stacey",
    phone_num: "+14086934417",
    friends: ['63d5838a04780bc64888352b', '63d56f15bc52fa12c202aaf4', '63d59928f8f3035eb877d500', '63d57c569e7990832e533c76', '63d56a0483bd4d48f67c9981']
  }
}
const results = [
    {
        "active": true,
        "_id": "63d819b4a6d46b1c4583763e",
        "host": "63d56a0483bd4d48f67c9981",
        "detail": {
            "63d56a0483bd4d48f67c9981": {
                "name": "yuchen",
                "tip": 1.47,
                "bill": 21.41,
                "is_paid": false
            },
            "63d56921fb74d33c0a908e2b": {
                "name": "Yui",
                "tip": 1.75,
                "bill": 10.21,
                "is_paid": true
            },
            "63d5690765b903d98477c097": {
                "name": "stacey",
                "tip": 2.42,
                "bill": 12.32,
                "is_paid": false
            }
        },
        "rest_name": "Red Sky",
        "sub_total": 28.21,
        "tip_total": 2.11,
        "receipt": "www.google.com",
        "reactions": {
            "emojis": [
                "thumb",
                "like",
                "fire",
                "tooth"
            ],
            "thumb": [
                "63d57d8704421e1d60c0dbbe"
            ],
            "like": [],
            "fire": [],
            "tooth": []
        },
        "comments": [],
        "id": "63d819b4a6d46b1c4583763e"
    }
  ]


const server = setupServer(
  rest.get('/api/sessions', (req,res,ctx) => {
    return res(ctx.json(results));
  })
)

beforeAll(() => server.listen());
afterEach(() => {server.resetHandlers(); console.log('test reset')});
afterAll(() => server.close());

describe('Meals List page rendered', () => {

  test('Meals List button rendered', async () => {
    const { container } = render(
      <RenderRouteWithOutletContext context={store}>
        <MealsList />
      </RenderRouteWithOutletContext>);
    await waitFor(() => screen.getByText('Create a new Meal Session'))
    expect(screen.getByText('Create a new Meal Session')).toBeDefined();
  });

  // test('1 meal session rendered', async () => {
  //   const { container } = render(
  //     <RenderRouteWithOutletContext context={store}>
  //       <MealsList />
  //     </RenderRouteWithOutletContext>);
  //   console.log('one meal test', container.querySelectorAll(".MuiBox-root.css-3edbg9").length);
  //   await waitFor(() => {
  //     expect(container.querySelectorAll(".MuiBox-root.css-3edbg9")).toHaveLength(1)
  //   });
  // })
})