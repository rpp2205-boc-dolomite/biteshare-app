import React, {useState} from 'react';
import axios from 'axios';
import {TextField, Autocomplete, Box, Grid, Container, IconButton, Alert} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { createFilterOptions } from '@mui/material/Autocomplete';
import NewFriendDialog from './NewFriendDialog.jsx';

const filter = createFilterOptions();
const SearchFriends = ({friends, setFriends, existList, setExistList}) => {
  const [friendsList, setFriendsList] = useState([])
  const [value, setValue] = useState(null);
  const [open, toggleOpen] = useState(false);
  const [alert, triggerAlert] = useState(false);
  const [dialogValue, setDialogValue] = useState({name:'', phone:''});
  const [add, setAdd] = useState(true)

  const handleClose = () => {
    setDialogValue({
      name:'',
      phone:'',
    })
    toggleOpen(false);
  }

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

    if (add) {
      let temp = existList.push(value)
      setExistList(temp);
      // send post req to server add the value as new guest user to user collections
      // return axios.put('/friends/:user_id', {name: dialogValue.name, phone_name:dialogValue.phone, is_guest:true, password:null})
      // .then((result) => {
      //   consoe.log(result);
      //   handleClose();
      // })
      handleClose();
    } else {
      handleClose();
    }
    handleClose();
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
          setDialogValue({name: newValue.inputValue, phone: ''})
        })
      } else {
        setTimeout(() => {
          toggleOpen(true);
          setDialogValue({name: '', phone: newValue.inputValue})
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
      <Grid container justifyContent="center" spacing={1}>
        <Grid item>
          <Autocomplete
            value={value}
            onChange={(e, newValue) => handleChange(e, newValue)}
            options={existList}
            freeSolo={true}
            getOptionLabel={(option) => {
              console.log('op', option);
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
      {alert &&  <Alert severity="error" onClose={() => triggerAlert(false)}>You already add this friend to this bill!</Alert>}
      <NewFriendDialog open={open} setDialogValue={setDialogValue} dialogValue={dialogValue} handleClose={handleClose} handleSubmit={handleSubmit} add={add} setAdd={setAdd}/>
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