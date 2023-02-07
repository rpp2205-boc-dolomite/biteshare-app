import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {Button, ButtonGroup, Box, Typography, TextField, Modal, List, ListItem} from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
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

const CommentModal = ({open, handleClose, comments}) => {

  return (
    <Modal
    open={open}
    onClose={handleClose}
    >
      <Box sx={style}>
      {!comments.length ?
      <Typography>
        No Comments Yet
      </Typography> :
        <List
        sx={{
          height: "450px",
          overflow: "auto"
        }}
        >
        {comments.map((com, i) => {

          return (
            <ListItem
              key={i}
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
      }
      </Box>
    </Modal>
  )
}


export default CommentModal;