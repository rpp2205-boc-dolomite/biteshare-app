import { createRoot } from 'react-dom/client';
import React, { useMemo, useState } from 'react';
import App from './components/App.jsx';
import MealsList from './components/Dashboard/MealsList.jsx';
import Meal from './components/Meal.jsx';
import Home from './components/Dashboard/Home.jsx';
import Navbar from './components/Dashboard/Navbar.jsx';
import AddFriends from './components/Friends/AddFriends.jsx';
import MealDetails from './components/MealDetails/MealDetails.jsx';
import Review from './components/Review/Review.jsx';
import SignUp from './components/SignUp.jsx';
import Login from './components/Login.jsx';
import FriendsPage from './components/Friends/FriendsPage.jsx';
import RestaurantSearch from './components/Restaurant/RestaurantSearch.jsx';
import CompletePayment from './components/CompletePayment.jsx'
import Steps from './components/Steps.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {path:"/", element:<App/>},
  {path:"/addfriends", element:<AddFriends />},
  {path:"/mealdetails", element:<MealDetails />},
  {path:"/signup", element:<SignUp />},
  {path:"/login", element:<Login />},
  {path:"/meals", element:<MealsList />},
  {path:"/meal", element:<Meal />},
  {path: "/review", element: <Review />},
  {path:'/friends', element:<FriendsPage />},
  {path:"/searchRest", element:<RestaurantSearch />},
  {path:'/home', element: <Home/>},
  {path:"/completePayment", element: <CompletePayment />},
  {path:"/step", element: <Steps />},
  {path:"/guest", element: <Guest />}
]);


createRoot(document.getElementById('app')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
)