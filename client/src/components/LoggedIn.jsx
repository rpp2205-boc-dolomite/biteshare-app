import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Header = () => {
  let buttonStyle = {
    margin: "1%",
    fontSize: "small",
    color: "black"
  };

  return (
    <>
      <h2>Bite Share</h2>
      <nav>
          <Link style={buttonStyle} to={`/`}>LogOut</Link>
          <Link style={buttonStyle} to={`/`}>Meals</Link>
      </nav>
      <hr/>
    </>

  )
}
export default Header;