import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './components/App.jsx';
import Meals from './components/Meals.jsx';

import Navbar from './components/Navbar.jsx';
import AddFriends from './components/createMeal/AddFriends.jsx';
import Review from './components/Review.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {path:"/", element:<App/>},
  {path:"/addfriends", element:<AddFriends />},
  // {path:"/signup", element:<SignUp />},
  //{path:"/login", element:<LogIn />},
  {path:"/meals", element:<Meals />},
  {path:"/review", element: <Review />}
])

createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)