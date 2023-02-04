import React, {useState} from 'react';
import axios from 'axios';
import {TextField, Autocomplete, Box, Grid, Container, IconButton, Alert} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { createFilterOptions } from '@mui/material/Autocomplete';
import NewFriendDialog from './NewFriendDialog.jsx';

const filter = createFilterOptions();
const SearchFriends = ({inputs, setInputs, id, friends, setFriends, existList, setExistList}) => {
  const [friendsList, setFriendsList] = useState([])
  const [value, setValue] = useState(null);
  const [open, toggleOpen] = useState(false);
  const [alert, triggerAlert] = useState({status: false, severity:'', msg: ''});
  const [dialogValue, setDialogValue] = useState({name:'', phone:'+1'});
  const [add, setAdd] = useState(true)
  //console.log('search friends:', inputs)
  const handleClose = () => {
    setDialogValue({
      name:'',
      phone:'+1',
    })
    setAdd(true);
    toggleOpen(false);
  }

  const addToList = (e) =>{
    let isExists = false;
    friends.forEach(friend => {
      if (friend.name === value.name && friend.phone_num === value.phone_num) {
        console.log('exists!@')
        isExists=true;
        triggerAlert({status:true, severity:'error', msg:'You already added this friends to this bill!'})
        return;
      }
    })
    if (!isExists) {
      console.log('new added')
      setFriends(friends.concat([value]));
      //this line if for step components
      setInputs({...inputs, friends: friends.concat([value])})
      setValue(null);
    }
  }

  const handleSubmit = (guest_id, name) => {
    //console.log('submit id', guest_id, name, dialogValue);
    if (name) {
      setDialogValue({...dialogValue, name: name})
    }
    let tempName = !name ? dialogValue.name : name;
    let currentOne = (!name ? dialogValue.name : name) +': ' + dialogValue.phone;
    setValue(currentOne);
    //if chose add to friends list
    if (add) {
      axios.post(`/api/friends/?user_id=${id}`,{guest_id: guest_id})
        .then((add) => {
          let cur = {id: guest_id, name:name, phone_num:dialogValue.phone}
          setExistList(existList.concat([cur]));
          triggerAlert({status:true, severity:'success', msg:'Add friends Success!'})
          handleClose()
        })
    } else {
      handleClose();
    }
  }


  const handleChange = (e, newValue) => {
    //console.log('newValue in change func', newValue);
    if (typeof newValue === 'string') {
      setValue(newValue);
    } else if (newValue && newValue.inputValue) {
      toggleOpen(true);
      let phone = parseInt(newValue.inputValue);
      if (!phone) {
        setTimeout(() => {
          toggleOpen(true);
          setDialogValue({name: newValue.inputValue, phone: '+1'})
        })
      } else {
        setTimeout(() => {
          toggleOpen(true);
          setDialogValue({name: '', phone: '+1'+newValue.inputValue})
        })
      }
    } else {
      setValue({id: newValue.id, name: newValue.name, phone_num: newValue.phone_num});
    }
  }

  return (
    <>
      <Box component="span" sx={{ display:'block', fontSize: 'larger'}}>
         Add Friends:
      </Box>
      {alert.status &&  <Alert severity={alert.severity} onClose={() => triggerAlert(false)}>{alert.msg}</Alert>}
      <Grid container justifyContent="center" spacing={1} sx={{alignItems:"center"}}>
        <Grid item>
          <Autocomplete
            value={value}
            onChange={(e, newValue) => handleChange(e, newValue)}
            options={existList}
            freeSolo={true}
            getOptionLabel={(option) => {
              if (typeof option === 'object') {
                return option.name + ': ' + option.phone_num;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option;
            }}
            sx={{width:400}}
            filterOptions={(options,params) => {
              const filtered = filter(options, params);
              if (params.inputValue !=='') {
                filtered.push({
                  inputValue: params.inputValue,
                  name:`Add "${params.inputValue}" to this bill?`,
                  phone_num:null
                })
              }
              return filtered;
            }}
            renderInput={(params) => <TextField  {...params} label="Friends" margin="normal"/>}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            renderOption={(props, option) => <li {...props}>{!option.phone_num ? option.name : option.name + ': ' + option.phone_num}</li>}
          />
        </Grid>
        <Grid item justify="flex-end" alignItems="center" sx={{padding: 2}}>
        <IconButton aria-label="add" size="80" sx={{marginTop: "50%"}} onClick={(e) => addToList(e)}>
          <AddIcon fontSize="large"/>
        </IconButton>
        </Grid>
      </Grid>
      <NewFriendDialog open={open} setDialogValue={setDialogValue} dialogValue={dialogValue} handleClose={handleClose} handleSubmit={handleSubmit} add={add} setAdd={setAdd} existList={existList} page="meal"/>
    </>

  )
}

export default SearchFriends;