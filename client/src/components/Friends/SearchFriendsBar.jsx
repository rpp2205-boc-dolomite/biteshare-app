import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';

export default function SearchFriendsBar({input, setInput, clicked}) {

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search by Phone Number"
        onChange={(e) => setInput(e.target.value)}
        inputProps={{ 'aria-label': 'search by phone number' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={(e) => clicked(e)}>
        <SearchIcon />
      </IconButton>

    </Paper>
  );
}
