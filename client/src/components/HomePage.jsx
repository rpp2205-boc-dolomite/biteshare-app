import React from 'react';
//import Box from '@mui/system';
import {Grid, Button, Box} from '@mui/material';
//import Button from '@mui/material/Button';
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom'

const HomePage = (props) => {
  var images = [
    {name: "bg1", src: "../images/bg5.jpeg"},
    {name: "bg2", src: "../images/bg4.jpeg"},
    {name: "bg3", src: "../images/bg8.jpeg"},
  ]

  var btnStyle = {
    m: 2,
    padding: '18px 36px',
    fontSize:'18px',
    '&:hover': {backgroundColor:'lightgrey'}
  }
  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} animation="fade" navButtonsAlwaysInvisible={true} indicators={false} duration="400">
      {images.map((image, i) => (
        <Box height="100vh" sx={{backgroundImage:`url(${image.src})`, backgroundPosition: 'top', backgroundSize:'100% 100%'}} key={i}>
          <Grid container direction="column" alignItems="center" justifyContent="center">
            <Grid item sx={{mt:"10%"}}>
            <img src="../images/logo-slogan.png" alt="BiteShare Logo" width="500" ></img>
            </Grid>
            <Grid item>
              {/* set button as Link component so it will link to the path we set in the index.jsx file */}
              <Button component={Link} to="/signup" variant="contained" size="large" color="secondary" sx={{...btnStyle}}>Sign Up</Button>
              <Button component={Link} to="/login" variant="contained" size="large" sx={{...btnStyle}}>Sign In</Button>
            </Grid>
          </Grid>
        </Box>)
      ) }
    </Carousel>
  )
}

export default HomePage;