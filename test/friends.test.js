import React from 'react';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen, queries, within} from '@testing-library/react'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import '@testing-library/jest-dom';
import FriendsPage from '../client/src/components/Friends/FriendsPage';
import { Link } from 'react-router-dom';

const results = {
  friends:[
    {_id: '63d8c7660a277bbead327d8c', name: 'www', phone_num: '+13123334444'},
    {_id: '63d8be70b09aaa559bcdad88', name: 'ccc', phone_num: '+11231231239'},
    {_id: '63d5690765b903d98477c097', name: 'stacey', phone_num: '+14086934417'},
    {_id: '63d71c233a9a07c7037519ca', name: 'ccc', phone_num: '+11231231234'},
    {_id: '63ddf333424ace3e8d185d10', name: 'Lily', phone_num: '+12248301279'},
    {_id: '63df1bf3783cd71433b38c76', name: 'lucky', phone_num: '+18889998888'}
  ]
};
const server = setupServer(
  rest.get('/api/friends', (req,res,ctx) => {
    return res(ctx.json(results));
  })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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
    await waitFor(() => {
      expect(container.querySelectorAll('li')).toHaveLength(6);
    })
    expect(screen.getByText('Your Friends List')).toBeDefined();
  })

  test ('Click add friends btn should pop up a new window', async() => {
    const { container, queryByText} = render(<FriendsPage />, {wrapper: MemoryRouter})
    // fireEvent.click(screen.getByText(/Add a new friend/i));
    fireEvent.click(screen.getByRole('button', {name:'Add a new friend'}));
    await waitFor(() => expect(queryByText("New friends?")).toBeDefined());

    fireEvent.click(screen.getByRole('button', {name:'Add'}));
    expect(screen.getByText('Invalid phone number')).toBeDefined();
    const nameInput = screen.getByLabelText('name').querySelector('input');
    const phoneInput = screen.getByLabelText('phone').querySelector('input');
    fireEvent.change(nameInput, {target: {value: 'userFromTest'}});
    expect(nameInput.value).toBe('userFromTest');
    fireEvent.change(phoneInput, {target: {value: '1231231234'}});
    expect(phoneInput.value).toBe('1231231234');
    fireEvent.click(screen.getByRole('button', {name:'Add'}));
    await waitFor(() => expect(container.querySelector('MuiAlert-message')).toBeDefined());

  })




})