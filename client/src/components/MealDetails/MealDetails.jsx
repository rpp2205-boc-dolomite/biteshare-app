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
      user_id: '',
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
    // redirect: false,
    // isInitialized: false
  }

  constructor(props) {
    super(props);
    this.handleSplitMethodChange = this.handleSplitMethodChange.bind(this);
    this.handleMealTotalChange = this.handleMealTotalChange.bind(this);
    this.handleTipPercentChange = this.handleTipPercentChange.bind(this);
    this.handleCustomTipChange = this.handleCustomTipChange.bind(this);
    this.buildCustomSplitData = this.buildCustomSplitData.bind(this);
    this.validateSession = this.validateSession.bind(this);
    this.createSession = this.createSession.bind(this);

    this.setInputs = props.setInputs || (() => {});
    if (props.inputs) {
      this.session = props.inputs.session;
      Object.assign(this.state, {
        mealTotal: props.inputs.mealTotal || 0,
        tipPercent: props.inputs.tipPercent || 0.2,
        splitMethod: props.inputs.splitMethod || 'even',
        receipt: props.inputs.receipt || '',
        customSplitData: props.inputs.customSplitData || null
      });
      Object.assign(this.state.host, props.inputs.host);
      Object.assign(this.state.friends, props.inputs.friends);
      Object.assign(this.state.restInfo, props.inputs.restInfo);
    }
    // console.log('MD CONSTRUCTOR', this.state);
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
    return this.evenMealAmount + this.evenTipAmount;
  }

  get formDataIsValid() {
    return (
      (!Number.isNaN(this.state.mealTotal) && this.state.mealTotal > 0) &&
      (!Number.isNaN(this.state.tipPercent) && this.state.tipPercent >= 0) &&
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
    this.setState({ mealTotal: Math.abs(value), splitMethod: 'even' });
  }

  handleTipPercentChange(e) {
    let percent;
    if (e.target.value === '-1') {
      // document.getElementById('custom-tip-slider').value = Math.floor(this.state.tipPercent * 100).toString();
      document.getElementById('custom-tip-slider').disabled = false;
      percent = Math.floor(document.getElementById('custom-tip-slider').value) / 100;
    } else {
      document.getElementById('custom-tip-slider').disabled = true;
      percent = Math.abs(e.target.value);
    }
    this.setState({ tipPercent: percent, splitMethod: 'even' })
  }

  handleCustomTipChange(e) {
    this.setState({ tipPercent: Math.floor(e.target.value) / 100 })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.validateSession() && this.session) {
      this.session.payload = this.createSession();
      // console.log('SESSION', this.session.payload);
    } else if (this.session) {
      this.session.payload = null;
    }
  }

  componentWillUnmount() {
    this.setInputs({
      ...this.state,
      session: this.session
    });
  }

  componentDidMount() {
    if (this.state.mealTotal) {
      document.getElementById('bill-amount-text-field').value = this.state.mealTotal;
      // document.getElementById('choose-tip-radio-group').value = this.state.tipPercent;
    }
  }

  handleSplitMethodChange(e) {
    e.preventDefault();
    // console.log('VALID?', this.formDataIsValid, this.state.splitMethod, this.state.mealTotal, this.state.tipPercent, this.state.receipt);
    if (this.state.splitMethod === 'even') {
      if (this.formDataIsValid) {
        // console.log('FORM DATA VALID')
        this.setState({ customSplitData: this.buildCustomSplitData(), splitMethod: 'custom' });
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
      return new userObj(guest.name, guest.id, guest.phone_num, evenMealAmount, evenTipAmount);
    };

    data.push(makeGuestObj(this.state.host));

    for (const friend of this.state.friends) {
      data.push(makeGuestObj(friend));
    }

    // this.setState({ customSplitData: data });
    return data;
  }

  validateSession() {
    if (!this.state.mealTotal || (!this.state.tipPercent && this.state.tipPercent !== 0)) {
      return false;
    }

    if (this.state.splitMethod !== 'even') {
      let mealSum = 0;
      let tipSum = 0;
      const data = this.state.customSplitData || this.buildCustomSplitData();
      for (const guest of data) {
        if (Number.isNaN(guest.meal) || Number.isNaN(guest.meal)) { return false }
        mealSum += guest.meal;
        tipSum += guest.tip;
      }

      return (
        (mealSum.toFixed(2) === this.state.mealTotal.toFixed(2)) &&
        (tipSum.toFixed(2) === this.tipTotal.toFixed(2))
      );
    }

    return true;
  }

  createSession() {
    const data = this.state.customSplitData || this.buildCustomSplitData();
    const newSession = {
      host: {
        ...this.state.host,
        meal_amount: data[0].meal,
        tip_amount: data[0].tip,
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

    return newSession;
  }


  render() {

    return (<>
      {/* Rest name and number of guests  */}
      <Stack direction="column" sx={{ m: 0.5, px: 0.5 }}>
        <Box sx={{ py: 0.5 }}>
          <FormLabel>Restaurant: </FormLabel>
          <Chip color="primary" variant="outlined" label={this.state.restInfo.name} sx={{ fontWeight: 'bold', fontSize: '1rem' }} />
        </Box>
        <Box sx={{ py: 0.5 }}>
          <FormLabel>People in your party: </FormLabel>
          <Chip color="primary" variant="outlined" label={this.numGuests} sx={{ fontWeight: 'bold', fontSize: '1rem' }} />
        </Box>
      </Stack>

      {/* Bill amount / Tip percentage  */}
      <Stack sx={{ m: 0.5, p: 0.5, border: 1, borderColor: 'primary.main', borderStyle: 'dashed', borderRadius: 2, justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ p: 2 }}>
          <TextField
            id="bill-amount-text-field"
            label="Bill Amount"
            // startAdornment={<InputAdornment position="start" component="div"><div><AttachMoneyIcon /></div></InputAdornment>}
            error={Number.isNaN(this.state.mealTotal)}
            placeholder="Not including tip.."
            onChange={e => this.handleMealTotalChange(e.target.value)}
            required
            width={400}
            size="small"
          />
        </Box>
        <Divider width="60%" />
        <Stack sx={{ p: 1, justifyContent: 'center', alignItems: 'center' }}>
          <span>
            <span><FormLabel id="choose-tip-group-label">Tip percentage: </FormLabel><Chip color="primary" variant="outlined" label={`${Math.floor(this.state.tipPercent * 100).toString()}%`} sx={{ fontWeight: 'bold', fontSize: '1rem' }} /></span>
            <RadioGroup
              id="choose-tip-radio-group"
              defaultValue={this.state.tipPercent}
              name="choose-tip-group"
              size="small"
              row
              margin="none"
              padding={0}
              onChange={this.handleTipPercentChange}
            >
              <FormControlLabel value={0.18} control={<Radio />} label="18%" />
              <FormControlLabel value={0.20} control={<Radio />} label="20%" />
              <FormControlLabel value={0.22} control={<Radio />} label="22%" />
              <FormControlLabel value={-1} control={<Radio />} label="Other:" />
              <Input
                id="custom-tip-slider"
                type='range'
                min="0"
                max="100"
                onChange={this.handleCustomTipChange}
                disabled={true}
                defaultValue="25"
                size="small"
                sx={{ width: 100 }}
              />
            </RadioGroup>
          </span>
        </Stack>
      </Stack>

      {/* Receipt upload  */}
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
            borderColor: '#76294B',
            backgroundColor: 'AntiqueWhite'
          }}
        ><img crossOrigin="anonymous" src={this.state.receipt} style={{ maxWidth: "100%", maxHeight: "100%" } alt="Receipt image"} /></Box>
      </Stack>

      {/* Split method toggle  */}
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

      {/* Custom split component  */}
      <CustomSplit hidden={this.state.splitMethod === 'even'} data={this.state.customSplitData} mealTotal={this.state.mealTotal} tipTotal={this.tipTotal} />

      <Divider sx={{ my: 2 }} />

      {/* Data display  */}
      <Box hidden={this.state.splitMethod === 'custom'}>
        <Stack direction="row" justifyContent="center">
          <Stack direction="column" sx={{ mr: 2 }}>
            <span><FormLabel>Sub total: </FormLabel><Typography component='span' color='primary'>{getCurrencyString(this.state.mealTotal)}</Typography></span>
            <span><FormLabel>Tip total: </FormLabel><Typography component='span' color='primary'>{getCurrencyString(this.tipTotal)}</Typography></span>
            <span><FormLabel>Grand total: </FormLabel><Typography component='span' color='primary'>{getCurrencyString(this.billTotal)}</Typography></span>
          </Stack>
          <Divider orientation="vertical" sx={{ height: 80 }} />
          <Stack direction="column" sx={{ ml: 2 }}>
            <span><FormLabel>Meal due per person: </FormLabel><Typography component='span' color='primary'>{getCurrencyString(this.evenMealAmount)}</Typography></span>
            <span><FormLabel>Tip due per person: </FormLabel><Typography component='span' color='primary'>{getCurrencyString(this.evenTipAmount)}</Typography></span>
            <span><FormLabel>Total due per person: </FormLabel><Typography component='span' color='primary'>{getCurrencyString(this.evenPerGuestTotal)}</Typography></span>
          </Stack>
        </Stack>
      </Box>
    </>);
  }
}

export default MealDetails;
// export default withRouter(MealDetails);