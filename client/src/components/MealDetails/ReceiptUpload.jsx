import * as React from 'react';
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import {
  Button
} from '@mui/material';

// Get production API keys from Upload.io
const uploader = Uploader({
  apiKey: "free"
});

// Customize the file upload UI (see "customization"):
const options = { multi: false }

// Render the file upload button:
const ReceiptUpload = ({ setReceipt }) =>
  <UploadButton uploader={uploader}         // Required.
    options={options}           // Optional.
    onComplete={files => {      // Optional.
      if (files.length !== 0) {
        setReceipt(files[0]);
      }
    }}>
    {({ onClick }) =>
      <Button onClick={onClick}>
        Upload a file...
      </Button>
    }
  </UploadButton>


export default ReceiptUpload;