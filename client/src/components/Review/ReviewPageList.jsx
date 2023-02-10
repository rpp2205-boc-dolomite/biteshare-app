import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

export default function ReviewPageList (props) {
  var sample = [{name: 'Abby', amount: 31.34}, {name: 'Michelle Yeoh', amount: 42.12}, {name: 'Stephanie Hsu', amount: 12}];
  var host = {name: 'Jack Daniels', amount: 32.23};
  return(
    <Box sx={{ml: 4}}>
      {props.friendsAdded.map((element, index) => {
        return(
            <Grid container spacing={4} justifyContent="center" key={index}>
              <Grid container item xs={3} direction="column">
                <Typography>{element.name}</Typography>
              </Grid>
              <Grid container item xs={3} direction="column">
                <Typography>${element.meal_amount}</Typography>
              </Grid>
              <Grid container item xs={3} direction="column">
                <Typography>${Number(element.tip_amount).toFixed(2)}</Typography>
              </Grid>
              <Grid container item xs={3} direction="column">
                <Typography>${(Number(element.meal_amount) + Number(element.tip_amount)).toFixed(2)}</Typography>
              </Grid>
            </Grid>
        )
      })}
      <Grid container spacing={4} justifyContent="center">
        <Grid container item xs={3} direction="column">
          <Typography>You (Host)</Typography>
        </Grid>
        <Grid container item xs={3} direction="column">
          <Typography>${props.hostAmount.meal_amount.toFixed(2)}</Typography>
        </Grid>
        <Grid container item xs={3} direction="column">
          <Typography>${props.hostAmount.tip_amount.toFixed(2)}</Typography>
        </Grid>
        <Grid container item xs={3} direction="column">
          <Typography>${(props.hostAmount.meal_amount + props.hostAmount.tip_amount).toFixed(2)}</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}