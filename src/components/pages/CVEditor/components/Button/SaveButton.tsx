import React, { FC, useState, useEffect } from 'react';
import { Button, Snackbar, Tooltip } from '@mui/material';
import { ApiService } from '../../../../../utils/Api/ApiService';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { resetResumeSlice } from '../../../../../store/reducers/ResumeSlice';
import { resetServiceSlice } from '../../../../../store/reducers/ServiceSlice';
import { validatedFields } from '../../../../../utils/resumeUtils';
import { useAppSelector, useAppDispatch } from '../../../../../hooks/redux';
import {
  CONFIRMATION_MESSAGES,
  ERROR_MESSAGES,
  BUTTON_TEXTS,
  SUCCESS_MESSAGES,
} from '../../../../../utils/constants/resumeConstants';
import { setResumes, resetResumeUtilsSlice } from '../../../../../store/reducers/ResumeUtilsSlice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ISaveButtonProps {
  isSaved: boolean;
}

const SaveButton: FC<ISaveButtonProps> = ({ isSaved }): JSX.Element => {
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const showSuccessAlert = () => {
    setOpenSuccessAlert(true);
  };

  const showErrorAlert = () => {
    setOpenErrorAlert(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    openSuccessAlert && setOpenSuccessAlert(false);
    openErrorAlert && setOpenErrorAlert(false);
  };

  const resume = useAppSelector((state) => state.resume);
  const isValid = validatedFields(resume);
  const dispatch = useAppDispatch();
  const handleSubmit = (e?: React.SyntheticEvent | Event) => {
    e?.preventDefault();
    uploadResume();
  };

  const uploadResume = async () => {
    await ApiService.sendResume({
      ...resume,
    })
      .then((response) => {
        showSuccessAlert();
        downloadAllResumeNames();
        dispatch(resetResumeSlice());
        dispatch(resetResumeUtilsSlice());
        dispatch(resetServiceSlice());
        localStorage.removeItem('persist:root');
        return response.data;
      })
      .catch((error) => {
        showErrorAlert();
        console.error(error);
      });
  };

  useEffect(() => {
    downloadAllResumeNames();
  }, [isSaved]);

  const downloadAllResumeNames = async () => {
    await ApiService.getResume()
      .then((response) => {
        dispatch(setResumes(response));
        return response;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {isValid ? (
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          style={{ display: 'block', textAlign: 'center', margin: '2rem auto' }}
          disabled={!isValid}
        >
          {BUTTON_TEXTS.saveResume}
        </Button>
      ) : (
        <Tooltip title={CONFIRMATION_MESSAGES.confirmFields} followCursor>
          <span>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              style={{ display: 'block', textAlign: 'center', margin: '2rem auto' }}
              disabled={!isValid}
            >
              {BUTTON_TEXTS.saveResume}
            </Button>
          </span>
        </Tooltip>
      )}
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ marginTop: '20%' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {SUCCESS_MESSAGES.successfullySaved}
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
          {ERROR_MESSAGES.resumeNotSaved}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SaveButton;
