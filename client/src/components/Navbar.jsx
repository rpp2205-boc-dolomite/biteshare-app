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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography component="div" sx={{ flexGrow: 1}}>
              <Button color="inherit">Meals</Button>
              <Button color="inherit">Friends</Button>
            </Typography>
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default Navbar;