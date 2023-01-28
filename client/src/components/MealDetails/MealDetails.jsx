import * as React from 'react';
import CustomSplit from './CustomSplit.jsx';
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
  Link,
  Input,
  InputLabel,
  Paper
} from '@mui/material';
import {
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';

const restName = "Red Robin";



const passedInData = {
  host: { user_id: '', name: "Ellen", phone_num: "" },
  friends: [{ name: "Clark W. Griswold", phone_num: "+12223334444" }, { name: "Cousin Eddie", phone_num: "+12123234343" }],
  resInfo: { name: "Red Robin", address: "" },

};
// const textFieldVariant = "outlined";

const setFriendData = function (index, change) {
  if (index === -1) {
    Object.assign(passedInData.host, change);
  } else {
    Object.assign(passedInData.friends[index], change);
  }
};


export default function MealDetails(props) {

  const [guests, setGuests] = React.useState(passedInData.friends.length + 1);
  const [splitMethod, setSplitMethod] = React.useState('even');
  const [mealTotal, setMealTotal] = React.useState(0);
  const [evenMealAmt, setEvenMealAmt] = React.useState(0);
  const [tipPercent, setTipPercent] = React.useState(0.2);

  const handleMealTotalChange = function (value) {
    // console.log('Value', value);
    setMealTotal(value);
    setEvenMealAmt(value / guests);
  };

  const handleTipPercentChange = function (value) {
    if (value !== "-1") {

      setTipPercent(Math.abs(value));
    }
  };

  const CustomInput = <OutlinedInput
    startAdornment={<InputAdornment position="start"><AttachMoneyIcon /></InputAdornment>}
    label="Bill Amount (excluding tip)"
    required
    fullWidth
  />

  return (<>
    <FormLabel>Restaurant:</FormLabel>
    <Typography>{restName}</Typography>
    {/*
    Total: (text input)
    Tip:
    Number of friends:
    Upload Receipt:
    Split Method: (Evenly) (Custom)
    */}

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
      {/* mealTotal: {mealTotal.toFixed(2)}
      evenMealAmt: {evenMealAmt.toFixed(2)} */}
    </Stack>

    <Divider>Split Method</Divider>

    <ToggleButtonGroup
      color="primary"
      size="small"
      value={splitMethod}
      exclusive
      onChange={() => splitMethod === 'even' ? setSplitMethod('custom') : setSplitMethod('even')}
      aria-label="Platform"
      sx={{alignSelf:'center'}}
    >
      <ToggleButton value="even">Evenly</ToggleButton>
      <ToggleButton value="custom">Custom</ToggleButton>
    </ToggleButtonGroup>

    <CustomSplit hidden={splitMethod === 'even'} {...{setFriendData, mealTotal, evenMealAmt, ...passedInData}} />

    {/* <Link to={{ pathname: "/review" }} state={this}>
      <Button>Save</Button>
    </Link> */}

  </>);
};