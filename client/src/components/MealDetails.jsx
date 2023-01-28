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
} from '@mui/material';
import {
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';

const restName = "Red Robin";
const numParticipants = 6;
const passedInData = {
  friends: [{ name: "Clark W. Griswold", phone_num: "+12223334444" }, { name: "Cousin Eddie", phone_num: "+12123234343" }],
  resInfo: { name: "Red Robin", address: "" },

};
// const textFieldVariant = "outlined";


export default function MealDetails(props) {

  const [splitMethod, setSplitMethod] = React.useState('even');

  return (
    <FormControl fullWidth>
      <Stack direction="row" gap={1}>
        <FormLabel>Restaurant:</FormLabel>
        <Typography>{restName}</Typography>
      </Stack>
      <Divider></Divider>
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
        label="Bill Amount (excluding tip)"
        // placeholder="Enter the bill amount, excluding tip.."
        defaultValue="0.00"
        onChange={() => { }}
        required
        fullWidth
      />

      <FormLabel id="choose-tip-group-label">Tip percentage:</FormLabel>
      <RadioGroup
        defaultValue="0.20"
        name="choose-tip-group"
        row
        margin="none"
      >
        <FormControlLabel value="0.18" control={<Radio />} label="18%" />
        <FormControlLabel value="0.20" control={<Radio />} label="20%" />
        <FormControlLabel value="0.22" control={<Radio />} label="22%" />
        <FormControlLabel value="-1" control={<Radio />} label="Other" />
      </RadioGroup>

      <Stack direction="row" gap={1}>
        <FormLabel>People in your party:</FormLabel>
        <Chip label={numParticipants} />
      </Stack>

      <Divider>Split Method</Divider>

      <Box>
        <ToggleButtonGroup
          color="primary"
          size="small"
          value={splitMethod}
          exclusive
          onChange={() => splitMethod === 'even' ? setSplitMethod('custom') : setSplitMethod('even')}
          aria-label="Platform"
        >
          <ToggleButton value="even">Evenly</ToggleButton>
          <ToggleButton value="custom">Custom</ToggleButton>
        </ToggleButtonGroup>


        <Grid container spacing={1}>
          <Grid container item spacing={3}>
            <Grid item></Grid><Grid item><Typography variant="h6">Meal</Typography></Grid><Grid item><Typography variant="h6">Tip</Typography></Grid>
          </Grid>
          <Grid container item spacing={3}>
            <Grid item><FormLabel id="choose-tip-group-label">You</FormLabel></Grid><Grid item><InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
              <Input
                id="standard-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              /></Grid><Grid item></Grid>
          </Grid>
        </Grid>
      </Box>

      {/* <Link to={{ pathname: "/review" }} state={this}>
        <Button>Save</Button>
      </Link> */}
    </FormControl>

  );
};