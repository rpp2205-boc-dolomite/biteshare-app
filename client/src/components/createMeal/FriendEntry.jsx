import React, {useState} from 'react';
import {TextField, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction,Avatar, IconButton} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {deepPurple, deepOrange, blue} from '@mui/material/colors';
const FriendEntry = ({friend, i, deleteOne, page}) => {
   const deleteFriend = (e) => {
    e.preventDefault();
    deleteOne(i);
   }
   let styleForPage = page === "friends" ? {margin:4} : null
   const avatorColorPool =[deepOrange[500], blue[500], deepPurple[500], null]
   const pickColor = () =>{
     let index = Math.floor(Math.random() * 5);
     return avatorColorPool[index];
   }
  return (
    <ListItem
      secondaryAction={
        <IconButton aria-label="delete" onClick={(e) => deleteFriend(e)}>
          <DeleteIcon />
        </IconButton>
      }
      sx={styleForPage}
      key={i}
      >
      <ListItemAvatar>
       <Avatar sx={{bgcolor: avatorColorPool[Math.floor(Math.random()*5)]}}>
         {friend.name.slice(0,1).toUpperCase()}
       </Avatar>
      </ListItemAvatar>
      <ListItemText sx={{fontWeight:600}} primary={friend.name} />
      <ListItemText primary={friend.phone_num} />
    </ListItem>


  )
}

export default FriendEntry;

