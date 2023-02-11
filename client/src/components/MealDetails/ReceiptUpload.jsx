import * as React from 'react';
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import {
  Button
} from '@mui/material';

// Get production API keys from Upload.io
const uploader = Uploader({
  apiKey: "public_12a1xxV2euTmG6SK7JjEFv2xc1nc"
});

// Customize the file upload UI (see "customization"):
const options = {
  multi: false,
  maxFileCount: 1,
  mimeTypes: [
    "image/jpeg",
    "image/heif",
    "image/heic",
    "image/png"
  ]
}

// Render the file upload button:
const ReceiptUpload = ({ setReceipt }) =>
  <UploadButton uploader={uploader}         // Required.
    options={options}           // Optional.
    onComplete={files => {      // Optional.
      if (files.length !== 0) {
        setReceipt(files[0].fileUrl);
      }
    }}>
    {({ onClick }) =>
      <Button onClick={onClick}>
        Upload receipt...
      </Button>
    }
  </UploadButton>


export default ReceiptUpload;