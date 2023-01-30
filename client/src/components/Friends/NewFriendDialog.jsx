import React, {useState} from 'react';
import axios from 'axios';
import {TextField, Button, Alert} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { createFilterOptions } from '@mui/material/Autocomplete';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
const initAlert = {status:false, severity:'warn', msg:'This phone number already in your friends list!'};
const NewFriendDialog = ({open, setDialogValue, dialogValue, handleClose, handleSubmit, add, setAdd, existList}) => {
  const [alert, setAlert] = useState(initAlert)
  const toggleLabel = (e) => {
    if (e.target.checked) {
      setAdd(true)
    } else {
      setAdd(false);
    }
  }
  const submit = (e) => {

    e.preventDefault();

    let isExistPhone = false;
    existList.forEach(person => {
      let phone = person.split(': ')[1]
      if (phone === dialogValue.phone){
        console.log('number duplicate')
        isExistPhone = true;
        setAlert({status: true, severity:"warning", msg: 'This number already in your friends list'})
        return;
      }
    })
    if(!isExistPhone) {
      handleSubmit();
    }
    // if (!isExistPhone) {
    //   setValue(temp);
    //   let newUser = {name: dialogValue.name, phone_num:dialogValue.phone, is_guest:true}

    //   if (add) {
    //     //check the friend has account or not
    //     axios.get(`/api/users?phone_num=${newUser.phone_num}`)
    //     .then(result => {
    //       //if the new friend's phone num exist use the database name and add to friends
    //       if (result.data) {
    //         console.log('new friend exists', result.data, newUser.name);
    //         newUser.name = result.data.name;
    //         setDialogValue({...dialogValue, name: result.data.name});
    //         // if (result.data.name !== newUser.name) {
    //         //   console.log('different name', result.data.name, newUser.name)
    //         //   //alert('Will convert name to '+result.data.name);
    //         //   newUser.name = result.data.name;
    //         //   setDialogValue({...dialogValue, name: result.data.name})
    //         //   triggerAlert({status:true, severity:'info', msg:'Will convert name to exist name'});

    //         // }
    //         return axios.post(`/api/friends/?user_id=${id}`,{guest_id: result.data.id} )
    //       } else {
    //         return axios.post('/api/users', newUser)
    //       }
    //     })
    //     .then((res) => {
    //       console.log('new',typeof res.data, res.data)
    //       if (typeof res.data === 'object') {
    //         return axios.post(`/api/friends/?user_id=${id}`,{guest_id: res.data.id} )
    //       }
    //     })
    //     .then(() => {
    //       setExistList(existList.concat([temp]));
    //       triggerAlert({status:true, severity:'success', msg:'Add friends Success!'})
    //       handleClose()
    //     })
    //   } else {
    //     axios.get(`/api/users?phone_num=${newUser.phone_num}`)
    //     .then(result => {
    //       //if the new friend's phone num exist use the database name and add to friends
    //       if (!result.data) {
    //         return axios.post('/api/users', newUser)
    //       }
    //     })
    //     handleClose()
    //   }
    // }
  }
  return (


    <Dialog open={open} onClose={handleClose}>
    {alert.status &&
      <Alert severity={alert.severity} onClose={() => setAlert(initAlert)}>{alert.msg}</Alert>
    }
      <form onSubmit={submit}>
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
            inputProps={{fontSize:'50px'}}
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
          <FormGroup>
            <FormControlLabel control={<Switch defaultChecked onChange={toggleLabel}/>} label={add ? 'Add to my friends list' : 'Do not add to my friends list'} />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>

  )
}

export default NewFriendDialog;