import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './components/App.jsx';
<<<<<<< HEAD
import AddFriends from './components/createMeal/AddFriends.jsx';
=======
import Navbar from './components/Navbar.jsx';

>>>>>>> main

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {path:"/", element:<App/>},
<<<<<<< HEAD
  // {path:"/addfriends", element:<AddFriends />}
  // {path:"/signup", element:<SignUp />}
  // {path:"/login", element:<LogIn />}
=======
  // {path:"/signup", element:<SignUp />},
  //{path:"/login", element:<LogIn />},
  {path:"/dashboard", element:<Navbar />}
>>>>>>> main
])

createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)