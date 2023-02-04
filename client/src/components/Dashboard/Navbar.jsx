import React from 'react';
import {Button, AppBar, Box, Toolbar, Typography, createTheme} from '@mui/material';
import { Link } from 'react-router-dom';

// let theme = createThem({
//   palette: {
//     primary: {
//       main: '#000000'
//     }
//   }
// })

function Navbar (props) {

  return(
    <div>
      <Typography align="center">
      <img src="../images/BOC-logo.png" alt="BiteShare Logo" width="175" ></img>
      </Typography>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography component="div" sx={{ flexGrow: 1}}>
              <Button size="large" variant="text" component={Link} to="/home" color="inherit">Home</Button>
              <Button size="large" variant="text" component={Link} to="/meals" color="inherit">Meals</Button>
              <Button size="large" variant="text" component={Link} to="/friends" color="inherit">Friends</Button>
            </Typography>
            <Button component={Link} to="/" color="inherit" onClick={() => {localStorage.clear()}}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default Navbar;