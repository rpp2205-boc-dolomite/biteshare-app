import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {Button, ButtonGroup, Box, Typography, Stack, List, ListItem, ListItemButton, Paper} from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontSize: 26,

}));

const ReactionsComment = ({}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [reaction, setReaction] = useState('');

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setReaction(event.target.id)
    console.log(reaction);
  };

  const handleThumb = (e) => {
    console.log(e.target.id);
  }

  const handleLike = (e) => {
    console.log("i super like this");
  }

  const handleFire = (e) => {
    console.log("fire yo");
  }

  const handleTooth = (e) => {
    console.log("tooths!");
  }


  return (
    <Box>
      <Box
        sx={{
        display: 'flex',
        flexDirection: 'column',
        m: 1,
        }}
      >
      <ButtonGroup variant="text">
      <Button
        sx={{
          fontSize: "2rem"
        }}
        id='thumb'
        selected={selectedIndex === 0}
        onClick={(event) => handleListItemClick(event, 0)}
      >👍</Button>
      <Button
        sx={{
          fontSize: "2rem"
        }}
        id='like'
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1)}
      >❤️</Button>
      <Button
        sx={{
          fontSize: "2rem"
        }}
        id='fire'
        selected={selectedIndex === 2}
        onClick={(event) => handleListItemClick(event, 2)}
        >🔥</Button>
      <Button
        sx={{
          fontSize: "2rem"
        }}
        id='tooth'
        selected={selectedIndex === 3}
        onClick={(event) => handleListItemClick(event, 3)}
        >🦷</Button>
      </ButtonGroup>
    </Box>

    </Box>
  )
}


export default ReactionsComment;