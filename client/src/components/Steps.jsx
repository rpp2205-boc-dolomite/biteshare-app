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


const steps = ["Selecting Restaurant", "Add freinds", "Meal details", "Review your Meal"];
const { formId, formField } = checkoutFormModel;

const UserContext = createContext();
// export default function CheckoutPage() {
//   const [activeStep, setActiveStep] = useState(0);
//   const isLastStep = activeStep === steps.length - 1;
//   function _renderStepContent(step) {
//     switch (step) {
//       case 0:
//         return <AddressForm formField={formField} />;
//       case 1:
//         return <PaymentForm formField={formField} />;
//       case 2:
//         return <ReviewOrder />;
//       default:
//         return <div>Not Found</div>;
//     }
//   }
//   function _sleep(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }

//   async function _submitForm(values, actions) {
//     await _sleep(1000);
//     alert(JSON.stringify(values, null, 2));
//     actions.setSubmitting(false);

//     setActiveStep(activeStep + 1);
//   }

//   function _handleSubmit(values, actions) {
//     if (isLastStep) {
//       _submitForm(values, actions);
//     } else {
//       setActiveStep(activeStep + 1);
//       actions.setTouched({});
//       actions.setSubmitting(false);
//     }
//   }

//   function _handleBack() {
//     setActiveStep(activeStep - 1);
//   }

//   return (
//     <React.Fragment>
//       <Typography component="h1" variant="h4" align="center">
//         Checkout
//       </Typography>
//       <Stepper activeStep={activeStep} className={classes.stepper}>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <React.Fragment>
//         {activeStep === steps.length ? (
//           <CheckoutSuccess />
//         ) : (
//           <Formik
//             initialValues={formInitialValues}
//             validationSchema={currentValidationSchema}
//             onSubmit={_handleSubmit}
//           >
//             {({ isSubmitting }) => (
//               <Form id={formId}>
//                 {_renderStepContent(activeStep)}

//                 <div className={classes.buttons}>
//                   {activeStep !== 0 && (
//                     <Button onClick={_handleBack} className={classes.button}>
//                       Back
//                     </Button>
//                   )}
//                   <div className={classes.wrapper}>
//                     <Button
//                       disabled={isSubmitting}
//                       type="submit"
//                       variant="contained"
//                       color="primary"
//                       className={classes.button}
//                     >
//                       {isLastStep ? "Place order" : "Next"}
//                     </Button>
//                     {isSubmitting && (
//                       <CircularProgress
//                         size={24}
//                         className={classes.buttonProgress}
//                       />
//                     )}
//                   </div>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         )}
//       </React.Fragment>
//     </React.Fragment>
//   );
// }
