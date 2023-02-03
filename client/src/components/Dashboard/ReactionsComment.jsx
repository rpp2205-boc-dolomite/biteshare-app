import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Button, ButtonGroup, Box, Typography, Stack, List, ListItem, ListItemButton, Paper} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#000000',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

const ReactionsComment = ({}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [reaction, setReaction] = useState('');

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setReaction(event.target.id)
    console.log(reaction);
  };

  const handleComment = (e) => {
    console.log('comment')
  }

  return (
      <Box
        sx={{
        display: 'flex',
        flexDirection: 'column',
        m: 1,
        }}
      >
        <ThemeProvider theme={theme}>


          <ButtonGroup variant="text" color="primary">
          <Button
            sx={{
              fontSize: "1.2rem"
            }}
            id='thumb'
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >👍</Button>
          <Button
            sx={{
              fontSize: "1.2rem"
            }}
            id='like'
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >❤️</Button>
          <Button
            sx={{
              fontSize: "1.2rem"
            }}
            id='fire'
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
            >🔥</Button>
          <Button
            sx={{
              fontSize: "1.2rem"
            }}
            id='tooth'
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
            >🦷</Button>
            <Button
              sx={{
                fontSize: "1.2rem"
              }}
              onClick={handleComment}
              >
              💬
            </Button>
          </ButtonGroup>
        </ThemeProvider>

    </Box>
  )
}


export default ReactionsComment;