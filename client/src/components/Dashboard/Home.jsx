import React, { useState, useEffect } from 'react';
import {Button, Box, Typography, Stack, List, ListItem, ListItemButton} from '@mui/material';
import Navbar from './Navbar.jsx';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReactionsComment from './ReactionsComment.jsx';

export default function Home() {
  const [feed, setFeed] = useState([]);
  const user = JSON.parse(localStorage.getItem('phone'));

  useEffect(() => {
    axios.get(`/api/feed?user_id=${user.id}`)
    .then((results) => {
      setFeed([...results.data[0].friendSessions]);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  return(
    <Box>
      <Navbar></Navbar>
      <Box>
        {feed.length === 0 ? 'Empty, make some friends!' : feed.map((element, index) => {
          var hostId = element.host;
          var total = Object.keys(element.detail).length;
          return (
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
            <Link to="/meal" style={{ textDecoration: 'none' }} state={element} key={index}>
              <Box>
                  <Typography variant="subtitle1">
                      {element.detail[hostId].name} shared a meal with {total} others at {element.rest_name}
                  </Typography>

              </Box>
            </Link>
            <ReactionsComment />
            </Box>
          )
        })}
      </Box>

    </Box>
  )
}