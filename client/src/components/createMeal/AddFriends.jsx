import React, {useState} from 'react';
import axios from 'axios';
import {TextField, Box, Container, List, ListItem, ListItemText, IconButton, Button} from '@mui/material';
import SearchFriends from './SearchFriends.jsx';
import FriendEntry from './FriendEntry.jsx';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Navbar from '../Navbar.jsx';
const fakeFriendsList2 = [
  "Anna: 111123123", "Bob: 312456789", "Davie Wang: 44556677"
]
const AddFriends = (props) => {
  const [existList, setExistList] = useState([])
  const [current, setCurrent] = useState({name:'', phone:''});
  const [friends, setFriends] = useState([]);
  const [input, setInput] = useState('');
  console.log('friends', friends);
  if (current.name.length > 0 || current.phone.length > 0) {
    console.log('start add');
    setFriends(friends.concat(current));
    setCurrent({name:'', phone:''});
    setInput('');
  }
  //call the data to get the users exist friends list
  // const getFriends = (id) => {
  //   return axios.get(`/{id}/friendslist`)
  //     .then((result) => {
  //       console.log(result);
  //       //convert the result data to matche the fackfriendsList2 data
  //       let list = result.data.map((friend) => {
  //         return friend.name + ' - ' + friend.phone
  //       })
  //       setExistList(list);
  //     })
  // }
  //if the length of friends list === 0 render You don't have any friends yet add Friends
  // const selectExistsFriend = (e) => {
  //   console.log('select friend',e.target);
  //   if (e.target.innerText.length > 0) {
  //     console.log('select');
  //     let friend = e.target.innerText.split(': ');
  //     console.log(friend);
  //     setFriends(friends.concat([{name:friend[0], phone:friend[1]}]));
  //   }
  // }
  const deleteOne = (i) => {
    console.log(i);
    setFriends(friends.slice(0, i).concat(friends.slice(i+1)))
  };

  const createNewFriend = (e) => {
    console.log('input', input);
    e.preventDefault();
    let phoneNumber = parseInt(input);
    if (!phoneNumber) {
      console.log('no newfriend')
      setCurrent({...current, name: input})
    } else {
      console.log('number !newfriend', phoneNumber);
      setCurrent({...current, phone: input})
    }

  }

  return (
    <>
      <Navbar />
      <Container maxWidth="95%" sx={{p:1, m:1,  width:"92%", justifyContent:"center"}}>
        <SearchFriends friends={friends} setFriends={setFriends} existList={existList} addNewFriend={createNewFriend} setInput={setInput}/>
        <hr/>
        <Box component="span" sx={{dispaly:'block', fontSize:'larger'}}>
          Friends List
        </Box>
        <Box component="div">
          {!friends.length ? (<h2>No friends in this meal yet</h2>)
          : (<List>
            {friends.map((friend, i) =>
              <FriendEntry friend={friend} i={i} deleteOne={deleteOne}/>
            )}
          </List>)
          }
        </Box>
        <Box sx={{justifyContent:"center",textAlign:'center', pt:"20%", m:1}}>
           <Button variant="contained" size="large" sx={{width:'60%', backgroundColor:'orange', '&:hover': {backgroundColor:'orange'}}}>Continue</Button>
        </Box>

      </Container>

    </>

  )
}

export default AddFriends;