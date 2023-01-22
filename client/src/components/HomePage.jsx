import React from 'react';
import {Box, ThemeProvider, createTheme} from '@mui/system';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Carousel from 'react-material-ui-carousel'


const HomePage = (props) => {
  var images = [
    {name: "bg1", src: "/Users/rain/hackreactor/biteshare-app/client/src/images/bg5.jpeg"},
    {name: "bg2", src: "/Users/rain/hackreactor/biteshare-app/client/src/images/bg4.jpeg"},
    {name: "bg3", src: "/Users/rain/hackreactor/biteshare-app/client/src/images/bg8.jpeg"},
  ]
  var titleStyle = {
    fontSize:'3em',
    textAlign:'center',
    textShadow:'2px 2px 2px white ',

  }
  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} animation="fade" navButtonsAlwaysInvisible={true} indicators={false} duration="400">
      {images.map((image, i) => (
        <Box height="100vh" sx={{p:2, backgroundImage:`url(${image.src})`, backgroundPosition: 'top', backgroundSize:'100% 100%'}} key={i}>
          <Grid container rowSpacing={20} direction="column" alignItems="center" justifyContent="center">
            <Grid item sx={{mt:"40%"}}>
              <h1 style={titleStyle}>Bite Share</h1>
              <h3>Make splitting bills simple and easy</h3>
            </Grid>
            <Grid item sx={{ '& button': { m: 2, padding: "18px 36px", fontSize: "18px", '&:hover': {backgroundColor:'lightgrey'}} }}>
                <Button variant="contained" size="large" sx={{backgroundColor: "white", color: "black"}}>Sign Up</Button>
                <Button variant="contained" size="large" sx={{backgroundColor: "black"}}>Sign In</Button>
            </Grid>
          </Grid>
        </Box>)
      ) }
    </Carousel>
  )
}

export default HomePage;