import React, { useState, useEffect } from 'react';
import CustomSplitFriend from './CustomSplitFriend.jsx';
import {
  Box,
  Stack,
  Typography,
  Divider
} from '@mui/material';
import {
  red,
  blue,
  green
 } from '@mui/material/colors';


const getSumTotals = data => {
  const totals = {
    meal: 0,
    tip: 0
  };

  for (const user of data) {
    totals.meal += user.meal;
    totals.tip += user.tip;
  }

  return totals;
};

const getDifferenceComp = diff => {
  const sx = {
    fontWeight: 'bold',
    width: 200,
    // justifyContent: "center",
    // textAligh: "center",
    // alighItems: "center",
  };
  let str;

  if (diff < -0.005) {
    sx.color = red[700];
    str = '🔴 (-$' + Math.abs(diff.toFixed(2)).toString() + ')';
  } else if (diff > 0.005) {
    sx.color = blue[700];
    str = '🔵 +$' + diff.toFixed(2).toString();
  } else if (Number.isNaN(diff)) {
    str = '🤪';
  } else {
    sx.color = green[700];
    str = '✅ $' + Math.abs(diff).toFixed(2).toString();
  }

  return <Typography alignItems="center" sx={sx}>{str}</Typography>
};

export default function CustomSplit({ hidden, data, mealTotal, tipTotal }) {
  if (hidden || !data) { return null; }

  const [ change, setChange ] = useState(false);

  const totals = getSumTotals(data);

  return (
    <Box hidden={hidden} spacing={2} justifyContent="right" sx={{width: "100%", my: 1}}>
      <Stack direction="column" justifyContent="right" sx={{width: "90%"}}>
        {data.map((guest, i) => <CustomSplitFriend data={guest} key={i} change={change} setChange={setChange} />)}
        <Stack direction="row" spacing={2} justifyContent="right">
          <Typography align="right" width={200}>{''}</Typography>
          <Divider sx={{my: 1}}></Divider>
          {getDifferenceComp(totals.meal - mealTotal)}
          {getDifferenceComp(totals.tip - tipTotal)}
        </Stack>
      </Stack>
    </Box>);
};