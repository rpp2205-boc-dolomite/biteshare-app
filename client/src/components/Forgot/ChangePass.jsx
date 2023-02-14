import React, { Component } from 'react';
import {
  Typography,
  Avatar,
  Box,
  Stepper
} from '@mui/material';
import {
  LockResetOutlined as LockResetOutlinedIcon
} from '@mui/icons-material';
import VerifyPhone from './VerifyPhone.jsx';

class ChangePass extends Component {
  state = {
    verified: false
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (<>
      <Typography align='center' sx={{ height: '10%', m: 1, p: 0 }}>
        <img src="../images/BOC-logo.png" alt="BiteShare Logo" width="175" />
      </Typography>
      <hr />

      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }} >
          <LockResetOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <VerifyPhone />
      </Box>
      {/* <Box
        sx={{
          width: "90%",
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
      </Box> */}
    </>);
  };
};

export default ChangePass;