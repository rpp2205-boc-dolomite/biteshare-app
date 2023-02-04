import React, { useEffect, useState } from "react";
import Navbar from "./Dashboard/Navbar.jsx";
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
  TableHead,
  TextField,
  List,
  ListItemText,
  ListItem,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import { deepPurple, deepOrange, blue } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx";

const Meal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [isInSession, setIsInSession] = useState("");

  const data = location.state;
  const userObj = localStorage.getItem("user");
  const parsedUserObj = JSON.parse(userObj);

  const avatorColorPool = [deepOrange[500], blue[500], null, deepPurple[500]];

  const pickColor = (i) => {
    if(i < 4) {
      return i;
     } else {
      return i - (Math.floor(i / 4) * 3) -1
     }
  };

  useEffect(() => {
    checkIfUserInFriends();
  }, []);

  const checkIfUserInFriends = () => {
    const userId = parsedUserObj.id;
    const sessionId = data._id;

    axios
      .get(`/api/sessions/friend?user_id=${userId}&session_id=${sessionId}`)
      .then((data) => {
        if (data.data === "not friends") {
          setIsInSession(false);
        } else {
          setIsInSession(true);
        }
      });
  };

  const updatePaymentStatus = () => {
    axios
      .post("/api/sessions/status", {
        userId: parsedUserObj.id,
        comment: comment,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/completePayment");
        }
      })
      .catch((err) => console.log(err));
  };

  const onCommentChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div>
      {!data || isInSession.length === 0 ? (
        <Loading />
      ) : (
        <div>
          <Navbar />
          {isInSession ? (
            <Box>
              <Box ml={6} mt={5}>
                <FormLabel>Restaurant:</FormLabel>
                <Typography variant="subtitle1">{data.rest_name}</Typography>
                <Divider sx={{ borderBottomWidth: 1 }} />
                <FormLabel>Subtotal:</FormLabel>
                <Typography variant="body1">
                  $ {data.sub_total.toFixed(2)}
                </Typography>
                <Divider sx={{ borderBottomWidth: 1 }} />
                <FormLabel>Tip:</FormLabel>
                <Typography variant="body1">
                  {`$ ${data.tip_total.toFixed(2)} (${Math.ceil(
                    (data.tip_total.toFixed(2) / data.sub_total.toFixed(2)) *
                      100
                  )}%)`}
                </Typography>
                <Divider sx={{ borderBottomWidth: 1 }} />
                <FormLabel>Total: </FormLabel>
                <Typography variant="body1">
                  $ {data.sub_total + data.tip_total}
                </Typography>
                <Divider sx={{ borderBottomWidth: 1 }} />
                <FormLabel>{`Friends (${
                  Object.entries(data.detail).length
                } people) : `}</FormLabel>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          username
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>total</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(data.detail).map((friend, index) => {
                        const isPaid = friend[1].is_paid ? "Paid" : "Unpaid";
                        return (
                          <TableRow key={index}>
                            <TableCell>{`${friend[1].name}`}</TableCell>
                            <TableCell>{`$${
                              friend[1].bill + friend[1].tip
                            }`}</TableCell>
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
                <Divider sx={{ borderBottomWidth: 1 }} />
                <TextField
                  id="standard-basic"
                  fullWidth
                  label="Leave a comment"
                  variant="standard"
                  onChange={onCommentChange}
                />
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={updatePaymentStatus}
                >
                  Pay
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography align="center" variant="h5" mt={2} p={4}>
                Friends in the Meal Session
              </Typography>
              <Divider />
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <List>
                  {Object.entries(data.detail).map((friend, index) => {
                    return (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar sx={{bgcolor: avatorColorPool[pickColor(index)]}}>
                            {friend[1].name.slice(0, 1).toUpperCase()}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText key={index} sx={{ fontSize: "1.8em" }}>
                          {friend[1].name}
                        </ListItemText>
                      </ListItem>
                      // <div>
                      //   <Avatar sx={{ bgcolor: avatorColorPool[pickColor()] }}>
                      //     {friend[1].name.slice(0, 1).toUpperCase()}
                      //   </Avatar>
                      //   <ListItemText key={index} sx={{ fontSize: "1.8em" }}>
                      //     {friend[1].name}
                      //   </ListItemText>
                      // </div>
                    );
                  })}
                </List>
              </Box>
            </Box>
          )}
        </div>
      )}
    </div>
  );
};

export default Meal;
