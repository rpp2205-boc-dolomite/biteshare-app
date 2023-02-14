import React, { useState } from 'react';
import {
  Typography,
  Avatar,
  Box,
  TextField,
  Button,
  Alert
} from '@mui/material';
import {
  LockOutlinedIcon,
} from '@mui/icons-material';
import parsePhoneNumber from 'libphonenumber-js';

const startTimer = (sec, cb) => {
  let count = sec;
  const callback = cb;
  const timer = () => {
    callback(count--);
  };
  if (count >= 0) {
    setTimeout(timer, 1000);
  }
};

export default function ({ setVerified }) {
  const [phoneNum, setPhoneNum] = useState(null);
  const [input, setInput] = useState('');

  const handleVerify = () => {

  }

  const handleSendCode = () => {
    const phone = parsePhoneNumber(input, 'US');
    if (phone) {
      setPhoneNum(phone.number);
      const alert = document.getElementById('vp-alert');
      const alertWrapper = document.getElementById('vp-alert-wrapper');
      alert.severity = "info";
      alert.innerHTML = "Thanks! Sending code now...";
      alertWrapper.hidden = false;
      setTimeout(() => alertWrapper.hidden = true, 8);

    }
  }

  const getButtonChildren = () => {
    if (phoneNum) {
      return <Typography>Verify</Typography>
    } else {
      return <Typography>Send Code</Typography>
    }
  };

  return (
    <Box
      sx={{
        mt: 2,
        mb: 1
      }}
    >
      <Box hidden id="vp-alert-wrapper"><Alert id="vp-alert" ></Alert></Box>
      {/* <Typography>Please confirm your phone number:</Typography> */}
      <TextField
        margin="normal"
        fullWidth
        onChange={e => setInput(e.target.value)}
        id="vp-input"
        label={phoneNum ? "Enter Code" : "Enter Your Phone Number"}
        name={phoneNum ? "code" : "phone"}
        autoFocus
      />
      <Button
        color={phoneNum ? "primary" : "secondary"}
        variant="contained"
        fullWidth
        children={getButtonChildren()}
        onClick={phoneNum ? handleVerify : handleSendCode}
      />
    </Box>
  );
}