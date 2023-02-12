import React from 'react';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen, queries, within} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import '@testing-library/jest-dom';
import FriendsPage from '../client/src/components/Friends/FriendsPage';
import HomePage from '../client/src/components/HomePage';
import RenderRouteWithOutletContext from './RenderWithOutlet.jsx';
//import Steps from '../client/src/components/Steps';
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


// describe('Step tests', () =>{

//   test('Step render with a next button for the first page', async() => {
//     render(
//     <RenderRouteWithOutletContext context={mockData}>
//       <Steps />
//     </RenderRouteWithOutletContext>)
//   })
// })

describe('HomePage render Tests!', () => {
  test('HomePage with img logo', async() => {
    render(<HomePage />, {wrapper: MemoryRouter});
    expect(screen.getAllByAltText('BiteShare Logo')).toHaveLength(3);
  });
})


describe('Friends Page render Tests', () => {
    var mockData = {user:{
      user_id: "63d56a0483bd4d48f67c9981",
      name: "yuchen"
    }};


  test('FriendsPage rendered', async () => {
    const { container } = render(
    <RenderRouteWithOutletContext context={mockData}>
      <FriendsPage />
    </RenderRouteWithOutletContext>
    )

    await waitFor(() => {
      expect(container.querySelectorAll('.swipeable-list-item')).toHaveLength(6);
    })
    expect(screen.getByText('Your Friends List')).toBeDefined();
  })

  test ('Click add friends btn should pop up a new window', async() => {
    const { container, queryByText} =  render(
      <RenderRouteWithOutletContext context={mockData}>
        <FriendsPage />
      </RenderRouteWithOutletContext>)
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