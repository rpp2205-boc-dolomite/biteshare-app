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

  console.log('props in reviews from step: ', props.inputs);
  const info = props.inputs.session.payload;

  if(redirect) {
    return <Navigate to='/meals' replace={true}/>
  }
  if(loading) {
    return <Loading />
  }
  if(info.reciept === '') {
    info.receipt = '../../../dist/images/No_Image_Available.jpeg'
  }

  return(
    <Box>
        <Box>
        <Box sx={{m: 5}}>
          <Typography variant="body1" sx={{m: 2}}><b>Restaurant Name:</b> {info.rest_name}</Typography>
          <Typography variant="body1" sx={{m: 2}}><b>Receipt:</b></Typography>
          <Grid container direction="column" alignItems="center" justifyContent="center">
            {info.receipt === '' ? ('') :(
              <Grid item>
                <img crossorigin="anonymous" src={info.receipt} max-width='100%' height="auto"></img>
              </Grid>
            )}
          </Grid>
          <Typography variant="body1" sx={{m: 2}}><b>Number of friends:</b> {info.friends.length + 1}</Typography>
          <Box display="flex" sx={{m: 2}}>
            <Typography variant="body1" ><b>Sub total:</b> ${info.sub_total.toFixed(2)}</Typography>
            <Typography sx={{ml: 5}}><b>Tip total:</b> ${info.tip_total.toFixed(2)}</Typography>
            <Typography sx={{ml: 5}}><b>Grand total: </b>${(info.tip_total + info.sub_total).toFixed(2)}</Typography>
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
          <ReviewPageList friendsAdded={info.friends} hostAmount={info.host}></ReviewPageList>
        </Box>
        </Box>
    </Box>
  )
}