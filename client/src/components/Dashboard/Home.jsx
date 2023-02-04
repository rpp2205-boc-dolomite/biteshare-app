import React, { useState, useEffect } from 'react';
import {Button, Box, Typography, Stack, List, ListItem, ListItemButton, Modal} from '@mui/material';
import Navbar from './Navbar.jsx';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Loading from '../Loading.jsx';
import ReactionsComment from './ReactionsComment.jsx';
import { format, parseISO } from 'date-fns';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 4,
};

export default function Home() {
  const [feed, setFeed] = useState([]);
  const [emptyFeed, handleEmptyFeed] = useState('');
  const [open, setOpen] = React.useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                      <b>{element.detail[hostId].name}</b> shared a meal with {total} others at <b>{element.rest_name}</b>
                  </Typography>
              </Box>
            </Link>
            <Button
                sx={{
                  fontSize: "0.75rem"
                }}
                onClick={handleOpen}
                >
                see what others are saying
              </Button>
            <Modal
              open={open}
              onClose={handleClose}
            >
              <Box sx={style}>
                <List
                  sx={{
                    height: "450px",
                    overflow: "auto"
                  }}
                >
                {element.comments.map((com, index) => {
                  return (
                    <ListItem
                      key={index}
                      align-items="center"
                      sx={{
                        borderBottom: 1
                      }}
                    >
                      <Typography variant="h6">
                        {com.text}
                        <Typography>
                          {format(parseISO(com.date), 'MMMM dd yyyy')}
                        </Typography>
                      </Typography>
                    </ListItem>
                  )
                })}
                </List>
              </Box>
            </Modal>
            <ReactionsComment data={element}/>
            </Box>
          )
        })}
      </Box>

  )
}