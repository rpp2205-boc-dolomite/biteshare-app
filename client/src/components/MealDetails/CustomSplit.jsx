import * as React from 'react';
import CustomSplitFriend from './CustomSplitFriend.jsx';
import {
  Box,
  Stack
} from '@mui/material';


export default function CustomSplit({ hidden, data }) {
  console.log(hidden, data);
  if (hidden || !data) { return null; }


  return (
    <Box hidden={hidden}>
      <Stack direction="column">
        {data.map((guest, i) => <CustomSplitFriend data={guest} key={i} />)}
      </Stack>
    </Box>);
};