import React, { useEffect, useState, useContext, useCallback } from 'react';
import Navbar from '../Navbar.jsx';
import {Button, Box, Typography, Stack, List, ListItem, ListItemButton} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading.jsx';
import { useOutletContext } from 'react-router-dom';


export default function MealsList() {

  const [meals, setMeals] = useState([]);
  const [emptyFeed, handleEmptyFeed] = useState('');
  const { user } = useOutletContext();

  const getMealSessions = () => {
    axios.get(`/api/sessions?user_id=${user.user_id}`)
    .then((sessions) => {
      //console.log('sessions', sessions);
      if(sessions.data.length === 0) {
        handleEmptyFeed('No new meal sessions');
      } else {
        setMeals([...sessions.data])
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }


  useEffect(() => {
    getMealSessions();
 }, []);

    return (
      <Box sx={{ width: '100%'}}>
        <Navbar></Navbar>
        <Box display="flex" sx={{pt:1, justifyContent: 'center'}}>
            <Button component={Link} to={'/step'} size='large' variant="contained" color="primary" sx={{ m: 2}}>Create a new Meal Session</Button>
        </Box>
        {meals.length === 0 ? emptyFeed : meals.map((element, index) => {
          var hostId = element.host;
          return(
            <Link to="/meal" style={{ textDecoration: 'none' }}
                   state={element} key={index}
            >
              <Box
                sx={{
                  width: 'auto',
                  p: 1,
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                  border: '1px solid',
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                  borderRadius: 2,
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  m: 1
                }}>
                    <Typography variant="h6" color="primary">
                      {element.rest_name}
                    </Typography>
                    <Typography variant="subtitle1" color="secondary">
                      Host: {element.detail[hostId].name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      Amount: {(element.detail[user.user_id].bill) + element.detail[user.user_id].tip}
                    </Typography>
              </Box>
            </Link>
          )
        })}

      </Box>
    );
}
