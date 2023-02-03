import React, { useState, createContext, useContext } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress
} from "@mui/material";
import { Navigate } from 'react-router-dom';

import MealsList from "./Dashboard/MealsList.jsx";
import RestaurantSearch from "./Restaurant/RestaurantSearch.jsx";
import MealDetails from "./MealDetails/MealDetails.jsx";
import AddFriends from "./Friends/AddFriends.jsx";
import Review from './Review/Review.jsx';
import Navbar from './Dashboard/Navbar.jsx';
import axios from 'axios';
const steps = ["Selecting Restaurant", "Add freinds", "Meal details", "Review your Meal"];

const btnStyle = {
  marginTop:3,
  marginLeft:1,
}
export default function Steps() {
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;
  const [redirect, setRedirect] = useState(false);
  const [inputs, setInputs] = useState({
    host: {
      user_id:'',
      name: '',
      phone_num:'',
      meal_amount: 0,
      tip_amount: 0
    },
    friends:[],
    restInfo:{name:'', address:''},
    sub_total: 0,
    tip_total: 0,
    receipt: "",
    active: true,
  })
  const [isSubmitting, setSubmit] = useState(false);

  if (!inputs.host.user_id) {
    const user = JSON.parse(localStorage.getItem('user'));
    //const phone = localStorage.getItem('phone');
    console.log('step local: ', user);
    setInputs({...inputs, host: {...inputs.host, user_id: user.id, name: user.name, phone_num: user.phone_num}})
  }
  function _renderStepContent(step) {
    switch (step) {
      case 0:
        return <RestaurantSearch inputs={inputs} setInputs={setInputs}/>;
      case 1:
        return <AddFriends inputs={inputs} setInputs={setInputs}/>;
      case 2:
        return <MealDetails inputs={inputs} setInputs={setInputs}/>;
      case 3:
        return <Review inputs={inputs} setInputs={setInputs}/>;
      default:
        return <div>Not Found</div>;
    }
  }

  function _handleSubmit() {
    console.log('it is last page we need render to dashboard');
    axios.post('/api/sessions', inputs)
    .then((response) => {
      setRedirect(true);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  console.log('step page info: ', inputs);

  function _handleNext() {
   if (activeStep === 2) {
      // Matt's page validataion functions
      console.log('it is 2nd step');
    }
    if (activeStep === 3) {
      _handleSubmit();
    }
    setActiveStep(activeStep + 1);
  }
  if (redirect) {
    return <Navigate to='/meals' replace={true}/>
  }
  return (
    <>
      <Navbar />
      <Stepper activeStep={activeStep} sx={{p:1, m:2}}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

        <div>
          {_renderStepContent(activeStep)}

          <div style={{display:'flex', justifyContent:'space-around'}}>
            {activeStep !== 0 && (
              <Button onClick={_handleBack} variant="contained"
              color="primary"  sx={btnStyle}>
                Back
              </Button>
            )}
            <div style={{margin:1, position:'relative'}}>

              <Button variant="contained" color="primary" onClick={_handleNext} sx={btnStyle}>
                {isLastStep ? "Confirm" : "Next" }
              </Button>

            </div>
          </div>
        </div>

    </>
  );
}
