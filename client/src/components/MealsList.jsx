import React, { useEffect, useState } from 'react';
import Navbar from './Navbar.jsx';
import {Button, Box, Typography, Stack, List, ListItem, ListItemButton} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

var array = [{restName: 'Chilis', host: 'Jack Daniels', amount: 15.35},
{restName: 'Applebees', host: 'Jane Doe', amount: 23.43}, {restName: 'Bluebird Pizza', host: 'Adam Sandler', amount: 471.3}];


export default function MealsList() {
  // after getSessions is added, uncomment the folloiwng and change array to data on line 26
  const location  = useLocation();

  //const { data } = location.state;
  const [meals, setMeals] = useState([])


  console.log({data});
  useEffect(() => {
    axios.get(`/api/users?phone_num=${localStorage.getItem('phone')}`)
    .then((response) => {

      localStorage.setItem('user', JSON.stringify({id: response.data.id, name: response.data.name}));

      return axios.get(`/api/sessions?user_id=${response.data.id}`)
    })
    .then((sessions) => {
      setMeals([...sessions])
    })
    .catch((err) => {
      console.log(err);
    })

 }, [location]);

    return (
      <Box sx={{ width: '100%'}}>
        <Navbar></Navbar>
        {meals.length === 0 ? 'No new meals' : array.map(element => {
          return(
            <Link to="/meal" style={{ textDecoration: 'none' }}
                   state={element}
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
                      {element.restName}
                    </Typography>
                    <Typography variant="subtitle1">
                      Host: {element.host}
                    </Typography>
                    <Typography variant="subtitle1">
                      Amount: {element.amount}
                    </Typography>
              </Box>
            </Link>
          )
        })}
        <Box display="flex" sx={{justifyContent: 'center'}}>
          <Link to="/searchRest" >
            <Button size='large' variant="contained" sx={{backgroundColor:'black', m: 2}}>Create a new Meal Session</Button>
          </Link>
        </Box>
      </Box>
    );
}
