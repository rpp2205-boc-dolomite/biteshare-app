import React, {useState, useEffect} from 'react';
import {TextField,Avatar, IconButton, Typography, Box} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {deepPurple, deepOrange, blue} from '@mui/material/colors';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
const actionBox = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  fontWeight: 500,
  boxSizing: "border-box",
  color: "#eee",
  userSelect: 'none',
  backgroundColor:'#820009'
}
import 'react-swipeable-list/dist/styles.css';
const FriendEntry = ({friend, i, deleteOne, page}) => {
  const [progress, setProgress] = React.useState(0);
  const handleSwipeEnd = () => {
    setProgress()
    if (progress > 60) {
      console.log('[Handle DELETE]', i);
      deleteOne(i);
    }
  };

  let pageStyle = page === 'friends'? {
    margin:'1%',
    height:'60px',
    width:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'space-around',
    backgroundColor:'#f5f5f5',
    color: '#424242',
    border: '1px solid',
    borderColor:'#e0e0e0',
  } : {margin:'1%', width:'100%', display:'flex', alignItem:'center',justifyContent:'space-around' };
  const avatorColorPool =[deepOrange[500], blue[500], null, deepPurple[500]]
  const pickColor = (i) =>{
    if(i < 4) {
      return i;
    } else {
      return i - (Math.floor(i / 4) * 3) -1
    }
  }

  const trailingActions = () => (

   <TrailingActions>
      <SwipeAction destructive={true} onClick={()=>console.log("clicked")}>
        <div style={actionBox}>
        <Typography variant="button" sx={{color: 'white'}}>DELETE</Typography>
        <IconButton aria-label="delete" sx={{color:'white', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
          <DeleteIcon />
        </IconButton>
        </div>
      </SwipeAction>
    </TrailingActions>

  );

  return (

    <SwipeableListItem
      trailingActions={trailingActions(i)}
      onSwipeEnd={handleSwipeEnd}
      onSwipeProgress={setProgress}
    >
      <div style={pageStyle}>
        <div style={{display:'flex', width:'25%'}}>
          <Avatar sx={{bgcolor: avatorColorPool[pickColor(i)], mr:'5%'}} >
            {friend.name.slice(0,1).toUpperCase()}
          </Avatar>
         <Typography gutterBottom variant="h6" color="primary">{friend.name}</Typography>
        </div>
        <Typography mt={0.5} variant="body1" color='primary'>{friend.phone_num}</Typography>
        <Typography gutterBottom variant="overline" sx={{color: 'black', opacity: 0.1}}>Swipe to delete</Typography>
      </div>
    </SwipeableListItem>
  )}

export default FriendEntry;

