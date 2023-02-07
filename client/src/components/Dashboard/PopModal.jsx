import React, {useState} from 'react';
import axios from 'axios';
import {TextField, Modal, Button, Alert, Drawer, SwipeableDrawer, Typography, Skeleton, Box} from '@mui/material';
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
const PopModal = ({open, handleClose, comments}) => {
  const [alert, setAlert] = useState(initAlert);
  console.log('comL:', comments);
  return (

    <Drawer
      anchor="bottom"
      open={open}
      onClose={handleClose}
      sx={{"& .MuiPaper-root": {height: '60%', alignItems:'center', borderTopLeftRadius:15, borderTopRightRadius:15}}}
    >
      <Puller />
        <Box sx={{px: 2,pb: 2,height: '100%', width:'80%', bgcolor:'#f5f5f5'}}>
          {!comments.length ? <h6>No Comment Yet</h6> :

            <list>
              {comments.map((com, index) => {
                console.log('inside com":', com);
                return <li key={index}>{com.text}</li>
              })}

            </list>
         }
      </Box>
    </Drawer>


  )
}

export default PopModal;