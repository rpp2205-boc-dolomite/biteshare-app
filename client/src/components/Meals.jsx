import React from 'react';
import Navbar from './Navbar.jsx';
import {Box, Card, CardContent} from '@mui/material';

function Meals(props) {
  return(
    <Box>
      <Navbar></Navbar>
      <Card>
        <CardContent>
          <Typography variant="h5">
            Restaurant Name
          </Typography>
        </CardContent>
      </Card>

    </Box>
  )
}

export default Meals;