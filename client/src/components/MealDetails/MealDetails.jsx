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
import getCurrencyString from '../../helpers/formatCurrency.js';
// import userObj from './userObject.js';

export default function MealDetails(props) {
  const [host, setHost] = React.useState();
  if (!host) { getHostData(setHost) }
  // const { state } = useLocation();
  // console.log('MealDetail', state, host);
  console.log('props in meals: ', props.inputs);
  const state = props.inputs;

  // if (!state || !state.friends || !state.restInfo) { console.warn('MealDetails is missing some data') }
  // else { // build data for CustomSplit }
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

  const handleSplitMethodChange = function () {
    if (splitMethod === 'even' && mealTotal && evenMealAmt) {
      const evenTipAmount = (mealTotal * tipPercent) / guests;
      setHost({
        ...host,
        meal_amount: evenMealAmt,
        tip_amount: evenTipAmount
      });

      state.friends.map(item => Object.assign(item, {
        meal_amount: evenMealAmt,
        tip_amount: evenTipAmount
      }));
    }

    setSplitMethod(splitMethod === 'even' ? 'custom' : 'even');
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

  // if (redirect) {
  //   return <Navigate to="/review" state={session} />
  // }

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

    {/* <Divider sx={{my: 2}} /> */}

    <Stack sx={{ m: 0.5, p: 0.5, border: 1, borderColor: 'primary.main', borderStyle: 'dashed', borderRadius: 2, justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ p: 2 }}>
        <TextField
          id="bill-amount-text-field"
          label="Bill Amount"
          startAdornment={<InputAdornment position="start" component="div"><div><AttachMoneyIcon /></div></InputAdornment>}
          error={Number.isNaN(evenMealAmt)}
          placeholder="Not including tip..."
          // defaultValue={""}
          onChange={e => handleMealTotalChange(Math.abs(e.target.value))}
          required
          width={400}
          size="small"
        />
      </Box>
      <Divider width="60%" />
      <Stack sx={{ p: 1, justifyContent: 'center', alignItems: 'center' }}>
        <span>
          <span><FormLabel id="choose-tip-group-label">Tip percentage: </FormLabel>{`${(tipPercent * 100).toString()}% (${getCurrencyString(mealTotal * tipPercent)})`}</span>
          <RadioGroup
            defaultValue="0.20"
            name="choose-tip-group"
            size="small"
            row
            margin="none"
            padding={0}
            onChange={e => handleTipPercentChange(e.target.value)}
          >
            <FormControlLabel value="0.18" control={<Radio />} label="18%" />
            <FormControlLabel value="0.20" control={<Radio />} label="20%" />
            <FormControlLabel value="0.22" control={<Radio />} label="22%" />
            <FormControlLabel value="-1" control={<Radio />} label="Other:" />
            <TextField size="small" sx={{width:100}}></TextField>
          </RadioGroup>
        </span>
      </Stack>
    </Stack>


    {/* <Divider sx={{my: 2}} /> */}
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

    <Divider sx={{my: 2}} />
    <Stack direction="row" sx={{justifyContent:'center', alignItems:'center'}}>
      <FormLabel id="split-method-label" sx={{mr: 1}}>Split method: </FormLabel>
      <ToggleButtonGroup
        color="primary"
        size="small"
        value={splitMethod}
        exclusive
        onChange={handleSplitMethodChange}
        aria-label="Platform"
      >
        <ToggleButton value="even">Evenly</ToggleButton>
        <ToggleButton value="custom">Custom</ToggleButton>
      </ToggleButtonGroup>
    </Stack>

    <CustomSplit hidden={splitMethod === 'even'} {...{ setFriendData, mealTotal, evenMealAmt, host, tipPercent, ...state }} />

    <Divider sx={{my: 2}} />

    <Stack direction="row" justifyContent="center">
      <Stack direction="column" sx={{mr: 2}}>
        <span><FormLabel>Sub total: </FormLabel>{getCurrencyString(mealTotal)}</span>
        <span><FormLabel>Tip total: </FormLabel>{getCurrencyString(mealTotal * tipPercent)}</span>
        <span><FormLabel>Grand total: </FormLabel>{getCurrencyString(mealTotal * (1 + tipPercent))}</span>
      </Stack>
      <Divider orientation="vertical" sx={{height: 80}} />
      <Stack direction="column" sx={{ml: 2}}>
        <span><FormLabel>Meal due per person: </FormLabel>{getCurrencyString((mealTotal) / guests)}</span>
        <span><FormLabel>Tip due per person: </FormLabel>{getCurrencyString((mealTotal * tipPercent) / guests)}</span>
        <span><FormLabel>Total due per person: </FormLabel>{getCurrencyString((mealTotal * (1 + tipPercent)) / guests)}</span>
      </Stack>
    </Stack>



    <Divider sx={{my: 2}} />
    <Stack sx={{alignItems:'center'}}>
      <Button variant="outlined" onClick={handleSubmit}>Save and Review</Button>
    </Stack>


  </>);
};