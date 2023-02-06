import React from 'react';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen, queries, within} from '@testing-library/react'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import '@testing-library/jest-dom';
import FriendsPage from '../client/src/components/Friends/FriendsPage';
import { Link } from 'react-router-dom';

// const server = setupServer(
//   rest.get('/api', (req,res,ctx) => {
//     return res(ctx.status(200));
//   })
// )

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

const localStorageMock = (function() {
  let store = {
    user: {
      id: "63d56a0483bd4d48f67c9981",
      name: "yuchen",
      phone_num: "+12245950172",
      friends:['63d57090cd38c53af0a461fa', '63d8c7660a277bbead327d8c', '63d8be70b09aaa559bcdad88', '63d5690765b903d98477c097', '63ddf333424ace3e8d185d10', '63ddf374424ace3e8d185d15'],
    }
  }

  return {
    getItem: function(key) {
      return JSON.stringify(store[key]) || null
    },
    setItem: function(key, value) {
      store[key] = value.toString()
    },
    removeItem: function(key) {
      delete store[key]
    },
    clear: function() {
      store = {}
    }
  }
})()
const testUser =

describe('Test!', () => {
  test('ADD TEST', () => {
    expect(1 + 1).toBe(2);
  });
})

describe('Friends Page render Tests', () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock
    })
  })

  test('FriendsPage rendered', async () => {
    const { container } = render(<FriendsPage />, {wrapper: MemoryRouter})

    expect(screen.getByText('Your Friends List')).toBeDefined();
    expect(screen.getByRole('button')).toBeDefined();
    //expect(screen.querySelecotorAll('li')).toHaveLength(5);
  })


})