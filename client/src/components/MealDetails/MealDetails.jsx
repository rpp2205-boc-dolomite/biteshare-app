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
  Paper
} from '@mui/material';
import {
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';

import { Link, useLocation, Navigate } from 'react-router-dom';

// const restName = "Red Robin";

// const state = {
//   host: { user_id: '', name: "Ellen", phone_num: "" },
//   friends: [{ name: "Clark W. Griswold", phone_num: "+12223334444" }, { name: "Cousin Eddie", phone_num: "+12123234343" }],
//   restInfo: { name: "Red Robin", address: "" },
// };

const setFriendData = function (index, change) {
  if (index === -1) {
    Object.assign(state.host, change);
  } else {
    Object.assign(state.friends[index], change);
  }
};

export default function MealDetails(props) {
  const { state } = useLocation();

  if (!state.friends || !state.host || !state.restInfo) { console.warn('MealDetails is missing some data')}
  const [guests, setGuests] = React.useState(state.friends.length + 1);
  const [splitMethod, setSplitMethod] = React.useState('even');
  const [mealTotal, setMealTotal] = React.useState(0);
  const [evenMealAmt, setEvenMealAmt] = React.useState(0);
  const [tipPercent, setTipPercent] = React.useState(0.2);
  const [receipt, setReceipt] = React.useState('');
  const [hostMealAndTip, setHostMealAndTip] = React.useState(['0.00', '0.00']);
  const [session, setSession] = React.useState({});
  const [redirect, setRedirect] = React.useState(false);

  console.log('mealdetail', state);
  const handleMealTotalChange = function (value) {
    setMealTotal(value);
    setEvenMealAmt(value / guests);
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
    <FormLabel>Restaurant:</FormLabel>
    <Typography>{state && state.restInfo && state.restInfo.name}</Typography>

    <OutlinedInput
      id="bill-amount-text-field"
      startAdornment={<InputAdornment position="start"><AttachMoneyIcon /></InputAdornment>}
      error={Number.isNaN(evenMealAmt)}
      label="Bill Amount (excluding tip)"
      // placeholder="Enter the bill amount, excluding tip.."
      defaultValue={evenMealAmt || "0.00"}
      onChange={e => handleMealTotalChange(Math.abs(e.target.value))}
      required
      fullWidth
      size="small"
    />

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

    <Stack direction="row" gap={1}>
      <FormLabel>People in your party:</FormLabel>
      <Chip label={guests} />
    </Stack>

    <Divider>Receipt upload</Divider>
    <ReceiptUpload setReceipt={setReceipt} />
    {console.log('RECEIPT', receipt)}
    <Box
      sx={{
        height: '120px',
        width: '120px',
        hidden: false,
        border: "1px dashed"
      }}
    ><img crossOrigin="anonymous" src={receipt} style={{maxWidth: "100%", maxHeight: "100%"}} /></Box>

    <Divider>Split Method</Divider>
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

    <CustomSplit hidden={splitMethod === 'even'} {...{ setFriendData, mealTotal, evenMealAmt, ...state }} />

    <Button
      onClick={handleSubmit}
    >Save and Review</Button>


  </>);
};