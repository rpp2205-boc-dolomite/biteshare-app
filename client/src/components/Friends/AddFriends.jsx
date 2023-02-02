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

const fakeFriendsList2 = [
  "Anna: 111123123", "Bob: 312456789", "Davie Wang: 44556677"
]
const AddFriends = ({inputs, setInputs}) => {
  // const user = JSON.parse(localStorage.getItem('user'));
  // console.log('local: ', user);
  const [existList, setExistList] = useState(null)
  const [friends, setFriends] = useState([]);
  console.log('friends', friends);
  // useEffect(() => {
  //   setInputs({...inputs, friends:friends});
  // }, [friends])
  //-------- pass props to next components ------//
  // const { state } = useLocation();
  // const restInfo = state.restInfo;
  // console.log('resInfo', restInfo);
  console.log('info from steps: ', inputs)
  //call the data to get the users exist friends list
  const getFriends = () => {
    //for test use the defatul id
    let user_id=inputs.host.user_id;
    return axios.get(`/api/friends/?user_id=${user_id}`)
      .then((result) => {
        console.log('client friends res:', result.data);
        //convert the result data to matche the fackfriendsList2 data
        let list = !result.data.friends.length ? [] : result.data.friends;
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


  return (
    <>
      {/* <Navbar /> */}
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
        {/* <Box sx={{justifyContent:"center",textAlign:'center', pt:"20%", m:1}}>
          <Button
           component={Link}
           to='/mealdetails'
           //state={{restInfo, friends}}
           variant="contained"
           size="large"
           sx={{width:'60%', backgroundColor:'orange', '&:hover': {backgroundColor:'orange'}}}>
            Continue
          </Button>

        </Box> */}

      </Container>

    </>

  )
}

export default AddFriends;