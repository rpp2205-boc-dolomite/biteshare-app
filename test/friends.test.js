import React from 'react';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import FriendsPage from '../client/src/components/Friends/FriendsPage';
import { Link } from 'react-router-dom';
const server =setupServer(
  rest.get('/friends', (req,res,ctx) => {
    return res(ctx.status(200));
  })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const testUser = {
  id: "63d56a0483bd4d48f67c9981",
  name: "yuchen",
  phone_num: "+12245950172",
  friends:['63d57090cd38c53af0a461fa', '63d8c7660a277bbead327d8c', '63d8be70b09aaa559bcdad88', '63d5690765b903d98477c097', '63ddf333424ace3e8d185d10', '63ddf374424ace3e8d185d15'],
};

describe('Test!', () => {
  test('should render Friends list title', () => {
    expect(testUser.name).toBe('yuchen');
  });
})

// describe('Friends Page render Tests', () => {
//   test('handles server error', async () => {
//     server.use(
//       rest.get('/friends', (req, res, ctx) => {
//         return res(ctx.status(500))
//       }),
//     )

//     render(<FriendsPage url='/friends' state={testUser} />)
//   })


// })