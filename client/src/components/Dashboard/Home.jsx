import React, { useState, useEffect } from 'react';
import {Button, Box, Typography, Stack, List, ListItem, ListItemButton, Modal} from '@mui/material';
import Navbar from './Navbar.jsx';
import axios from 'axios';
import { Link, useLocation, useOutletContext } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Loading from '../Loading.jsx';
import ReactionsComment from './ReactionsComment.jsx';
import { format, parseISO } from 'date-fns';
import CommentModal from './CommentModal.jsx';

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
  const { user } = useOutletContext();
  const [ needsUpdate, setNeedsUpdate ] = React.useState(true);
  const [current, setCurrent] = useState(null)

  const handleOpen = (e, element, index) => {

    setOpen(true);
  }
  const handleClose = () => {
    setCurrent(null);
    setOpen(false);
  };
  useEffect(() => {
   if (current) {
    setOpen(true);
   }
  },[current])

  useEffect(() => {
    if (needsUpdate) {
      axios.get(`/api/feed?user_id=${user.user_id}`)
      .then((results) => {
        if(results.data[0].friendSessions.length === 0) {
          handleEmptyFeed('Empty, make some friends!');
        } else {
          setNeedsUpdate(false);
          setFeed([...results.data[0].friendSessions]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  });

  return(
    <Box>
      <Navbar></Navbar>
      {open && <CommentModal open={open} comments={current} handleClose={handleClose}/>}
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
            }}
            key={index}>
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
                onClick={() => {setCurrent(element.comments);}}
                >
                see what others are saying ({element.comments.length})
              </Button>
            <ReactionsComment setNeedsUpdate={setNeedsUpdate} data={element}/>
            </Box>
          )
        })}
      </Box>

  )
}