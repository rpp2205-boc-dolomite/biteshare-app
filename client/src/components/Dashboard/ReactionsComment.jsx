import React, { useState, useEffect } from 'react';
import {Button, Box, Typography, Stack, List, ListItem, ListItemButton} from '@mui/material';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const ReactionsComment = ({}) => {


  return (
    <Box>
      <div className="reactions">
        <Picker
          data={data}
          onEmojiSelect={console.log}
          showPreview={false}
          showSkinTones={false}

          />
      </div>
    </Box>
  )
}


export default ReactionsComment;