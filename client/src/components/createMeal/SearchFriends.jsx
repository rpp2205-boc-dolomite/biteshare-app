import React, {useState} from 'react';
import axios from 'axios';
import {TextField, Autocomplete, Box, Grid, Container, IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const fakeFriendsList2 = [
  "Anna: 123455677", "Bob: 31234456787", "David backham: 4455677888"
]

const SearchFriends = ({friends, setFriends, selectExistsFriend, existList, addNewFriend, setInput}) => {
  const [friendsList, setFriendsList] = useState([])

  return (
    // <Container maxWidth="95%" sx={{p:1, m:1,  width:"92%", justifyContent:"center"}}>
    <>
      <Box component="span" sx={{ display:'block', fontSize: 'larger'}}>
         Add Friends:
      </Box>
      <Grid container justifyContent="center" spacing={1}>
        <Grid item>
          <Autocomplete
            options={fakeFriendsList2}
            freeSolo={true}
            getOptionLabel={(option) => option}
            onChange={(e) => selectExistsFriend(e)}
            onInputChange={(e, newInputVal)=> setInput(newInputVal)}
            sx={{width:400}}
            renderInput={(params) => <TextField  {...params} label="Friends" margin="normal"/>}
            renderOption={(props, option, { inputValue }) => {
              const matches = match(option, inputValue, { insideWords:true});
              const parts = parse(option, matches);
              return (
                <Box component="li" {...props}>
                  <div>
                    {parts.map((part, index) => (
                      <span key={index} style={{fontWeight: part.highlight ? 700:400}}>
                        {part.text}
                      </span>
                    ))}
                  </div>
                </Box>
              )
            }}
          />
        </Grid>
        <Grid item justify="flex-end" alignItems="center" sx={{padding: 2}}>
        <IconButton aria-label="add" size="80" sx={{marginTop: "50%"}} onClick={(e) => addNewFriend(e)}>
          <AddIcon fontSize="large"/>
        </IconButton>
        </Grid>
      </Grid>
    </>



  )
}

export default SearchFriends;