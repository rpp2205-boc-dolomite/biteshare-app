import React, { useState, createContext, useContext } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Alert
} from "@mui/material";
import { Navigate, useOutletContext } from 'react-router-dom';

import MealsList from "./Dashboard/MealsList.jsx";
import RestaurantSearch from "./Restaurant/RestaurantSearch.jsx";
import MealDetails from "./MealDetails/MealDetails.jsx";
import AddFriends from "./Friends/AddFriends.jsx";
import Review from './Review/Review.jsx';
import Navbar from './Dashboard/Navbar.jsx';
import Loading from './Loading.jsx';

import axios from 'axios';
const steps = ["Selecting Restaurant", "Add friends", "Meal details", "Review your Meal"];

const btnStyle = {
  marginTop:3,
  marginLeft:1,
}
const initAlert = {status:false, severity:'', msg:''};
export default function Steps() {
  const { user } = useOutletContext();
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;
  const [redirect, setRedirect] = useState(false);
  const [alert, setAlert] = useState(initAlert);
  const [inputs, setInputs] = useState({
    host: {
      user_id:'',
      name: '',
      phone_num:''
    },
    friends:[],
    restInfo:{name:'', address:''},
    session: {
      _payload: null,
      get payload() {
        return this._payload;
      },
      set payload(payload) {
        this._payload = payload;
      }
    }
  })
  const [isSubmitting, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!inputs.host.user_id) {
    setInputs({...inputs, host: {...inputs.host, user_id: user.user_id, name: user.name}})
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
    //console.log('it is last page we need render to dashboard');
    setLoading(true)
    axios.post('/api/sessions', inputs.session.payload)
    .then((response) => {
      setLoading(false)
    })
    .then(() => setRedirect(true))
    .catch((err) => {
      if (err.response.data.status === 400) {
        setAlert({status:true, severity:'info', msg:'Some friends cannot receive the notifications!'})
        setTimeout(() => {
          setAlert(initAlert);
          setRedirect(true);
          setLoading(false);
        }, 3000)
      }
    })
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  // console.log('step page info: ', inputs);

  function _handleNext() {
    let isError = false
    if (activeStep === 0 && !inputs.restInfo.name) {
      setAlert({status:true, severity:'warning', msg:'Please select restaurant!'});
      isError = true;
    }
    if (activeStep === 1 && !inputs.friends.length) {
      setAlert({status:true, severity:'warning', msg:'Please add friends to this bill!'})

      isError = true;
    }
    if (activeStep === 2 && !inputs.session.payload) {
      setAlert({status:true, severity:'warning', msg:'Please fill in all the blank!'});
      isError = true;
    }
    if (activeStep === 3) {
      _handleSubmit();
    }
    if (isError) {
      setTimeout(() => {
        setAlert(initAlert);
        return;
      }, 3000)
    } else {
      setActiveStep(activeStep + 1);
    }

  }
  if (redirect) {
    return <Navigate to='/meals' replace={true}/>
  }

  return (
    <>
      <Navbar />
      {loading ? <Loading /> :
      <Stepper activeStep={activeStep} sx={{p:1, m:2}}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>}
        {alert.status &&
          <Alert severity={alert.severity} onClose={() => setAlert(initAlert)}>{alert.msg}</Alert>
        }
      {!loading &&
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
      }
    </>
  );
}
