import React, { useEffect, useState, useContext, useCallback } from 'react';
import Navbar from './Navbar.jsx';
import {Button, Box, Typography, Stack, List, ListItem, ListItemButton} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading.jsx';

// // const myMeals = useMemo(() => meals, [])


export default function MealsList() {
  // after getSessions is added, uncomment the folloiwng and change array to data on line 26

  const [meals, setMeals] = useState([]);
  const [emptyFeed, handleEmptyFeed] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const getMealSessions = (phoneNum) => {
    axios.get(`/api/sessions?user_id=${user.id}`)
    .then((sessions) => {
      setLoading(false);
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
    getMealSessions(user.phone);
 }, []);

    return (
      <Box sx={{ width: '100%'}}>
        <Navbar></Navbar>
        <Box display="flex" sx={{justifyContent: 'center'}}>
          <Link to="/step" >
            <Button size='large' variant="contained" sx={{backgroundColor:'black', m: 2}}>Create a new Meal Session</Button>
          </Link>
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
                    <Typography variant="h6">
                      {element.rest_name}
                    </Typography>
                    <Typography variant="subtitle1">
                      Host: {element.detail[hostId].name}
                    </Typography>
                    <Typography variant="subtitle1">
                      Amount: {element.detail[user.id].bill + element.detail[user.id].tip}
                    </Typography>
              </Box>
            </Link>
          )
        })}

      </Box>
    );
}
