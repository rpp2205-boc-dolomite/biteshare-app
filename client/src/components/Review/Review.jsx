import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Stack} from '@mui/material';
import { Link, useLocation, Navigate } from 'react-router-dom';
import Navbar from '../Dashboard/Navbar.jsx';
import ReviewPageList from './ReviewPageList.jsx';
import Loading from '../Loading.jsx';
import axios from 'axios';


export default function Review(props) {

  var btnStyle = {
    m: 2,
    fontSize:'16px',
    '&:hover': {backgroundColor:'lightgrey'}
  }

  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  //uncomment when Matt finishes his page and update page to display the info
  // const { state }  = useLocation();
  // console.log({state});
  console.log('props in reviews from step: ', props.inputs);
  const postSessions = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('/api/sessions', data)
    .then((response) => {
      setRedirect(true);
    })
    .catch((err) => {
      console.log(err);
    })
  };

  if(redirect) {
    return <Navigate to='/meals' replace={true}/>
  }
  if(loading) {
    return <Loading />
  }

  return(
    <Box>
      {/* <Navbar></Navbar> */}
        <Box>
        <Box sx={{m: 5}}>
          <Typography variant="body1" sx={{m: 2}}>Restaurant Name: {props.inputs.restInfo.name}</Typography>
          <Typography variant="body1" sx={{m: 2}}>Total: $100</Typography>
          <Button variant="contained" size="small" sx={{ml:3, '&:hover': {backgroundColor:'lightgrey'}, backgroundColor: 'black'}}>View Receipt</Button>
          <Typography variant="body1" sx={{m: 2}}>Number of friends: {props.inputs.friends.length}</Typography>
          <Box display="flex" sx={{m: 2}}>
            <Typography variant="body1" >Total: $20.00</Typography>
            <Typography sx={{ml: 5}}>Tip rate: 20%</Typography>
          </Box>
          <Typography variant="body1" sx={{m: 2}}>Friends: </Typography>
          <ReviewPageList></ReviewPageList>
        </Box>
        {/* <Grid container rowSpacing={20} direction="column" alignItems="center" justifyContent="center">
        if we using step component we don't need these 2 button anymore
        <Grid item>
          Change onClick function in button to postSessions(e) after Matt finishes his part
            <Button variant="contained" size="large" sx={{...btnStyle, backgroundColor: "black"}} onClick={(e) => { setRedirect(true); }}>Confirm</Button>
            <Button component={Link} to="/mealdetails" variant="contained" size="large" sx={{...btnStyle, backgroundColor:'black'}}>Edit</Button>
          </Grid>
        </Grid> */}
        </Box>
    </Box>
  )
}