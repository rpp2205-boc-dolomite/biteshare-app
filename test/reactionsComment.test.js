import React from 'react';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen, queries, within} from '@testing-library/react'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import '@testing-library/jest-dom';
import MealsList from '../client/src/components/Dashboard/MealsList.jsx';
import Navbar from '../client/src/components/Dashboard/Navbar.jsx';
import Home from '../client/src/components/Dashboard/Home.jsx';
import ReactionsComment from '../client/src/components/Dashboard/ReactionsComment.jsx';
import RenderRouteWithOutletContext from './RenderWithOutlet.jsx';
const feedData =
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
  }

const mockData={user:{
    user_id: "63d56a0483bd4d48f67c9981",
    name: "yuchen"
  }};



describe('Reactions rendered', () => {
  test('emojs available', async() => {
    const { container } = render(
      <RenderRouteWithOutletContext context={mockData}>
        <ReactionsComment data={feedData}/>
      </RenderRouteWithOutletContext>);

    await waitFor(() => {
      expect(screen.getByText('👍')).toBeDefined();
      expect(screen.getByText('❤️')).toBeDefined();
      expect(screen.getByText('🔥')).toBeDefined();
      expect(screen.getByText('🦷')).toBeDefined();
    })
    expect(screen.getByText('👍')).toBeDefined();
    expect(screen.getByText('❤️')).toBeDefined();
    expect(screen.getByText('🔥')).toBeDefined();
    expect(screen.getByText('🦷')).toBeDefined();
  })
})