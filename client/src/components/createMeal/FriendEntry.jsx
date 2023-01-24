import React, {useState} from 'react';
import {TextField, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction,Avatar, IconButton} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
const FriendEntry = ({friend, i}) => {

  return (
    <ListItem key={i}>
      <ListItemAvatar>
       <Avatar>
         <AccountBoxIcon />
       </Avatar>
      </ListItemAvatar>
      {!friend.name ? <TextField /> : <ListItemText primary={friend.name} />}
      {!friend.phone ? <TextField /> : <ListItemText primary={friend.phone} />}
      {!friend.name || !friend.phone && (
        <ListItemSecondaryAction>
         <IconButton aria-label="add">
           <AddIcon />
         </IconButton>
       </ListItemSecondaryAction>
      )}
      <ListItemSecondaryAction>
        <IconButton aria-label="delete">
        <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>


  )
}

export default FriendEntry;

