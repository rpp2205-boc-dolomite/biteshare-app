import React, {useState} from 'react';
import axios from 'axios';
import {TextField, Button, Alert, Drawer, SwipeableDrawer, Typography, Skeleton, Box} from '@mui/material';
import {FormGroup, FormControl, FormControlLabel, InputLabel, OutlinedInput, FormHelperText} from '@mui/material';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: '#e0e0e0',
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));


const initAlert = {status:false, severity:'', msg:''};
const NewFriendDialog = ({open, setDialogValue, dialogValue, handleClose, handleSubmit, add, setAdd, existList, page}) => {
  const [alert, setAlert] = useState(initAlert);
  const [error, setError] = useState(false);
  const [noName, setNoName] = useState(false);
  const toggleLabel = (e) => {
    if (e.target.checked) {
      setAdd(true)
    } else {
      setAdd(false);
    }
  }
  let errOrNot = false;
  const submit = (e) => {
    e.preventDefault();
    let validPhone = dialogValue.phone.match(/^\+1[0-9]{10}$/g);
    if (!validPhone) {
      setError(true)
      return;
    } else if (!dialogValue.name.length) {
      setNoName(true);
      return;
    }
    let isExistPhone = false;
    existList.forEach(person => {
      // let phone = page === 'meal' ? person.split(': ')[1] : person.phone_num;
      let phone = person.phone_num
      if (phone === dialogValue.phone){
        console.log('number duplicate')
        isExistPhone = true;
        setAlert({status: true, severity:"warning", msg: 'This number already in your friends list'})
        return;
      }
    })

    if(!isExistPhone) {
      console.log('phone: ', dialogValue.phone)
      axios.get(`/api/users?phone_num=${dialogValue.phone}`)
        .then(result => {
          if(result.data && result.data.name !== dialogValue.name) {
            //console.log('exist frined', result.data, dialogValue.name);
            setDialogValue({...dialogValue, name:result.data.name});
            setAlert({status: true, severity:"info", msg: `Friends name will be replace to ${result.data.name}`})
            setTimeout(() => {
              setAlert(initAlert);
              console.log('value passed: ', result.data)
              handleSubmit(result.data.id, result.data.name);
            }, 2500)
            return null;
          } else if (result.data && result.data.name === dialogValue.name) {
            handleSubmit(result.data.id, result.data.name);
            return null;
          } else if (!result.data) {
            //add the new friend to user collection
            let newUser = {name: dialogValue.name, phone_num: dialogValue.phone, is_guest: true}
            return axios.post('/api/users', newUser)
          }
        })
        .then((res) => {
          if (res) {
            let params = Array.isArray(res.data) ? res.data[0].id : res.data.id;
            console.log('params:', params);
            handleSubmit(params)
          }
        })
    }
  }
  return (

    <Drawer
      anchor="bottom"
      open={open}
      onClose={handleClose}
      sx={{"& .MuiPaper-root": {height: '60%', alignItems:'center', borderTopLeftRadius:15, borderTopRightRadius:15}}}
      >
      {alert.status &&
        <Alert severity={alert.severity} onClose={() => setAlert(initAlert)} sx={{maxHeight:"8%", width:"95%"}}>{alert.msg}</Alert>
      }

          <Puller />
          <Typography sx={{ p: 4, color: 'text.secondary' }} variant='h5'>Add a new friend</Typography>

          <Box sx={{px: 2,pb: 2,height: '100%', width:'80%', bgcolor:'#f5f5f5'}}>

            <form onSubmit={submit} style={{width:'100%', display:'flex', alignItems:'center',flexDirection: 'column', bgcolor:'grey'}}>
              {/* <Typography variant="h5" sx={{p:1, mt:2}}>A New Friend? Just add to your bill!</Typography> */}
              <Typography variant="subtitle1"  sx={{p:1}}>{page==='meal' ? 'Invite a new friend to this bill' : 'Friends not in the list? Add a new friend'}</Typography>
              <FormControl sx={{ m: 1, width: '80%'}} variant="outlined">
                <InputLabel>Name</InputLabel>
                <OutlinedInput
                  type='text'
                  label="Name"
                  error={noName}
                  value={dialogValue.name}
                  onChange={(event) =>
                    setDialogValue({
                      ...dialogValue,
                      name: event.target.value,
                    })
                  }
                />
              </FormControl>
              <FormHelperText>{noName ? "Name required" : ''}</FormHelperText>

              <FormControl sx={{ m: 1, width: '80%'}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Phone Number</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type='text'
                  label="Phone"
                  value={dialogValue.name}
                  onChange={(event) =>
                    setDialogValue({
                      ...dialogValue,
                      name: event.target.value,
                    })
                  }
                  error={error}
                  value={dialogValue.phone}
                  onChange={(event) =>
                    setDialogValue({
                      ...dialogValue,
                      phone: event.target.value,
                    })
                  }
                  label="phone"
                />
                <FormHelperText>{error ? "Invalid phone number" : ''}</FormHelperText>
              </FormControl>

              {page === "meal" &&
              <FormGroup>
                <FormControlLabel control={<Switch defaultChecked onChange={toggleLabel}/>} label={add ? 'Add to my friends list' : 'Do not add to my friends list'} />
              </FormGroup>
              }
              <FormGroup sx={{display:'block',
                mt:'2%',
              '& .MuiButton-root':{m:1, minWidth:'120px'}}}>
                <Button variant="contained" size="large" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" size="large" sx={{bgcolor:'orange'}}type="submit">Add</Button>
              </FormGroup>
            </form>

      </Box>

    </Drawer>


  )
}

export default NewFriendDialog;