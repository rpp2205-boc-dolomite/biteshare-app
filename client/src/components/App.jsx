import React, { useState } from 'react';
import { Routes, Route, Outlet, Link, useOutletContext } from "react-router-dom";
import HomePage from './HomePage.jsx';
import MealsList from './Dashboard/MealsList.jsx';
import Meal from './Meal.jsx';
import Home from './Dashboard/Home.jsx';
import Navbar from './Dashboard/Navbar.jsx';
import AddFriends from './Friends/AddFriends.jsx';
import MealDetails from './MealDetails/MealDetails.jsx';
import Review from './Review/Review.jsx';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import ChangePass from './ChangePass.jsx';
import FriendsPage from './Friends/FriendsPage.jsx';
import RestaurantSearch from './Restaurant/RestaurantSearch.jsx';
import CompletePayment from './CompletePayment.jsx'
import Steps from './Steps.jsx';
import Guest from './Guest.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import PrivateRoute from './PrivateRoute.jsx';

const App = () => {

  //we may need to render different page after login. so i created a simple app components
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot" element={<ChangePass />} />
      <Route path="/guest" element={<Guest />} />
      <Route path='/completePayment' element={<CompletePayment />} />
      <Route element={<PrivateRoute />}>
        <Route path="/meals" element={<MealsList />} />
        <Route path="/meal" element={<Meal />} />
        <Route path="/home" element={<Home />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/step" element={<Steps />} />
      </Route>

    </Routes>
  )
}

export default App;