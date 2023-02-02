import React, { useState, createContext, useContext } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress
} from "@mui/material";
//import { Formik, Form } from "formik";

import MealsList from "./Dashboard/MealsList.jsx";
import RestaurantSearch from "./Restaurant/RestaurantSearch.jsx";
import MealDetails from "./MealDetails/MealDetails.jsx";
import AddFriends from "./Friends/AddFriends.jsx";
import Review from './Review/Review.jsx';
import Navbar from './Dashboard/Navbar.jsx';
const steps = ["Selecting Restaurant", "Add freinds", "Meal details", "Review your Meal"];
//const { formId, formField } = checkoutFormModel;

const UserContext = createContext();
export default function Steps() {
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;
  const [inputs, setInputs] = useState({
    host: {user_id:'', name: '', phone_num:''},
    friends:[],
    restInfo:{name:'', address:''}
  })
  const [isSubmitting, setSubmit] = useState(false);
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

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  console.log('step page info: ', inputs);

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

        {activeStep === steps.length ? (
          <MealsList />
        ) : (
        <>
          {_renderStepContent(activeStep)}

         <div>
          {activeStep !== 0 && (
           <Button onClick={_handleBack} >
            Back
          </Button>
         )}
        <div>
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => setActiveStep(activeStep + 1)}
          >
            {isLastStep ? "Confirm" : "Next"}
          </Button>
          {isSubmitting && (
            <CircularProgress
              size={24}
            />
          )}
        </div>
      </div>
        </>)
          // <Formi
          //   initialValues={formInitialValues}
          //   validationSchema={currentValidationSchema}
          //   onSubmit={_handleSubmit}
          // >
          //   {({ isSubmitting }) => (
          //     <Form id={formId}>
          //       {_renderStepContent(activeStep)}

          //       <div className={classes.buttons}>
          //         {activeStep !== 0 && (
          //           <Button onClick={_handleBack} className={classes.button}>
          //             Back
          //           </Button>
          //         )}
          //         <div className={classes.wrapper}>
          //           <Button
          //             disabled={isSubmitting}
          //             type="submit"
          //             variant="contained"
          //             color="primary"
          //             className={classes.button}
          //           >
          //             {isLastStep ? "Place order" : "Next"}
          //           </Button>
          //           {isSubmitting && (
          //             <CircularProgress
          //               size={24}
          //               className={classes.buttonProgress}
          //             />
          //           )}
          //         </div>
          //       </div>
          //     </Form>
          //   )}
          // </Formik>)
        }
    </>
  );
}
