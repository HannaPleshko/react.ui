import React, { useState } from 'react';
import { Button, Snackbar } from '@mui/material';
import { useAppSelector } from '../../../../../hooks/redux';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {
  BUTTON_TEXTS,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} from '../../../../../utils/constants/resumeConstants';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DownloadButton = () => {
  const resumes = useAppSelector((state) => state.resumeUtils.resumes);
  const id = resumes.at(-1)?.id;
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    openSuccessAlert && setOpenSuccessAlert(false);
    openErrorAlert && setOpenErrorAlert(false);
  };
  const showSuccessAlert = () => {
    setOpenSuccessAlert(true);
  };

  const showErrorAlert = () => {
    setOpenErrorAlert(true);
  };

  const handleSubmit = (e: React.SyntheticEvent | Event) => {
    e.preventDefault();
    id && downloadFile(id);
  };

  const downloadFile = async (id: string) => {
    try {
      const response = await fetch(`api/v1/resume/download?file=${id}`);
      if (response.status === 200) {
        showSuccessAlert();
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', downloadUrl);
        link.download = id;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (error) {
      showErrorAlert();
      console.error(error);
      alert(error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        style={{ display: 'block', textAlign: 'center', margin: '2rem auto' }}
      >
        {BUTTON_TEXTS.download}
      </Button>
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ marginTop: '20%' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {SUCCESS_MESSAGES.successfullyDownloaded}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ marginTop: '20%' }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {ERROR_MESSAGES.resumeNotDownloaded}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DownloadButton;
