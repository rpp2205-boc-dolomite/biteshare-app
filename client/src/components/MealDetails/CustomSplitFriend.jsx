import * as React from 'react';
import {
  Box,
  Input,
  InputLabel,
  Stack,
  InputAdornment,
  Typography
} from '@mui/material';

export default function CustomSplitFriend({ name, meal, tip, setMeal, setTip }) {



  return (
    <Box fullWidth sx={{ p: 1, border: '1px dashed grey' }}>
      <Stack direction="row">
        <Typography>{name}</Typography>
        <InputLabel>Amount</InputLabel>
        <Input
          id="standard-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          onChange={e => console.log('CHANGED!', e.target.value)}
        />
        <InputLabel>Amount</InputLabel>
        <Input
          id="standard-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </Stack>
    </Box>
  );
};