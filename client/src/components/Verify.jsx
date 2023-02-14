import React, { useState } from 'react';
import {
  Typography,
  Avatar,
  Box,
  TextField,
  Button
} from '@mui/material';
import {
  LockOutlinedIcon,
} from '@mui/icons-material';

export default function ({setVerified}) {
  const [confirmed, setConfirmed] = useState(false);
  const [input, setInput] = useState('');

  const handleClick = e => {
    e.preventDefault();

    // if (confirmed) {

    // } else {

    // }
  };

  return (
    <Box>
      {/* <Typography>Please confirm your phone number:</Typography> */}
      <TextField
        margin="normal"
        required
        fullWidth
        onChange={e => setInput(e.target.value)}
        id="input"
        label={confirmed ? "Verification Code" : "Phone Number"}
        name={confirmed ? "code" : "phone"}
        autoFocus
      />
      <Button
        color="secondary"
        variant="contained"
        fullWidth
        children={<Typography>Confirm</Typography>}
      />
    </Box>
  );
}