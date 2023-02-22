import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Alert, Box,Button, List, Typography, Divider, TextField, IconButton} from '@mui/material';
import Navbar from '../Navbar.jsx';
import FriendEntry from './FriendEntry.jsx';
import Loading from '../Loading.jsx';
import NewFriendDialog from './NewFriendDialog.jsx';
import  { SwipeableList, Type as ListType } from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { useOutletContext } from 'react-router-dom';
//setup initial value of alert
const initAlert = {status:false, severity:'', msg:''};

export default function FriendsPage (props) {
  const { user } = useOutletContext();
  const [friends, setFriends] = useState(null);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState({name:'', phone:'+1'})
  const [alert, setAlert] = useState(initAlert);

  // const user = JSON.parse(localStorage.getItem('user'));

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
    return axios.put('/api/friends', {user_id: user.user_id, friend: cur})
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
    axios.post(`/api/friends/?user_id=${user.user_id}`, {guest_id:id})
      .then((res) => {
        setFriends(friends.concat([temp]));
        handleClose()
        setAlert({status:true, severity:'success', msg:'Add friends Success!'})
      })
  }

  //get friends data from server
  useEffect(() => {
    if (!friends){
      axios.get(`/api/friends?user_id=${user.user_id}`)
        .then(result => {
          setFriends(result.data.friends)
        })
    }
  })
  //close alert after 3s if user has not click the close sign
  useEffect(() => {
   if (alert.status) {
    setTimeout(() => {
      setAlert(initAlert)
    }, 3000)
   }
  },[alert.status])

  return (
    <>
      <Navbar />
      <Box component="div" sx={{pt:1, display: 'flex', justifyContent: "center"}}>
        <Button variant="contained" size="large" color="primary" sx={{m:2, width:'300px'}} onClick={()=> setOpen(true)}>Add a new friend</Button>
      </Box>
      <Box sx={{width:"100%", alignItems: "center", justifyContent: "center"}}>
        <Typography align="center" variant="h5" mt={2} p={4} color="primary">Your Friends List</Typography>
        {alert.status &&
        <Alert severity={alert.severity} onClose={() => setAlert(initAlert)}>{alert.msg}</Alert>
        }
        <Box
         component="div"
         sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor:"#eeeeee",
          m:1,
          borderRadius:2,
          borderColor:'#a6a6a6'
          }}
        >
          {!friends ? <Loading /> : (!friends.length ? (<h2>You do not have any friends yet</h2> )
          : (<SwipeableList
             fullSwipe={true}
             threshold={0.5}
             role="list"
             type={ListType.IOS}
             aria-labelledby="friends-list"
             style={{margin:'0 10px', width:"100%", maxWidth:'600px'}}
            >
            {friends.map((friend, i) =>
              <FriendEntry
               friend={friend}
               key={i}
               i={i}
               deleteOne={deleteOne}
               page="friends"/>
            )}
          </SwipeableList>)
          )}
        </Box>
        {open && <NewFriendDialog open={open} setDialogValue={setDialogValue} dialogValue={dialogValue} handleClose={handleClose} existList={friends} handleSubmit={handleSubmit} page="friends"/>}

      </Box>
    </>

  )
}