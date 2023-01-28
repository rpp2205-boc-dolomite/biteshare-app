import React from 'react';
import { Box, Button, Typography, Grid, Stack} from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import ReviewPageList from './ReviewPageList.jsx';



export default function Review(props) {

  var btnStyle = {
    m: 2,
    fontSize:'16px',
    '&:hover': {backgroundColor:'lightgrey'}
  }

  const postSessions = () => {

  }

  return(
    <Box>
      <Navbar></Navbar>
      <Box sx={{m: 5}}>
        <Typography variant="body1" sx={{m: 2}}>Restaurant Name: Maecenas</Typography>
        <Typography variant="body1" sx={{m: 2}}>Total: $100</Typography>
        <Button variant="contained" size="small" sx={{ml:3, '&:hover': {backgroundColor:'lightgrey'}, backgroundColor: 'black'}}>View Receipt</Button>
        <Typography variant="body1" sx={{m: 2}}>Number of friends: 5</Typography>
        <Box display="flex" sx={{m: 2}}>
          <Typography variant="body1" >Total: $20.00</Typography>
          <Typography sx={{ml: 5}}>Tip rate: 20%</Typography>
        </Box>
        <Typography variant="body1" sx={{m: 2}}>Friends: </Typography>
        <ReviewPageList></ReviewPageList>
      </Box>
      <Grid container rowSpacing={20} direction="column" alignItems="center" justifyContent="center">
       <Grid item>
          <Button component={Link} to="/meals" variant="contained" size="large" sx={{...btnStyle, backgroundColor: "black"}}>Confirm</Button>
          <Button component={Link} to="/create" variant="contained" size="large" sx={{...btnStyle, backgroundColor:'black'}}>Edit</Button>
        </Grid>
       </Grid>
    </Box>
  )
}