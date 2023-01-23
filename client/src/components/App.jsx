import React, { useState } from 'react';
import HomePage from './HomePage.jsx';
import LoggedIn from './LoggedIn.jsx';

const App = (props) => {

  //we may need to render different page after login. so i created a simple app components
  return (
    <HomePage />
    // <Header />
  )
}

export default App;