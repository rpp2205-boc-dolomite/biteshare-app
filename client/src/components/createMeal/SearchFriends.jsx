import React, {useState} from 'react';
import axios from 'axios';
import {TextField, Autocomplete, Box, Grid, Container, IconButton, Alert} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { createFilterOptions } from '@mui/material/Autocomplete';

import NewFriendDialog from './NewFriendDialog.jsx';
const fakeFriendsList2 = [
  "Anna: 123455677", "Bob: 31234456787", "David backham: 4455677888"
]
const filter = createFilterOptions();
const SearchFriends = ({friends, setFriends, selectExistsFriend, existList, addNewFriend, setInput}) => {
  const [friendsList, setFriendsList] = useState([])
  const [value, setValue] = useState(null);
  const [open, toggleOpen] = useState(false);
  const [alert, triggerAlert] = useState(false);

  const handleClose = () => {
    setDialogValue({
      name:'',
      phone:'',
    })
    toggleOpen(false);
  }

  const [dialogValue, setDialogValue] = useState({name:'', phone:''});
  const addToList = (e) =>{
    console.log('select');
    let friend = value.split(': ');
    let cur = {name:friend[0], phone:friend[1]}
    let isExists = false;
    friends.forEach(friend => {
      if (JSON.stringify(friend) === JSON.stringify(cur)) {
        console.log('exists!@')
        isExists=true;
        triggerAlert(true)
        return;
      }
    })
    if (!isExists) {
      console.log('new added')
      setFriends(friends.concat([{name:friend[0], phone:friend[1]}]));
      setValue(null);
    }

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(dialogValue.name+': ' + dialogValue.phone);
    handleClose();
  }
  console.log('value: ', value)
  const handleChange = (e, newValue) => {
    if (typeof newValue === 'string') {
      setValue(newValue);
    } else if (newValue && newValue.inputValue) {
      console.log('both', newValue, newValue.inputValue);
      toggleOpen(true);
      let phone = parseInt(newValue.inputValue);
      if (!phone) {
        console.log('its a name', newValue);
        setTimeout(() => {
          toggleOpen(true);
          setDialogValue({name: newValue.inputValue, phone: ''})
        })
      } else {
        console.log('its phone', newValue);
        setTimeout(() => {
          toggleOpen(true);
          setDialogValue({name: '', phone: newValue.inputValue})
        })
      }

    } else {
      console.log('else: ', newValue);
      setValue(newValue);
    }
  }
  return (
    // <Container maxWidth="95%" sx={{p:1, m:1,  width:"92%", justifyContent:"center"}}>
    <>

      <Box component="span" sx={{ display:'block', fontSize: 'larger'}}>
         Add Friends:
      </Box>
      <Grid container justifyContent="center" spacing={1}>
        <Grid item>
          <Autocomplete
            value={value}
            onChange={(e, newValue) => handleChange(e, newValue)}
            options={fakeFriendsList2}
            freeSolo={true}
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option;
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
                  name:`Add "${params.inputValue}"`
                })
              }
              return filtered;
            }}
            renderInput={(params) => <TextField  {...params} label="Friends" margin="normal"/>}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            renderOption={(props, option) => <li {...props}>{typeof option === 'string' ? option : option.inputValue}</li>}
          />
        </Grid>
        <Grid item justify="flex-end" alignItems="center" sx={{padding: 2}}>
        <IconButton aria-label="add" size="80" sx={{marginTop: "50%"}} onClick={(e) => addToList(e)}>
          <AddIcon fontSize="large"/>
        </IconButton>
        </Grid>
      </Grid>
      {alert &&  <Alert severity="error" onClose={() => triggerAlert(false)}>You already add this friend to this bill!</Alert>}
      <NewFriendDialog open={open} setDialogValue={setDialogValue} dialogValue={dialogValue} handleClose={handleClose} handleSubmit={handleSubmit}/>
    </>



  )
}

export default SearchFriends;


// --------highlight version -------//
// renderOption={(props, option, { inputValue }) => {
//   const matches = match(option, inputValue, { insideWords:true});
//   const parts = parse(option, matches);
//   console.log('part', parts, matches);
//   return (
//     <Box component="li" {...props} onClick={(e) => {selectExistsFriend(e)}}>
//       <div>
//         {parts.map((part, index) => (
//           <span key={index} style={{fontWeight: part.highlight ? 700:400}} >
//             {part.text}
//           </span>
//         ))}
//       </div>
//     </Box>
//   )
// }}