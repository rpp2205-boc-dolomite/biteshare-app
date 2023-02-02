import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  InputLabel,
  TextField,
  Stack,
  InputAdornment,
  Typography
} from '@mui/material';
import {
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';

export default function CustomSplitFriend({ data }) {
  console.log('CSF', data)
  const errorExists = () => {
    return Number.isNaN(data.mealAmount) || Number.isNaN(data.tipAmount);
  };

  const [ isError, setIsError ] = useState(false);

  useEffect(() => {
    setIsError(errorExists());
  });

  return (
    <Stack direction="row" spacing={2}>
      <Typography>{name || 'unknown'}</Typography>
      <TextField
        label="Meal Amount"
        startAdornment={<InputAdornment position="start" component="div"><div><AttachMoneyIcon /></div></InputAdornment>}
        error={isError}
        defaultValue={data.mealAmount}
        onChange={e => data.setMeal(e.target.value)}
        required
        width={200}
        size="small"
      />
      <TextField
        label="Tip Amount"
        startAdornment={<InputAdornment position="start" component="div"><div><AttachMoneyIcon /></div></InputAdornment>}
        error={isError}
        defaultValue={data.tipAmount}
        onChange={e => data.setTip(e.target.value)}
        required
        width={200}
        size="small"
      />
    </Stack>
  );
};