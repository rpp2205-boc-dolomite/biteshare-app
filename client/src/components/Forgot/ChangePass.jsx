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
import NewPassword from './NewPassword.jsx';

class ChangePass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verifiedPhoneNum: '',
      token: ''
    }

    this.setVerifiedPhoneNum = this.setVerifiedPhoneNum.bind(this);
    this.setToken = this.setToken.bind(this);
  }

  setVerifiedPhoneNum(phoneNum) {
    this.setState({ verifiedPhoneNum: phoneNum });
  }

  setToken(token) {
    this.setState({ token });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.token && this.state.tokem) {

    }
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
        {
          this.state.token ?
            <NewPassword token={this.state.token} />
            :
            <VerifyPhone setToken={this.setToken} setVerifiedPhoneNum={this.setVerifiedPhoneNum} />
        }
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