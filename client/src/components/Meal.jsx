import React from "react";
import Navbar from "./Navbar.jsx";
import axios from 'axios';
import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const dummyData = {
  host: "John",
  restaurant: "McDonald's",
  total: 20.0,
  tip: 6.0,
  receipt: "",
  active: true,
  friends: [
    {
      id: 1,
      name: "Jack",
      total: 10.0,
      tip: 2.0,
      isPaid: false,
    },
    {
      id: 2,
      name: "Sam",
      total: 5.0,
      tip: 1.0,
      isPaid: true,
    },
    {
      id: 3,
      name: "Tim",
      total: 5.0,
      tip: 3.0,
      isPaid: true,
    },
  ],
};

const Meal = (props) => {
  const updatePaymentStatus = () => {
    // if a user clicks "pay" button, it updates "is_paid" column in Sessions table
    // body: session id, PUT request
    axios.put('/session', props.host_id)
  }

  return (
    <Box>
      <Navbar />
      <Box ml={6}>
        <Typography variant="subtitle1" mt={6} mb={2}>
          Restaurant: {dummyData.restaurant}
        </Typography>
        <Typography variant="body1" mb={2}>
          Total: ${dummyData.total.toFixed(2)}
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
            src={dummyData.receipt}
          ></Box>
        </Typography>
        <Typography variant="body1" mb={2}>
          Number of friends: {dummyData.friends.length}
        </Typography>
        <Typography variant="body1" mb={2}>
          Tips: ${dummyData.tip.toFixed(2)}
        </Typography>
        <Typography variant="body1" mb={2}>
          Tip rate:{" "}
          {Math.ceil(
            (dummyData.tip.toFixed(2) / dummyData.total.toFixed(2)) * 100
          )}
          %
        </Typography>
        <Typography variant="body1">Friends:</Typography>
        <List
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {dummyData.friends.map((friend, index) => {
            const isPaid = friend.isPaid ? "Paid" : "";
            return (
              <ListItem key={index} disablePadding>
                <ListItemText
                  id={index}
                  primary={`${friend.name} $${friend.total.toFixed(2)} ${isPaid}`}
                />
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <Button variant="contained" sx={{ mt: 2 }} onClick={updatePaymentStatus}>
          Pay
        </Button>
      </Box>
    </Box>
  );
};

export default Meal;
