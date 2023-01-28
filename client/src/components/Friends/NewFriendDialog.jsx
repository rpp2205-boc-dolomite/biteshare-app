import React, {useState} from 'react';
import axios from 'axios';
import {TextField, Button} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { createFilterOptions } from '@mui/material/Autocomplete';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
const NewFriendDialog = ({open, setDialogValue, dialogValue, handleClose, handleSubmit, add, setAdd}) => {
  const toggleLabel = (e) => {
    if (e.target.checked) {
      setAdd(true)
    } else {
      setAdd(false);
    }
  }

  return (
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