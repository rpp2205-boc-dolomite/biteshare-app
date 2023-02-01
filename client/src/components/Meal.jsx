import React from "react";
import Navbar from "./Navbar.jsx";
import axios from "axios";
import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx";


const Meal = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const userObj = localStorage.getItem('user');
  const parsedUserObj = JSON.parse(userObj);

  const updatePaymentStatus = () => {
    axios.post("/api/sessions/status", {
      userId: parsedUserObj.id
    })
    .then(res => {
      console.log(res);
      if (res.status === 200) {
        navigate('/completePayment');
      }
    })
  };

  return (
    <div>
      {!data ? (
        <Loading />
      ) : (
        <Box>
          <Navbar />
          <Box ml={6}>
            <Typography variant="subtitle1" mt={6} mb={2}>
              Restaurant: {data.rest_name}
            </Typography>
            <Typography variant="body1" mb={2}>
              Total: ${data.sub_total.toFixed(2)}
            </Typography>
            <Typography variant="body1" mb={2}>
              Receipt:
              <Box
                component="img"
                sx={{
                  height: 233,
                  width: 350,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                alt="receipt"
                src={data.receipt}
              ></Box>
            </Typography>
            <Typography variant="body1" mb={2}>
              Number of friends: {Object.entries(data.detail).length}
            </Typography>
            <Typography variant="body1" mb={2}>
              Tips: ${data.tip_total.toFixed(2)}
            </Typography>
            <Typography variant="body1" mb={2}>
              Tip rate:{" "}
              {Math.ceil(
                (data.tip_total.toFixed(2) / data.sub_total.toFixed(2)) * 100
              )}
              %
            </Typography>
            <Typography variant="body1">Friends:</Typography>
            <List
              dense
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
            >
              {Object.entries(data.detail).map((friend, index) => {
                const isPaid = friend[1].is_paid ? "Paid" : "";
                return (
                  <ListItem key={index} disablePadding>
                    <ListItemText
                      id={index}
                      primary={`${friend[1].name} $${friend[1].bill.toFixed(2)} ${isPaid}`}
                    />
                  </ListItem>
                );
              })}
            </List>
            <Divider />
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={updatePaymentStatus}
            >
              Pay
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Meal;
