import React, { useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Avatar,
  Box,
  TextField,
  Button,
  Alert,
  Collapse
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
  const [alertHidden, setAlertHidden] = useState(true);
  const [timerId, setTimerId] = useState(null);

  const doAlert = (text, severity, sec) => {
    const alertElem = document.getElementById('vp-alert');
    alertElem.severity = severity;
    alertElem.innerHTML = text;

    setAlertHidden(false);

    if (timerId) {
      clearTimeout(timerId);
    }
    if (sec) {
      setTimerId(setTimeout(() => setAlertHidden(true), sec * 1000));
    } else {
      setTimerId(null);
    }
  };

  const handleVerify = () => {
    axios.put('/api/verify', {phone_num: phoneNum, code: input});
      .then(response => {
        switch (response.status) {
          case 201:
            doAlert('Verification Succeeded!', 'success', 8);
            setTimeout(() => setVerified(true), 2000);
            break;

          case 406:
            break;
        }
      })
  }

  const handleSendCode = () => {
    const phone = parsePhoneNumber(input, 'US');
    if (phone) {
      setPhoneNum(phone.number);
      const inputElem = document.getElementById('vp-input');
      inputElem.value = '';
      doAlert("Sending code to: " + phone.formatNational(), 'info', 8);
      axios.post('/api/verify', {phone_num: phone.number})
        .then(response => {
          if (response.status === 201) {
            startTimer(60, sec => {
              if (sec <= 10) {
                console.log('SECONDS', sec);
                inputElem.helperText = `${sec} second(s) remaining...`;
              }
              if (sec === 0) {
                inputElem.helperText = '';
              }
            });
          } else {
            doAlert("There was an error! Please try again..", 'error', 8);
          }
          inputElem.focus();
        });
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
      <Box component="span" display="inline" id="vp-alert-wrapper">
        <Collapse in={!alertHidden} orientation="vertical"><Alert message={{display: 'inline'}} sx={{display: "inline"}} display="inline" id="vp-alert" /></Collapse>
      </Box>
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