import React, { Component } from 'react';
import CustomSplit from './CustomSplit.jsx';
import ReceiptUpload from './ReceiptUpload.jsx';
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
  Input,
  InputLabel,
  TextField,
  Paper
} from '@mui/material';
import {
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';
import { Link, Navigate } from 'react-router-dom';
import getHostData from '../../helpers/getHostData';
import getCurrencyString from '../../helpers/formatCurrency.js';
import userObj from './userObject.mjs';
import withRouter from '../withRouter.jsx';

class MealDetails extends Component {
  state = {
    host: {
      name: '',
      phone_num: '',
      meal_amount: 0,
      tip_amount: 0,
    },
    friends: [],
    restInfo: {
      name: '',
      address: ''
    },
    mealTotal: 0,
    tipPercent: 0.20,
    splitMethod: 'even',
    receipt: '',
    customSplitData: null,
    session: null,
    redirect: false,
    isInitialized: false
  }

  constructor(props) {
    super(props);
    this.handleSplitMethodChange = this.handleSplitMethodChange.bind(this);
    this.handleMealTotalChange = this.handleMealTotalChange.bind(this);
    this.handleTipPercentChange = this.handleTipPercentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildCustomSplitData = this.buildCustomSplitData.bind(this);
    this.validateSession = this.validateSession.bind(this);
    this.createSession = this.createSession.bind(this);

    Object.assign(this.state.host, props.host)
    Object.assign(this.state.friends, props.friends);
    Object.assign(this.state.restInfo, props.restInfo);
    console.log('MD CONSTRUCTOR', this.state);
  }

  //#region Statics 🗂️
  get numGuests() {
    return this.state.friends.length + 1;
  }

  get evenMealAmount() {
    return this.state.mealTotal / this.numGuests;
  }

  get evenTipAmount() {
    return this.tipTotal / this.numGuests;
  }

  get evenPerGuestTotal() {
    return this.evenMealAmt + this.evenTipAmount;
  }

  get formDataIsValid() {
    return (
      (this.state.mealTotal !== NaN && this.state.mealTotal > 0) &&
      (this.state.tipPercent !== NaN && this.state.tipPercent >= 0) &&
      (typeof this.state.receipt === 'string')
    );
  }

  get tipTotal() {
    return this.state.mealTotal * this.state.tipPercent;
  }

  get billTotal() {
    return this.state.mealTotal + this.tipTotal;
  }
  //#endregion

  handleMealTotalChange(value) {
    this.setState({ mealTotal: Math.abs(value) });
  }

  handleTipPercentChange(value) {
    this.setState({ tipPercent: Math.abs(value) });
  }

  handleSubmit() {
    const session = createAndValidateSession();

    if (session) {
      console.log('Session is valid! Navigating to review page');
      console.log('SESSION', session);
      setRedirect(true);
    } else {
      // Don't submit
      console.log('could not validate session');
    }
  }

  componentDidMount() {
    this.setState(state => {
      return {
        ...state,
        friends: this.props.router.location.state.friends,
        restInfo: this.props.router.location.state.restInfo
      }
    }, () => {
      console.log('STATE', this.state)
    });
    console.log('MD DID MOUNT', this.state, this.props);
    // const location = useLocation();
    getHostData((function (host) {
      this.setState({ host: { ...this.host, ...host } }, () => {
        console.log('HOST DATA STATE', this.state)
      });
    }).bind(this));
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (!isInitialized && this.state.host)
  // }

  handleSplitMethodChange(e) {
    e.preventDefault();
    if (this.state.splitMethod === 'even') {
      if (this.formDataIsValid()) {
        console.log('FORM DATA VALID!')
        this.buildCustomSplitData();
        this.setState({ splitMethod: 'custom' });
      } else {
        document.getElementById("split-method-toggle-group").value = 'even';
      }
    } else {
      this.setState({ splitMethod: 'even' })
    }
  }

  buildCustomSplitData() {
    const data = [];
    const evenMealAmount = this.evenMealAmount;
    const evenTipAmount = this.evenTipAmount;

    const makeGuestObj = (guest) => {
      return new userObj(guest.name, evenMealAmount, evenTipAmount);
    };

    data.push(makeGuestObj(this.state.host));

    for (const friend of this.state.friends) {
      data.push(makeGuestObj(friend));
    }

    this.setState({ customSplitData: data });
    return data;
  }

  validateSession() {
    const data = this.state.customSplitData || this.buildCustomSplitData();

    let mealSum = 0;
    let tipSum = 0;

    for (const guest of data) {
      if (Number.isNaN(guest.mealAmount) || Number.isNaN(guest.mealAmount))
        mealSum += guest.mealAmount;
      tipSum += guest.tipAmount;
    }

    console.log('VALIDATE SESSION', mealSum, this.state.mealTotal);
    return (
      mealSum.toFixed(2) === this.state.mealTotal.toFixed(2)
    );
  }

  createSession() {
    const data = this.state.customSplitData || this.buildCustomSplitData();
    const newSession = {
      host: {
        ...this.state.host,
        meal_amount: data[0].mealAmount,
        tip_amount: data[0].tipAmount,
      },
      rest_name: this.state.restInfo.name,
      sub_total: this.state.mealTotal,
      tip_total: this.tipTotal,
      receipt: this.state.receipt,
      active: true,
    };
    const friends = [];

    for (let i = 1; i < data.length; i++) {
      friends.push(data[i].getCopy());
    }

    newSession.friends = friends;

    this.setState({ session: newSession });

    return newSession;
  }


  render() {
    if (!this.state.isInitialized && this.state.host.phone_num && this.state.friends.length && this.state.restInfo.name) {
      this.setState({ isInitialized: true }, () => { console.log('INITIALIZED', this.state) });

      return null;
    }

    if (this.redirect) {
      return <Navigate to="/review" state={this.state.session} />
    }

    return (<>
      <Stack direction="column" sx={{ m: 0.5, px: 0.5 }}>
        <Box sx={{ py: 0.5 }}>
          <FormLabel>Restaurant: </FormLabel>
          <Chip color="primary" variant="outlined" label={this.state.restInfo.name} sx={{ fontWeight: 'bold' }} />
        </Box>
        <Box sx={{ py: 0.5 }}>
          <FormLabel>People in your party: </FormLabel>
          <Chip color="primary" variant="outlined" label={this.numGuests} sx={{ fontWeight: 'bold' }} />
        </Box>
      </Stack>

      {/* <Divider sx={{my: 2}} /> */}

      <Stack sx={{ m: 0.5, p: 0.5, border: 1, borderColor: 'primary.main', borderStyle: 'dashed', borderRadius: 2, justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ p: 2 }}>
          <TextField
            id="bill-amount-text-field"
            label="Bill Amount"
            startAdornment={<InputAdornment position="start" component="div"><div><AttachMoneyIcon /></div></InputAdornment>}
            error={Number.isNaN(this.state.mealTotal)}
            placeholder="Not including tip.."
            // defaultValue={""}
            onChange={e => this.handleMealTotalChange(e.target.value)}
            required
            width={400}
            size="small"
          />
        </Box>
        <Divider width="60%" />
        <Stack sx={{ p: 1, justifyContent: 'center', alignItems: 'center' }}>
          <span>
            <span><FormLabel id="choose-tip-group-label">Tip percentage: </FormLabel>{`${(this.state.tipPercent * 100).toString()}% (${getCurrencyString(this.tipTotal)})`}</span>
            <RadioGroup
              defaultValue="0.20"
              name="choose-tip-group"
              size="small"
              row
              margin="none"
              padding={0}
              onChange={e => this.handleTipPercentChange(e.target.value)}
            >
              <FormControlLabel value="0.18" control={<Radio />} label="18%" />
              <FormControlLabel value="0.20" control={<Radio />} label="20%" />
              <FormControlLabel value="0.22" control={<Radio />} label="22%" />
              <FormControlLabel value="-1" control={<Radio />} label="Other:" />
              <TextField size="small" sx={{ width: 100 }}></TextField>
            </RadioGroup>
          </span>
        </Stack>
      </Stack>


      {/* <Divider sx={{my: 2}} /> */}
      <Stack direction="column" sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <ReceiptUpload setReceipt={str => this.setState({ receipt: str })} />
        <Box
          sx={{
            height: '100px',
            width: '100px',
            hidden: false,
            border: 1,
            borderStyle: 'dashed',
            borderRadius: 2,
            borderColor: 'blue',
            backgroundColor: 'lightgrey'
          }}
        ><img crossOrigin="anonymous" src={this.state.receipt} style={{ maxWidth: "100%", maxHeight: "100%" }} /></Box>
      </Stack>

      <Divider sx={{ my: 2 }} />
      <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <FormLabel id="split-method-label" sx={{ mr: 1 }}>Split method: </FormLabel>
        <ToggleButtonGroup
          id="split-method-toggle-group"
          color="primary"
          size="small"
          value={this.state.splitMethod}
          exclusive
          onChange={this.handleSplitMethodChange}
          aria-label="Platform"
        >
          <ToggleButton value="even">Evenly</ToggleButton>
          <ToggleButton value="custom">Custom</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <CustomSplit hidden={this.state.splitMethod === 'even'} data={this.state.customSplitData} />

      <Divider sx={{ my: 2 }} />

      <Stack direction="row" justifyContent="center">
        <Stack direction="column" sx={{ mr: 2 }}>
          <span><FormLabel>Sub total: </FormLabel>{getCurrencyString(this.state.mealTotal)}</span>
          <span><FormLabel>Tip total: </FormLabel>{getCurrencyString(this.tipTotal)}</span>
          <span><FormLabel>Grand total: </FormLabel>{getCurrencyString(this.billTotal)}</span>
        </Stack>
        <Divider orientation="vertical" sx={{ height: 80 }} />
        <Stack direction="column" sx={{ ml: 2 }}>
          <span><FormLabel>Meal due per person: </FormLabel>{getCurrencyString(this.evenMealAmt)}</span>
          <span><FormLabel>Tip due per person: </FormLabel>{getCurrencyString(this.evenTipAmount)}</span>
          <span><FormLabel>Total due per person: </FormLabel>{getCurrencyString(this.evenPerGuestTotal)}</span>
        </Stack>
      </Stack>



      <Divider sx={{ my: 2 }} />
      <Stack sx={{ alignItems: 'center' }}>
        <Button variant="outlined" onClick={this.handleSubmit}>Save and Review</Button>
      </Stack>


    </>);
  }
}

// export default MealDetails;
export default withRouter(MealDetails);