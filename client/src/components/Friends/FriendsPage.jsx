import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Alert, Box,Button, List, Typography, Divider, TextField, IconButton} from '@mui/material';
import Navbar from '../Dashboard/Navbar.jsx';
import FriendEntry from './FriendEntry.jsx';
import Loading from '../Loading.jsx';
import NewFriendDialog from './NewFriendDialog.jsx';

const initAlert = {status:false, severity:'', msg:''};
export default function FriendsPage (props) {
  const [friends, setFriends] = useState(null);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState({name:'', phone:'+1'})
  const [alert, setAlert] = useState(initAlert);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!friends){
      axios.get(`/api/friends?user_id=${user.id}`)
        .then(result => {
          setFriends(result.data.friends)
        })
    }
  })

  const handleClose = () => {
    setDialogValue({
      name:'',
      phone:'+1',
    })
    setOpen(false);
  }

  const deleteOne = (i) => {
    //send to server delete the current friend
    let cur = friends[i];
    return axios.put('/api/friends', {user_id: user.id, friend: cur})
      .then(() => {
        setAlert({status:true, severity:"success", msg:"Friends removed!"})
        setTimeout(() => {
          setAlert(initAlert);
        }, 2500)
        setFriends(friends.slice(0, i).concat(friends.slice(i+1)))
      })
  };

  const handleSubmit = (id, name) => {
    //console.log('friends page params: ', id, name);
    let tempName = !name ? dialogValue.name : name
    let temp = {name: tempName, phone_num: dialogValue.phone}
    axios.post(`/api/friends/?user_id=${user.id}`, {guest_id:id})
      .then((res) => {
        console.log('friends page res:', res.data);
        setFriends(friends.concat([temp]));
        handleClose()
        setAlert({status:true, severity:'success', msg:'Add friends Success!'})
      })
  }

  return (
    <>
      <Navbar />
      {alert.status &&
        <Alert severity={alert.severity} onClose={() => setAlert(initAlert)}>{alert.msg}</Alert>
      }
      <Box component="div" sx={{pt:1, display: 'flex', justifyContent: "center"}}>
        <Button variant="contained" size="large" color="primary" sx={{m:2, width:'300px'}} onClick={()=> setOpen(true)}>Add a new friend</Button>
      </Box>
      <Box sx={{width:"100%", alignItems: "center", justifyContent: "center"}}>

        <Typography align="center" variant="h5" mt={2} p={4} color="primary">Your Friends List</Typography>
        <Divider/>
        <Box component="div" sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          {!friends ? <Loading /> : (!friends.length ? (<h2>You do not have any friends yet</h2> )
          : (<List role="list" aria-labelledby="friends-list" sx={{width:"80%", mr:'9%'}}>
            {friends.map((friend, i) =>
              <FriendEntry friend={friend} i={i} deleteOne={deleteOne} page="friends"/>
            )}
          </List>)
          )}
        </Box>
        {open && <NewFriendDialog open={open} setDialogValue={setDialogValue} dialogValue={dialogValue} handleClose={handleClose} existList={friends} handleSubmit={handleSubmit} page="friends"/>}

      </Box>
    </>

  )
}