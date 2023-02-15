import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
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
      token: '',
      complete: false,
      delay: 3
    }

    this.setVerifiedPhoneNum = this.setVerifiedPhoneNum.bind(this);
    this.setToken = this.setToken.bind(this);
    this.doCountdown = this.doCountdown.bind(this);
  }

  setVerifiedPhoneNum(phoneNum) {
    this.setState({ verifiedPhoneNum: phoneNum });
  }

  setToken(token) {
    this.setState({ token });
  }

  getStep() {
    if (!this.state.delay && this.state.complete) {
      return <Navigate to='/home' replace={true}/>
      // return redirect('/meals');
    } else if (this.state.complete) {
      this.doCountdown();
      return <>
        <Typography variant="h5" color="green" sx={{ mt: 3 }}>✅</Typography>
        <Typography variant="h5" color="green" sx={{ mt: 0, mb: 2 }}>Password has been changed!</Typography>
        <Typography variant="h5" color="green" sx={{ my: 1 }}>Redirecting in ... {this.state.delay}</Typography>
      </>
    }

    return this.state.token ?
      <NewPassword token={this.state.token} done={() => this.setState({ complete: true })} />
      :
      <VerifyPhone setToken={this.setToken} setVerifiedPhoneNum={this.setVerifiedPhoneNum} />
  }

  doCountdown() {
    const intervalId = setInterval(() => {
      if (this.state.delay > 0) {
        this.setState({ delay: this.state.delay - 1 });
      } else {
        clearTimeout(intervalId);
      }
    }, 1000);
  }



  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.complete) {

  //   }
  // }

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
          this.getStep()
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