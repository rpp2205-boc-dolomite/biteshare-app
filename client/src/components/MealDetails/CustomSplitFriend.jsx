import React, { useState, useEffect } from 'react';
import {
  // Box,
  // Input,
  // InputLabel,
  TextField,
  Stack,
  InputAdornment,
  Typography
} from '@mui/material';
import {
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';

export default function CustomSplitFriend({ data, change, setChange }) {
  const errorExists = () => {
    return Number.isNaN(data.meal) || Number.isNaN(data.tip);
  };

  // const [ meal, setMeal ] = useState(data.meal);
  // const [ tip, setTip ] = useState(data.tip);
  const [ isError, setIsError ] = useState(false);

  const handleMealChange = e => {
    data.meal = Number(e.target.value.replace(/[^0-9.-]+/g,""));
    // setMeal(data.meal);
    setChange(!change);
  };
  const handleTipChange = e => {
    data.tip = Number(e.target.value.replace(/[^0-9.-]+/g,""));
    // setTip(data.tip);
    setChange(!change);
  };

  useEffect(() => {
    const error = errorExists();
    if (isError !== error) {
      setIsError(error);
    }
  });

  return (
    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 1 }}>
      <Typography width={200}>{data.name || 'unknown'}</Typography>
      <TextField
        label="Meal Amount"
        // startAdornment={<InputAdornment position="start">$</InputAdornment>}
        error={isError}
        value={data.mealStr || 0}
        onChange={handleMealChange}
        required
        width={200}
        size="small"
      />
      <TextField
        label="Tip Amount"
        // startAdornment={<InputAdornment position="start" component="div"><div><AttachMoneyIcon /></div></InputAdornment>}
        error={isError}
        defaultValue={data.tipStr || 0}
        onChange={handleTipChange}
        required
        width={200}
        size="small"
      />
    </Stack>
  );
};