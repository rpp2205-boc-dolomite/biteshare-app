import React, {useState} from 'react';
import axios from 'axios';
import {TextField, Autocomplete, Box, Grid, Container, IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import parse from 'autosuggest-highlight/parse';
// import match from 'autosuggest-highlight/match';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { createFilterOptions } from '@mui/material/Autocomplete';
const fakeFriendsList2 = [
  "Anna: 123455677", "Bob: 31234456787", "David backham: 4455677888"
]
const filter = createFilterOptions();
const SearchFriends = ({friends, setFriends, selectExistsFriend, existList, addNewFriend, setInput}) => {
  const [friendsList, setFriendsList] = useState([])
  const [value, setValue] = useState(null);
  const [open, toggleOpen] = useState(false);

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
    console.log(friend);
    setFriends(friends.concat([{name:friend[0], phone:friend[1]}]));
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

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new friend to share your bill</DialogTitle>
          <DialogContent>
            <DialogContentText>
              New Friend? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  name: event.target.value,
                })
              }
              label="name"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              value={dialogValue.phone}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  phone: event.target.value,
                })
              }
              label="phone"
              type="tel"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
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