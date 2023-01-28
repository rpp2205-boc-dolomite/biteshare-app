import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

export default function ReviewPageList (props) {
  var sample = [{name: 'Abby', amount: 31.34}, {name: 'Michelle Yeoh', amount: 42.12}, {name: 'Stephanie Hsu', amount: 12}];
  var host = {name: 'Jack Daniels', amount: 32.23};
  return(
    <Box sx={{ml: 4}}>
      {sample.map((element, index) => {
        return(
            <Grid container spacing={2}>
              <Grid container item xs={6} direction="column">
                <Typography>{element.name}</Typography>
              </Grid>
              <Grid container item xs={6} direction="column">
                <Typography>${element.amount}</Typography>
              </Grid>
            </Grid>
        )
      })}
      <Grid container spacing={2}>
        <Grid container item xs={6} direction="column">
          <Typography>You (Host)</Typography>
        </Grid>
        <Grid container item xs={6} direction="column">
          <Typography>${host.amount}</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}