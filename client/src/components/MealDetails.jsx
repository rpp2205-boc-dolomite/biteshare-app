import * as React from 'react';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Typography,
  Switch,
  Radio,
  RadioGroup,
  Box,
  Button,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import {
  AttachMoney,
} from '@mui/icons-material';

const restName = "Red Robin";
// const textFieldVariant = "outlined";

export default function MealDetails(props) {




  return (
    <FormControl>
      <FormLabel>Restaurant:</FormLabel><Typography>{restName}</Typography>
      {/*
      Total: (text input)
      Tip:
      Number of friends:
      Upload Receipt:
      Split Method: (Evenly) (Custom)
      */}

      <OutlinedInput
        id="bill-amount-text-field"
        label="Bill Amount (excluding tip)"
        startAdornment={<InputAdornment position="start"><AttachMoney /></InputAdornment>}
        // placeholder="Enter the bill amount, excluding tip.."
        defaultValue="0.00"
        onChange={()=>{}}
        required
        fullWidth
      />

      <FormLabel id="choose-tip-group-label">Tip percentage:</FormLabel>
      <RadioGroup
        defaultValue="0.20"
        name="choose-tip-group"
        row={true}
        margin="none"
      >
        <FormControlLabel value="0.18" control={<Radio />} label="18%" />
        <FormControlLabel value="0.20" control={<Radio />} label="20%" />
        <FormControlLabel value="0.22" control={<Radio />} label="22%" />
        <FormControlLabel value="-1" control={<Radio />} label="Other" />
      </RadioGroup>

    </FormControl>
  );
};