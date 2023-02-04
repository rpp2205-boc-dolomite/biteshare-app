import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {TextField, Box, Container, List, ListItem, ListItemText, IconButton, Button} from '@mui/material';
import SearchFriends from './SearchFriends.jsx';
import FriendEntry from './FriendEntry.jsx';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Navbar from '../Dashboard/Navbar.jsx';
import Loading from '../Loading.jsx';
import { Navigate, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'


const AddFriends = ({inputs, setInputs}) => {
  const [existList, setExistList] = useState(null)
  const [friends, setFriends] = useState([]);
  console.log('friends', friends);

  console.log('info from steps: ', inputs)
  //call the data to get the users exist friends list
  const getFriends = () => {
    //for test use the defatul id
    let user_id=inputs.host.user_id;
    return axios.get(`/api/friends/?user_id=${user_id}`)
      .then((result) => {
        let list = !result.data.friends.length ? [] : result.data.friends;
        let userFriends = list.map((friend) => {
          return {id: friend.id, name: friend.name, phone_num: friend.phone_num}
        })
        setExistList(userFriends);
      })
  }

  if (!existList) {
    getFriends();
  }
  //handle the back button with props
  useEffect(() => {
    if (inputs.friends.length > 0) {
      setFriends(inputs.friends);
    }
  }, [])

  const deleteOne = (i) => {
    setFriends(friends.slice(0, i).concat(friends.slice(i+1)))
  };


  return (

    <Container maxWidth="95%" sx={{p:1, m:1,  width:"92%", justifyContent:"center"}}>
      {!existList ? <Loading /> :<SearchFriends inputs={inputs} setInputs={setInputs} id={inputs.host.user_id} friends={friends} setFriends={setFriends} existList={existList} setExistList={setExistList}/>}
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
    </Container>
  )
}

export default AddFriends;