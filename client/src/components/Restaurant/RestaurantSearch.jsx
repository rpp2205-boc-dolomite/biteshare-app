import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar.jsx';
import {Button, Box, Typography, TextField, List, ListItem, ListItemButton} from '@mui/material';

const RestaurantSearch = ({}) => {
  const [local, setLocation] = useState('');
  const [restName, setRestName] = useState('');
  const [restAddress, setRestAddress] = useState('')
  const [businesses, setBusinesses] = useState([]);

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
    axios.get('/biz', {location: local})
      .then ((results) => {
        console.log(results)
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
      <TextField fullWidth label="Type in your location" onChange={handleLocation} value={local} />
      <Button onClick={searchLocal}>Show me restaurants near me!</Button>
    </Box>
  </Box>
  )
}



export default RestaurantSearch;