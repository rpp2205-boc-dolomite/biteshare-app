import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar.jsx';
import {Button, Box, Typography, TextField, List, ListItem, ListItemButton, Divider} from '@mui/material';
import { Navigate, Link } from 'react-router-dom';

const RestaurantSearch = ({}) => {
  const [local, setLocation] = useState('');
  // const [restName, setRestName] = useState('');
  // const [restAddress, setRestAddress] = useState('')
  const [businesses, setBusinesses] = useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [restInfo, setRestInfo] = useState( {name: '', address: ''} );

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    let bus = (event.target.outerText);
    const numIndex = bus.search(/\d/);
    setRestInfo({
      name: bus.substr(0, numIndex - 1),
      address: bus.substr(numIndex)
    });
    console.log(restInfo);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  }

  const searchLocal = (local) => {
    axios.get(`/biz?location=${local}`)
      .then ((results) => {
        setBusinesses(results.data);
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
      padding="50px"
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
    <Box
      justifyContent="centered"
    >

      <Button
        disabled={!restInfo.name}
        component={Link}
        to="/AddFriends"
        state={{ restInfo }}
        variant="contained"
      >Continue</Button>
    </Box>
  </Box>
  )
}


export default RestaurantSearch;