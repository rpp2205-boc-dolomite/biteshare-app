import React, { useState } from 'react';
import { Routes, Route, Outlet, Link, useOutletContext } from "react-router-dom";
import HomePage from './HomePage.jsx';
import MealsList from './Meals/MealsList.jsx';
import Meal from './PaymentAndMeals/Meal.jsx';
import Home from './Home/Home.jsx';
import Navbar from './Navbar.jsx';
import SignUp from './Auth/SignUp.jsx';
import Login from './Auth/Login.jsx';
import ChangePass from './Auth/Forgot/ChangePass.jsx';
import FriendsPage from './Friends/FriendsPage.jsx';
import CompletePayment from './PaymentAndMeals/CompletePayment.jsx'
import Steps from './Meals/Steps.jsx';
import Guest from './PaymentAndMeals/Guest.jsx';
import PrivateRoute from './PrivateRoute.jsx';

const App = () => {

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