import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { forwardRef, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setServerError } from '../../../store/reducers/ServiceSlice';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertBar() {
  const dispatch = useAppDispatch();
  const isServerError = useAppSelector((state) => state.service.serverError);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isServerError) {
      setOpen(true);
    }
  }, [isServerError]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    dispatch(setServerError(false));
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={6100}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error">
        Server error occurred !
      </Alert>
    </Snackbar>
  );
}
