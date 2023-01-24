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
    <ListItem
      key={i}
      secondaryAction={
        <IconButton aria-label="delete" onClick={(e) => deleteFriend(e)}>
          <DeleteIcon />
        </IconButton>
      }>
      <ListItemAvatar>
       <Avatar>
         <AccountBoxIcon />
       </Avatar>
      </ListItemAvatar>
      <ListItemText primary={friend.name} />
      <ListItemText primary={friend.phone} />
    </ListItem>


  )
}

export default FriendEntry;

