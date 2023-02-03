import React, { useState, useEffect } from 'react';
import {Button, Box, Typography, Stack, List, ListItem, ListItemButton} from '@mui/material';
import Navbar from './Navbar.jsx';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Loading from '../Loading.jsx';

export default function Home() {
  const [feed, setFeed] = useState([]);
  const [emptyFeed, handleEmptyFeed] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get(`/api/feed?user_id=${user.id}`)
    .then((results) => {
      console.log(results);
      if(results.data[0].friendSessions.length === 0) {
        handleEmptyFeed('Empty, make some friends!');
      } else {
        setFeed([...results.data[0].friendSessions]);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  return(
    <Box>
      <Navbar></Navbar>
        {feed.length === 0 ? emptyFeed : feed.map((element, index) => {
          var hostId = element.host;
          var total = Object.keys(element.detail).length;
          return (
            <Link to="/meal" style={{ textDecoration: 'none' }} state={element} key={index}>
              <Box sx={{
                  width: 'auto',
                  p: 1,
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                  border: '1px solid',
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                  borderRadius: 2,
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  m: 1
                }}>
                  <Typography variant="subtitle1">
                      {element.detail[hostId].name} shared a meal with {total} others at {element.rest_name}
                  </Typography>
              </Box>
            </Link>
          )
        })}
    </Box>
  )
}