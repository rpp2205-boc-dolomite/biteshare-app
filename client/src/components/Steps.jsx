import React, { useState, createContext, useContext } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress
} from "@mui/material";
import { Formik, Form } from "formik";

import MealsList from "./MealsList";
import RestaurantSearch from "./Restaurant/RestaurantSearch";
import MealDetails from "../MealDetails/MealDetails/=";
import AddFriends from "./Friends/AddFriends";
import Review from './Review.jsx';

const steps = ["Selecting Restaurant", "Add freinds", "Meal details", "Review your Meal"];
const { formId, formField } = checkoutFormModel;

const UserContext = createContext();
export default function Steps() {
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;
  const [inputs, setInputs] = useState({
    host: {user_id:'', name: '', phone_num:''},
    friends:[],
    resInfo,{name:'', address:''}
  })
  function _renderStepContent(step) {
    switch (step) {
      case 0:
        return <RestaurantSearch />;
      case 1:
        return <AddFriends />;
      case 2:
        return <MealDetails />;
      case 3:
        return <Review />;
      default:
        return <div>Not Found</div>;
    }
  }
//   function _sleep(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }

//   async function _submitForm(values, actions) {
//     await _sleep(1000);
//     alert(JSON.stringify(values, null, 2));

//     setActiveStep(activeStep + 1);
//   }

  // function _handleSubmit(values, actions) {
  //   if (isLastStep) {
  //     _submitForm(values);
  //   } else {
  //     setActiveStep(activeStep + 1);

  //   }
  // }

//   function _handleBack() {
//     setActiveStep(activeStep - 1);
//   }

  return (
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        Checkout
      </Typography>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
          <CheckoutSuccess />
        ) : (
          <Formik
            initialValues={formInitialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
                {_renderStepContent(activeStep)}

                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={_handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <div className={classes.wrapper}>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      {isLastStep ? "Place order" : "Next"}
                    </Button>
                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </React.Fragment>
    </React.Fragment>
  );
}
