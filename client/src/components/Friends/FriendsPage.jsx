import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Box, List, Typography, Divider, TextField, IconButton} from '@mui/material';
import Navbar from '../Dashboard/Navbar.jsx';
import FriendEntry from './FriendEntry.jsx';
import Loading from '../Loading.jsx';
import SearchFriendsBar from './SearchFriendsBar.jsx';
export default function FriendsPage (props) {
  const [friends, setFriends] = useState(null);
  const [input, setInput] = useState('');
  const getFriends = () => {
    let id = '63d40a54c9e5268f8d8861e3'
    return axios.get(`/api/friends?user_id=${id}`)
      .then(result => {
        console.log(result.data.friends);
        setFriends(result.data.friends)
      })
  }
  useEffect(() => {
    if (!friends){
      getFriends()
    }
  })
  const deleteOne = (i) => {
    //send to server delete the current friend
    let cur = friends[i];
    return axios.put('/freinds', cur)
      .then(() => {
        setFriends(friends.slice(0, i).concat(friends.slice(i+1)))
      })
  };
  const handleSearch = (e) => {
    e.preventDefault();
    return axios.get('/users', {phone_num: input})
      .then(result => {
        console.log('search phone_num', result);

      })

  }
  return (
    <>
      <Navbar />
      <Box sx={{m:2,  width:"90%", alignItems: "center", justifyContent: "center"}}>
      <Typography align="center" variant="h5" mt={2} p={4}>Your Friends List</Typography>
      <Divider/>
      <Box component="div" sx={{width: "80%", display: "flex", alignItems: "center", justifyContent: "center"}}>
        {!friends ? <Loading /> : (!friends.length ? (<h2>You do not have any friends yet</h2> )
        : (<List >
          {friends.map((friend, i) =>
            <FriendEntry friend={friend} i={i} deleteOne={deleteOne} page="friends"/>
          )}
        </List>)
        )}
      </Box>
      <Divider><Typography>Add friends</Typography></Divider>
      <Box component="div" sx={{pt:2, display: "grid", justifyItems: "center", justifyContent: "center"}}>
        <SearchFriendsBar input={input} setInput={setInput} clicked={handleSearch}/>
      </Box>


      </Box>

    </>

  )
}