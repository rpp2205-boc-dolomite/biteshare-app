import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Dashboard/Navbar.jsx';
import {Button, Box, Typography, TextField, List, ListItem, ListItemButton, Slider} from '@mui/material';
import { Navigate, Link } from 'react-router-dom';

const RestaurantSearch = ({inputs, setInputs}) => {
  const [local, setLocation] = useState('');
  const [radius, setRadius] = useState(3215);
  const [businesses, setBusinesses] = useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [restInfo, setRestInfo] = useState( {name: '', address: ''} );

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    let a = event.target.title;
    setRestInfo({
      name: event.target.id,
      address: event.target.title
    })
    //this is for the Step components
    setInputs({...inputs, restInfo: {
      name: event.target.id,
      address: event.target.title
    }})
    //-----end of step needed code-----

  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  }

  const handleRadius = (e) => {
    setRadius(e.target.value);
  }

  const searchLocal = (local, radius) => {
    axios.get(`/api/biz?location=${local}&radius=${radius}`)
      .then ((results) => {
        setBusinesses(results.data);
      })
      .catch ((err) => {
        console.log(err);
      })
  }

  const marks = [
    {
      value: 3215,
      label: '2 Miles',
    },
    {
      value: 8047,
      label: '5 Miles',
    },
    {
      value: 16093,
      label: '10 Miles',
    },
    {
      value: 24140,
      label: '15 Miles',
    },
    {
      value: 32187,
      label: '20 Miles'
    }
  ];


  return (
    <Box>
    {/* <Navbar /> */}
      <Box
        flex-direction="column"
        alignItems="center"
        justifyContent="center"
        padding="20px"
      >
      <TextField fullWidth label="Type in your location" onChange={handleLocation} />
      <Typography padding="20px">
        <Slider
          aria-label="Restricted values"
          defaultValue={3215}
          step={null}
          max={32187}
          marks={marks}
          onChange={handleRadius}
          padding="10px"
        />
      </Typography>
      <Typography align="center" padding="10px">
        <Button onClick={() => {searchLocal(local, radius)}} variant="contained">Show restaurants near me!</Button>
      </Typography>
      {/*  if we use Steper we don't need the continue button */}
      {/* <Typography align="center">
        <Button
          disabled={!restInfo.name}
          component={Link}
          to="/AddFriends"
          state={{ restInfo }}
          variant="contained"
        >Continue</Button>
    </Typography> */}
      <List
        sx={{
          height: "450px",
          overflow: "auto"
        }}
      >
      {businesses.map((bus, index) => {
        return (
          <ListItem key={index} align-items="center">
            <ListItemButton
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <Typography
                variant="h6"
                id={bus.name}
                title={bus.location.display_address}
              >
              {bus.name} {bus.location.display_address[0]} {bus.location.display_address[1]}
              </Typography>
            </ListItemButton>
          </ListItem>
        )
      })}
      </List>
    </Box>

  </Box>
  )
}


export default RestaurantSearch;