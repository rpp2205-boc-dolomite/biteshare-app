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
      axios.get(`/api/users?phone_num=${dialogValue.phone}`)
        .then(result => {
          if(result.data && result.data.name !== dialogValue.name) {
            console.log('exist frined', result.data, dialogValue.name);
            setDialogValue({...dialogValue, name:result.data.name});
            setAlert({status: true, severity:"info", msg: `Friends name will be replace to ${result.data.name}`})
            setTimeout(() => {
              setAlert(initAlert);
              console.log('value passed: ', result.data)
              handleSubmit(result.data.id, result.data.name);
            },2000)
            return null;
          } else if (!result.data) {
            //add the new friend to user collection
            let newUser = {name: dialogValue.name, phone_num: dialogValue.phone, is_guest: true}
            return axios.post('/api/users', newUser)
          }
        })
        .then((res) => {
          if (res) {
            console.log('res:', res.data);
            let params = typeof res === 'object' ? res.data.id : res.data[0].id
            handleSubmit(params)
          }
        })

    }
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