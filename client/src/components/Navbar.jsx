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
      <h1>Bite Shre</h1>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography component="div" sx={{ flexGrow: 1}}>
              <Button component={Link} to="/dashboard" color="inherit">Meals</Button>
              <Button color="inherit">Friends</Button>
            </Typography>
            <Button component={Link} to="/" color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default Navbar;