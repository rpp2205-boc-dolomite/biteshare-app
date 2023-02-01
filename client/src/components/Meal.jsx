import React from "react";
import Navbar from "./Navbar.jsx";
import axios from "axios";
import {
  Button,
  Box,
  Typography,
  Divider,
  FormLabel,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx";

const Meal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const userObj = localStorage.getItem("user");
  const parsedUserObj = JSON.parse(userObj);

  const updatePaymentStatus = () => {
    axios
      .post("/api/sessions/status", {
        userId: parsedUserObj.id,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/completePayment");
        }
      });
  };

  return (
    <div>
      {!data ? (
        <Loading />
      ) : (
        <Box>
          <Navbar />
          <Box ml={6} mt={5}>
            <FormLabel>Restaurant:</FormLabel>
            <Typography variant="subtitle1">{data.rest_name}</Typography>
            <Divider sx={{ borderBottomWidth: 1 }}/>
            <FormLabel>Total:</FormLabel>
            <Typography variant="body1">
              ${data.sub_total.toFixed(2)}
            </Typography>
            <Divider sx={{ borderBottomWidth: 1 }}/>
            <FormLabel>Tips:</FormLabel>
            <Typography variant="body1">
              ${data.tip_total.toFixed(2)}
            </Typography>
            <Divider sx={{ borderBottomWidth: 1 }}/>
            <FormLabel>Tip rate:</FormLabel>
            <Typography variant="body1">
              {Math.ceil(
                (data.tip_total.toFixed(2) / data.sub_total.toFixed(2)) * 100
              )}
              %
            </Typography>
            <Divider sx={{ borderBottomWidth: 1 }}/>
            <FormLabel>Number of friends:</FormLabel>
            <Typography variant="body1">
              {Object.entries(data.detail).length} people
            </Typography>
            <Divider sx={{ borderBottomWidth: 1 }}/>
            <FormLabel>Friends:</FormLabel>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {Object.entries(data.detail).map((friend, index) => {
                    const isPaid = friend[1].is_paid ? "Paid" : "Unpaid";
                    return (
                      <TableRow key={index}>
                        <TableCell>{`${friend[1].name}`}</TableCell>
                        <TableCell>{`$${friend[1].bill.toFixed(2)}`}</TableCell>
                        <TableCell>{isPaid}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <FormLabel>Receipt:</FormLabel>
            <Typography variant="body1">
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
            <Divider sx={{ borderBottomWidth: 3 }}/>
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
