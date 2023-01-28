import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar.jsx';
import {Button, Box, Typography, TextField, List, ListItem, ListItemButton, Divider} from '@mui/material';

const RestaurantSearch = ({}) => {
  const [local, setLocation] = useState('');
  const [restName, setRestName] = useState('');
  const [restAddress, setRestAddress] = useState('')
  const [businesses, setBusinesses] = useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    console.log(event.target.outerText);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
    console.log(local);
  }

  const handleRestName = (e) => {
    setRestName(e.target.value);
  }

  // const handleRestAddress = (e) => {
  //   setRestAddress(e);
  // }

  const searchLocal = (local) => {
    axios.get(`/biz?location=${local}`)
      .then ((results) => {
        setBusinesses(results.data);
        console.log(results.data)
      })
      .catch ((err) => {
        console.log(err);
      })
  }


  return (
    <Box>
    <Navbar />
      <Box
      flex-direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <TextField fullWidth label="Type in your location" onChange={handleLocation} />
      <Button onClick={() => {searchLocal(local)}}>Show me restaurants near me!</Button>
      <List>
      {businesses.map((bus, index) => {
      return (
        <ListItem key={index}>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >

          <Typography variant="h6"></Typography>
          <Typography variant="h6">
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