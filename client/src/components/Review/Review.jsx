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
    axios.post('/api/sessions', props.inputs)
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
          <Typography variant="body1" sx={{m: 2}}><b>Restaurant Name:</b> {props.inputs.restInfo.name}</Typography>
          <p>Image will go here</p>
          <Typography variant="body1" sx={{m: 2}}><b>Number of friends:</b> {props.inputs.friends.length + 1}</Typography>
          <Box display="flex" sx={{m: 2}}>
            <Typography variant="body1" ><b>Sub total:</b> ${props.inputs.sub_total}</Typography>
            <Typography sx={{ml: 5}}><b>Tip total:</b> ${props.inputs.tip_total}</Typography>
            <Typography sx={{ml: 5}}><b>Grand total: </b>${props.inputs.tip_total + props.inputs.sub_total}</Typography>
          </Box>
          <Grid container spacing={4} justifyContent="center">
              <Grid container item xs={3} direction="column">
                <Typography sx={{ fontWeight: 'bold' }}>Participants</Typography>
              </Grid>
              <Grid container item xs={3} direction="column">
                <Typography sx={{ fontWeight: 'bold' }}>Meal Amount</Typography>
              </Grid>
              <Grid container item xs={3} direction="column">
                <Typography sx={{ fontWeight: 'bold' }}>Tip Amount</Typography>
              </Grid>
              <Grid container item xs={3} direction="column">
                <Typography sx={{ fontWeight: 'bold' }}>Total</Typography>
              </Grid>
            </Grid>
          <ReviewPageList friendsAdded={props.inputs.friends} hostAmount={props.inputs.host}></ReviewPageList>
        </Box>
        </Box>
    </Box>
  )
}