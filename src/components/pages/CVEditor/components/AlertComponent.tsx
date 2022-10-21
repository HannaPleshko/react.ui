import React, { FC } from 'react';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import { useAppDispatch } from '../../../../hooks/redux';
import { setServerError } from '../../../../store/reducers/ServiceSlice';

interface IAlertComponentProps {
  message: string;
  severityProp: boolean;
  onSuccess?: {
    setOpenSuccessAlert: (item: boolean) => void;
    openSuccessAlert: boolean;
  };
  onError?: {
    setOpenErrorAlert: (item: boolean) => void;
    openErrorAlert: boolean;
  };
}

const AlertComponent: FC<IAlertComponentProps> = ({
  message,
  severityProp,
  onSuccess,
  onError,
}): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    if (onSuccess) {
      onSuccess.openSuccessAlert && onSuccess.setOpenSuccessAlert(false);
    }
    if (onError) {
      onError.openErrorAlert && onError.setOpenErrorAlert(false);
      dispatch(setServerError(false));
    }
  };

  return (
    <Snackbar
      open={severityProp ? onSuccess?.openSuccessAlert : onError?.openErrorAlert}
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
