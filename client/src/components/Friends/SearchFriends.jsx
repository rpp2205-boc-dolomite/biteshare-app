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
  console.log('search friends:', inputs)
  const handleClose = () => {
    setDialogValue({
      name:'',
      phone:'+1',
    })
    setAdd(true);
    toggleOpen(false);
  }

  const addToList = (e) =>{
    let friend = value.split(': ');
    let cur = {name:friend[0], phone_num:friend[1]}
    let isExists = false;
    friends.forEach(friend => {
      if (JSON.stringify(friend) === JSON.stringify(cur)) {
        console.log('exists!@')
        isExists=true;
        triggerAlert({status:true, severity:'error', msg:'You already added this friends to this bill!'})
        return;
      }
    })
    if (!isExists) {
      console.log('new added')
      setFriends(friends.concat([{name:friend[0], phone_num:friend[1]}]));
      //this line if for step components
      setInputs({...inputs, friends: friends.concat([{name:friend[0], phone_num:friend[1]}])})
      setValue(null);
    }
  }

  const handleSubmit = (guest_id, name) => {
    //console.log('submit id', guest_id, name, dialogValue);
    if (name) {
      setDialogValue({...dialogValue, name: name})
    }
    let temp = (!name ? dialogValue.name : name) +': ' + dialogValue.phone
    setValue(temp);
    console.log('temp', temp);
    //if chose add to friends list
    if (add) {
      axios.post(`/api/friends/?user_id=${id}`,{guest_id: guest_id})
        .then((add) => {
          setExistList(existList.concat([temp]));
          triggerAlert({status:true, severity:'success', msg:'Add friends Success!'})
          handleClose()
        })
    } else {
      handleClose();
    }
  }


  const handleChange = (e, newValue) => {
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
      setValue(newValue);
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
                  name:`Add "${params.inputValue}" to this bill?`
                })
              }
              return filtered;
            }}
            renderInput={(params) => <TextField  {...params} label="Friends" margin="normal"/>}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            renderOption={(props, option) => <li {...props}>{typeof option === 'string' ? option : option.name}</li>}
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