import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './components/App.jsx';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {path:"/", element:<App/>},
  // {path:"/signup", element:<SignUp />}
  // {path:"/login", element:<LogIn />}
])

createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)