import LogRocket from 'logrocket';
LogRocket.init('si2pqs/biteshare');
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './components/App.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from './components/ErrorBoundary.jsx';


const theme = createTheme({
  palette: {
    primary: {
      main: '#76294B',
    },
    secondary: {
      main: '#E3A377',
    },
  },
});

createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>

      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)

// import MealsList from './components/Dashboard/MealsList.jsx';
// import Meal from './components/Meal.jsx';
// import Home from './components/Dashboard/Home.jsx';
// import Navbar from './components/Dashboard/Navbar.jsx';
// import AddFriends from './components/Friends/AddFriends.jsx';
// import MealDetails from './components/MealDetails/MealDetails.jsx';
// import Review from './components/Review/Review.jsx';
// import SignUp from './components/SignUp.jsx';
// import Login from './components/Login.jsx';
// import FriendsPage from './components/Friends/FriendsPage.jsx';
// import RestaurantSearch from './components/Restaurant/RestaurantSearch.jsx';
// import CompletePayment from './components/CompletePayment.jsx'
// import Steps from './components/Steps.jsx';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";


// const router = createBrowserRouter([
//   {path:"/", element:<App/>},
//   {path:"/addfriends", element:<AddFriends />},
//   {path:"/mealdetails", element:<MealDetails />},
//   {path:"/signup", element:<SignUp />},
//   {path:"/login", element:<Login />},
//   {path:"/meals", element:<MealsList />},
//   {path:"/meal", element:<Meal />},
//   {path: "/review", element: <Review />},
//   {path:'/friends', element:<FriendsPage />},
//   {path:"/searchRest", element:<RestaurantSearch />},
//   {path:'/home', element: <Home/>},
//   {path:"/completePayment", element: <CompletePayment />},
//   {path:"/step", element: <Steps />}
// ]);


// createRoot(document.getElementById('app')).render(
//     <React.StrictMode>
//       <ThemeProvider theme={theme}>
//         <RouterProvider router={router} />
//       </ThemeProvider>
//     </React.StrictMode>
// )
