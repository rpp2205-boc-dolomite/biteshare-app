import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {Button, ButtonGroup, Box, Typography, TextField, Modal} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 4,
};

const ReactionsComment = ({}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [reaction, setReaction] = useState('');
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = useState('');

  const CHARACTER_LIMIT = 120;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setReaction(event.target.id)
    console.log(reaction);
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  }

  const commentPost = (comment) => {
    console.log(comment);
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
                onClick={handleOpen}
                >
                <ChatBubbleOutlineIcon />
              </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Add a comment
                    </Typography>
                    <Box>
                      <TextField
                        multiline
                        required
                        rows={4}
                        label="Add your comment!"
                        onChange={handleComment}
                        inputProps={{maxLength: CHARACTER_LIMIT}}
                        helperText={`${comment.length}/${CHARACTER_LIMIT}`}
                      />
                      <Button onClick={commentPost(comment), handleClose}>Post!</Button>
                    </Box>
                  </Box>
                </Modal>
          </ButtonGroup>
        </ThemeProvider>

    </Box>
  )
}


export default ReactionsComment;