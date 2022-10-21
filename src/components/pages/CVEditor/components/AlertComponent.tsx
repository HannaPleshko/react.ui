import React, { FC } from 'react';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

interface IAlertComponentProps {
  message?: string;
  severityProp?: boolean;
  setOpenSuccessAlert: (item: boolean) => void;
  setOpenErrorAlert: (item: boolean) => void;
  setMessage: (item: string) => void;
  setSeverity: (item: boolean) => void;
  openSuccessAlert: boolean;
  openErrorAlert: boolean;
}

const AlertComponent: FC<IAlertComponentProps> = ({
  message,
  severityProp,
  setOpenSuccessAlert,
  setOpenErrorAlert,
  openSuccessAlert,
  openErrorAlert,
}): JSX.Element => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    openSuccessAlert && setOpenSuccessAlert(false);
    openErrorAlert && setOpenErrorAlert(false);
  };

  return (
    <Snackbar
      open={severityProp ? openSuccessAlert : openErrorAlert}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ marginTop: '20%' }}
    >
      <Alert
        onClose={handleClose}
        severity={severityProp ? 'success' : 'error'}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;
