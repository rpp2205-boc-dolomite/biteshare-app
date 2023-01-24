import React, {useState} from 'react';
import {TextField, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction,Avatar, IconButton} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
const FriendEntry = ({friend, i, deleteOne}) => {

   const deleteFriend = (e) => {
    e.preventDefault();
    deleteOne(i);
   }
  return (
    <ListItem key={i}>
      <ListItemAvatar>
       <Avatar>
         <AccountBoxIcon />
       </Avatar>
      </ListItemAvatar>
      <ListItemText key={i + 1} primary={friend.name} />
      <ListItemText key={i + 2} primary={friend.phone} />


      <ListItemSecondaryAction>
        <IconButton aria-label="delete" onClick={(e) => deleteFriend(e)}>
         <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>


  )
}

export default FriendEntry;

