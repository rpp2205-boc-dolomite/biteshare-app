import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Card, CardContent, Button } from "@mui/material";
import { IconContext } from "react-icons";
import { AiFillCheckCircle } from "react-icons/ai";

const CompletePayment = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt={20}>
      <IconContext.Provider
        value={{ color: "#1CAC78", className: "global-class-name", size: 80 }}
      >
        <div>
          <AiFillCheckCircle />
        </div>
      </IconContext.Provider>
      <Typography variant="h6" mb={10}>Success!</Typography>
      <Button onClick={() => navigate('/meals')} variant="contained">Back to Dashboard</Button>
    </Box>
  );
};

export default CompletePayment;
