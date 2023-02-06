import React, { useState, useEffect } from 'react';
import newId from '../../helpers/newId.js';
import delay from '../../helpers/delay.js';
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

  const [ mealId, setMealId ] = useState(newId());
  const [ tipId, setTipId ] = useState(newId());
  const [ isError, setIsError ] = useState(false);

  const handleMealChange = e => {
    data.meal = e.target.value;
    document.getElementById(mealId).value = data.mealStr;
    setChange(!change);
  };
  const handleTipChange = e => {
    data.tip = e.target.value;
    document.getElementById(tipId).value = data.tipStr;
    setChange(!change);
  };
  const delayedHandleMealChange = delay(handleMealChange, 900);
  const delayedHandleTipChange = delay(handleTipChange, 900);

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
        id={mealId}
        // startAdornment={<InputAdornment position="start">$</InputAdornment>}
        error={isError}
        defaultValue={data.mealStr || 0}
        onChange={delayedHandleMealChange}
        width={200}
        size="small"
      />
      <TextField
        label="Tip Amount"
        id={tipId}
        // startAdornment={<InputAdornment position="start" component="div"><div><AttachMoneyIcon /></div></InputAdornment>}
        error={isError}
        defaultValue={data.tipStr || 0}
        onChange={delayedHandleTipChange}
        width={200}
        size="small"
      />
    </Stack>
  );
};