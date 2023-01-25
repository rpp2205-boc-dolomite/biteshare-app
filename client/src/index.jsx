import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './components/App.jsx';
import Meals from './components/Meals.jsx';
import Meal from './components/Meal.jsx';

import Navbar from './components/Navbar.jsx';
import AddFriends from './components/createMeal/AddFriends.jsx';
import Review from './components/Review.jsx';
import SignUp from './components/SignUp.jsx';
import Login from './components/Login.jsx';



import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {path:"/", element:<App/>},
  {path:"/addfriends", element:<AddFriends />},
  {path:"/signup", element:<SignUp />},
  {path:"/login", element:<Login />},
  {path:"/dashboard", element:<Navbar />},
  {path:"/meals", element:<Meals />},
  {path:"meal", element:<Meal /> }
])

createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)