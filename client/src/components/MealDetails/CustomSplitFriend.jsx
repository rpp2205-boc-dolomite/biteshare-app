import * as React from 'react';
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

export default function CustomSplitFriend({ name, meal, tip, setMeal, setTip }) {

  const error = React.useState()

  return (
    <Stack direction="row" spacing={2}>
      <Typography>{name || 'unknown'}</Typography>
      <TextField
        label="Bill Amount"
        startAdornment={<InputAdornment position="start" component="div"><div><AttachMoneyIcon /></div></InputAdornment>}
        error={e => Number.isNaN(Number(meal))}
        defaultValue={meal}
        onChange={e => setMeal(e.target.value)}
        required
        width={200}
        size="small"
      />
      <TextField
        label="Tip Amount"
        startAdornment={<InputAdornment position="start" component="div"><div><AttachMoneyIcon /></div></InputAdornment>}
        error={e => Number.isNaN(Number(tip))}
        defaultValue={tip}
        onChange={e => setTip(e.target.value)}
        required
        width={200}
        size="small"
      />
    </Stack>
  );
};