import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {TextField, Box, Link, Container, List, ListItem, ListItemText, IconButton, Button} from '@mui/material';
import SearchFriends from './SearchFriends.jsx';
import FriendEntry from './FriendEntry.jsx';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Navbar from '../Navbar.jsx';
import Loading from '../Loading.jsx';

import { useLocation } from 'react-router-dom'

const fakeFriendsList2 = [
  "Anna: 111123123", "Bob: 312456789", "Davie Wang: 44556677"
]
const AddFriends = (props) => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('local: ', user);
  const [existList, setExistList] = useState(null)
  const [friends, setFriends] = useState([]);
  console.log('friends', friends);


  const { state } = useLocation();


  //call the data to get the users exist friends list
  const getFriends = () => {
    //for test use the defatul id
    let user_id=user.id;
    return axios.get(`/api/friends/?user_id=${user_id}`)
      .then((result) => {
        console.log('client friends res:', result.data);
        //convert the result data to matche the fackfriendsList2 data
        let list = result.data.friends.size===0 ? [] : result.data.friends;
        let userFriends = list.map((friend) => {
          return friend.name + ': ' + friend.phone_num
        })
        setExistList(userFriends);
      })
  }

  if (!existList) {
    getFriends();
  }

  const deleteOne = (i) => {
    setFriends(friends.slice(0, i).concat(friends.slice(i+1)))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //pass res_nest and friends to next component
    console.log('continue to create page will pass the friens list to next component', friends);
  }


  return (
    <>
      <Navbar />
      <Container maxWidth="95%" sx={{p:1, m:1,  width:"92%", justifyContent:"center"}}>
        {!existList ? <Loading /> :<SearchFriends friends={friends} setFriends={setFriends} existList={existList} setExistList={setExistList}/>}
        <hr/>
        <Box component="span" sx={{dispaly:'block', fontSize:'larger'}}>
          Friends List
        </Box>
        <Box component="div">
          {!friends.length ? (<h2>No friends in this meal yet</h2>)
          : (<List>
            {friends.map((friend, i) =>
              <FriendEntry friend={friend} i={i} deleteOne={deleteOne} page="addfriends"/>
            )}
          </List>)
          }
        </Box>
        <Box sx={{justifyContent:"center",textAlign:'center', pt:"20%", m:1}}>
          <Link to='/mealdetails'>
            <Button variant="contained" size="large" sx={{width:'60%', backgroundColor:'orange', '&:hover': {backgroundColor:'orange'}}}>Continue</Button>
          </Link>
        </Box>

      </Container>

    </>

  )
}

export default AddFriends;