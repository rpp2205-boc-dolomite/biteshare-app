import * as React from 'react';
import Navbar from './Navbar.jsx';
import {Button, Box, Typography, Stack, List, ListItem, ListItemButton} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link, useLocation } from 'react-router-dom'


var array = [{restName: 'Chilis', host: 'Jack Daniels', amount: 15.35},
{restName: 'Applebees', host: 'Jane Doe', amount: 23.43}, {restName: 'Bluebird Pizza', host: 'Adam Sandler', amount: 471.3}]

export default function Meals(props) {
  // const meals = props.sessions.length;
  const meals = array.length;
  const { state } = useLocation();
    return (
      <Box sx={{ width: '100%'}}>
        <Navbar></Navbar>
        {meals === 0 ? 'No new meals' : array.map(element => {
          return(
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
              }}

              onClick={(e) => {
                alert(state.state.value);
              }}
            >
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
          )
        })}
        <Box display="flex" sx={{justifyContent: 'center'}}>
          <Button component={Link} to="/create" size='large' variant="contained" sx={{backgroundColor:'black', m: 2}}>Create a new Meal Session</Button>
        </Box>
      </Box>
    );
}
