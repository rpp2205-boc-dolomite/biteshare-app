import * as React from 'react';
import CustomSplit from './CustomSplit.jsx';
import ReceiptUpload from './ReceiptUpload.jsx';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Typography,
  Switch,
  Radio,
  RadioGroup,
  Box,
  Grid,
  Divider,
  Chip,
  Button,
  OutlinedInput,
  InputAdornment,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Input,
  InputLabel,
  TextField,
  Paper
} from '@mui/material';
import {
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';
import { Link, useLocation, Navigate } from 'react-router-dom';
import getHostData from '../../helpers/getHostData';


export default function MealDetails(props) {
  const [host, setHost] = React.useState();
  if (!host) { getHostData(setHost) }
  const { state } = useLocation();
  console.log('MealDetail', state, host);

  if (!state || !state.friends || !state.restInfo) { console.warn('MealDetails is missing some data') }
  const [guests, setGuests] = React.useState(state.friends.length + 1);
  const [splitMethod, setSplitMethod] = React.useState('even');
  const [mealTotal, setMealTotal] = React.useState(0);
  const [evenMealAmt, setEvenMealAmt] = React.useState(0);
  const [tipPercent, setTipPercent] = React.useState(0.2);
  const [receipt, setReceipt] = React.useState('');
  const [hostMealAndTip, setHostMealAndTip] = React.useState(['0.00', '0.00']);
  const [session, setSession] = React.useState({});
  const [redirect, setRedirect] = React.useState(false);

  const handleMealTotalChange = function (value) {
    setMealTotal(value);
    setEvenMealAmt(value / guests);
  };

  const setFriendData = function (index, change) {
    if (index === -1) {
      Object.assign(state.host, change);
    } else {
      Object.assign(state.friends[index], change);
    }
  };

  const handleTipPercentChange = function (value) {
    if (value !== "-1") {
      setTipPercent(Math.abs(value));
    }
  };

  const handleSubmit = function () {
    const session = createAndValidateSession();

    if (session) {
      console.log('Session is valid! Navigating to review page');
      console.log('SESSION', session);
      setRedirect(true);
    } else {
      // Don't submit
      console.log('could not validate session');
    }
  };

  const createAndValidateSession = function () {
    const newSession = {
      host: {
        ...state.host,
        meal_amount: hostMealAndTip[0],
        tip_amount: hostMealAndTip[1],
      },
      friends: state.friends,
      rest_name: state.restInfo.name,
      sub_total: mealTotal,
      tip_total: mealTotal * tipPercent,
      receipt: receipt,
      active: true,
    };

    setSession(newSession);

    const anyNulls = Object.keys(newSession).reduce((accumulator, currentValue) => { if (!currentValue || !accumulator) { return false } }, true);

    return anyNulls ? false : newSession;
  };

  if (redirect) {
    return <Navigate to="/review" state={session} />
  }

  return (<>
    <Stack direction="column" sx={{ m: 0.5, px: 0.5 }}>
      <Box sx={{ py: 0.5 }}>
        <FormLabel>Restaurant: </FormLabel>
        <Chip color="primary" variant="outlined" label={state && state.restInfo && state.restInfo.name} sx={{ fontWeight: 'bold' }} />
      </Box>
      <Box sx={{ py: 0.5 }}>
        <FormLabel>People in your party: </FormLabel>
        <Chip color="primary" variant="outlined" label={guests} sx={{ fontWeight: 'bold' }} />
      </Box>
    </Stack>

    <Divider sx={{my: 2}}></Divider>

    <Box sx={{ m: 0.5, p: 0.5, border: 1, borderColor: 'primary.main', borderStyle: 'dashed', borderRadius: 2 }}>
      <Box sx={{ p: 2 }}>
        <TextField
          id="bill-amount-text-field"
          label="Bill Amount (excluding tip)"
          startAdornment={<InputAdornment position="start"><AttachMoneyIcon /></InputAdornment>}
          error={Number.isNaN(evenMealAmt)}
          placeholder="Enter the bill amount before tip..."
          // defaultValue={""}
          onChange={e => handleMealTotalChange(Math.abs(e.target.value))}
          required
          fullWidth
          size="small"
        />
      </Box>

      <Box sx={{ p: 1 }}>
        <FormLabel id="choose-tip-group-label">Tip percentage: {(Math.abs(tipPercent * 100)).toFixed(1)}%</FormLabel>
        <RadioGroup
          defaultValue="0.20"
          name="choose-tip-group"
          row
          margin="none"
          onChange={e => handleTipPercentChange(e.target.value)}
        >
          <FormControlLabel value="0.18" control={<Radio />} label="18%" />
          <FormControlLabel value="0.20" control={<Radio />} label="20%" />
          <FormControlLabel value="0.22" control={<Radio />} label="22%" />
          <FormControlLabel value="-1" control={<Radio />} label="Other" />
        </RadioGroup>
      </Box>
    </Box>


    <Divider textAlign="left" sx={{my: 1}}>Receipt upload</Divider>
    <Stack direction="column" sx={{justifyContent:'center', alignItems:'center'}}>
      <ReceiptUpload setReceipt={setReceipt} />
      <Box
        sx={{
          height: '100px',
          width: '100px',
          hidden: false,
          border: 1,
          borderStyle: 'dashed',
          borderRadius: 2,
          borderColor: 'blue',
          backgroundColor: 'lightgrey'
        }}
      ><img crossOrigin="anonymous" src={receipt} style={{ maxWidth: "100%", maxHeight: "100%" }} /></Box>
    </Stack>

    <Divider textAlign="left" sx={{my: 1}}>Split Method</Divider>
    <Stack direction="column" sx={{justifyContent:'center', alignItems:'center'}}>
      <ToggleButtonGroup
        color="primary"
        size="small"
        value={splitMethod}
        exclusive
        onChange={() => splitMethod === 'even' ? setSplitMethod('custom') : setSplitMethod('even')}
        aria-label="Platform"
        sx={{ alignSelf: 'center' }}
      >
        <ToggleButton value="even">Evenly</ToggleButton>
        <ToggleButton value="custom">Custom</ToggleButton>
      </ToggleButtonGroup>
    </Stack>

    <CustomSplit hidden={splitMethod === 'even'} {...{ setFriendData, mealTotal, evenMealAmt, ...state }} />

    <Divider textAlign="left" sx={{my: 1}}>Finish</Divider>
    <Stack sx={{alignItems:'center'}}>
      <Button variant="outlined" onClick={handleSubmit}>Save and Review</Button>
    </Stack>


  </>);
};