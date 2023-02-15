import React, { useState } from 'react';
import {
  Typography,
  Avatar,
  Box,
  TextField,
  Button,
  Alert,
  Navigate
} from '@mui/material';
import {
  LockOutlinedIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { getSession, setSession } from '../../helpers/cookie.js';

export default function ({ token, done }) {
  const [input, setInput] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setBtnDisabled(true);

    const newPass = input;
    if (newPass.length < 8) {
      setHelperText("Password must be 8 characters!");
    } else {
      const session = getSession(token);
      if (session) {
        const headers = {
          'Authorization': 'Bearer ' + token
        };

        axios.put('/api/users', { password: newPass }, {
          headers: headers,
          params: {
            user_id: session.user_id
          }
        })
          .then(response => {
            setSession(token);
            done();
          })
          .catch(err => {
            console.log(err.toString());
          });
      }
    }
  };

  return <Box>
    <TextField
      margin="normal"
      fullWidth
      onChange={e => setInput(e.target.value)}
      id="np-input"
      label="Enter a New Password"
      helperText={helperText}
      name="password"
      autoFocus
    />
    <Button
      color="primary"
      variant="contained"
      fullWidth
      disabled={btnDisabled}
      children=<Typography>Change Password</Typography>
      onClick={handleSubmit}
    />
  </Box>
}