import React from 'react';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen, queries, within} from '@testing-library/react'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import '@testing-library/jest-dom';
import MealsList from '../client/src/components/Meals/MealsList.jsx';
import Navbar from '../client/src/components/Navbar.jsx';
import Home from '../client/src/components/Home/Home.jsx';
import ReactionsComment from '../client/src/components/Home/ReactionsComment.jsx';
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
        "_id": "63d5690765b903d98477c097",
        "friendSessions": [
            {
                "_id": "63dc8afd1c156adbad6358a3",
                "host": "63d57c569e7990832e533c76",
                "rest_name": "Birria Patro Jaramillo",
                "detail": {
                    "63d5690765b903d98477c097": {
                        "name": "stacey",
                        "bill": 10,
                        "tip": 5,
                        "is_paid": false
                    },
                    "63d57c569e7990832e533c76": {
                        "name": "not stace",
                        "bill": 0,
                        "tip": 0,
                        "is_paid": false
                    }
                },
                "sub_total": 0,
                "tip_total": 0,
                "receipt": "",
                "active": true,
                "reactions": {
                    "emojis": [
                        "thumb",
                        "like",
                        "fire",
                        "tooth"
                    ],
                    "thumb": [],
                    "like": [],
                    "fire": [],
                    "tooth": []
                },
                "comments": []
            },
            {
                "_id": "63dd919aa61df06ad05cee63",
                "host": "63d56a0483bd4d48f67c9981",
                "rest_name": "Great China House",
                "detail": {
                    "63d8c7660a277bbead327d8c": {
                        "name": "www",
                        "bill": "40.00",
                        "tip": "7.20",
                        "is_paid": false
                    },
                    "63d8be70b09aaa559bcdad88": {
                        "name": "ccc",
                        "bill": "40.00",
                        "tip": "7.20",
                        "is_paid": false
                    },
                    "63d56a0483bd4d48f67c9981": {
                        "name": "yuchen",
                        "bill": 40,
                        "tip": 7.199999999999999,
                        "is_paid": false
                    }
                },
                "sub_total": 120,
                "tip_total": 21.599999999999998,
                "receipt": "https://upcdn.io/W142hJk/raw/demo/4mfweMTJ3S.jpeg",
                "active": true,
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
                    "like": [
                        "63dee9b737890bb4527af5c9"
                    ],
                    "fire": [],
                    "tooth": [
                        "63dee9b737890bb4527af5c9"
                    ]
                },
                "comments": [
                    {
                        "user_id": "63d57d8704421e1d60c0dbbe",
                        "text": "this is awesome!",
                        "_id": "63deca8570897d7988f91b42",
                        "date": "2023-02-04T21:13:41.041Z"
                    },
                    {
                        "user_id": "63dee9b737890bb4527af5c9",
                        "text": "Love that place!",
                        "_id": "63deea0c37890bb4527af5db",
                        "date": "2023-02-04T23:28:12.741Z"
                    },
                    {
                        "user_id": "63dee9b737890bb4527af5c9",
                        "text": "best restaurant!",
                        "_id": "63e59e323d19f5ce6002a3a9",
                        "date": "2023-02-10T01:30:26.500Z"
                    }
                ]
            }
          ]
        }
      ]

const server = setupServer(
  rest.get('/api/feed', (req,res,ctx) => {
    return res(ctx.json(results));
  })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe('Home page is rendered', () => {
  test('', async () => {
    const { container } = render(
    <RenderRouteWithOutletContext context={store}>
      <Home />
    </RenderRouteWithOutletContext>);
    await waitFor(() => {
      expect(container.querySelectorAll(".MuiBox-root.css-3edbg9")).toHaveLength(2)
    })
  })
})