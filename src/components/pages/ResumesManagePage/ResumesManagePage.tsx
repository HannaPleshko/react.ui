import React, { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { removeResumeName } from '../../../store/reducers/ResumeUtilsSlice';
import { ApiService } from '../../../utils/Api/ApiService';
import AlertComponent from '../CVEditor/components/AlertComponent';
import {
  SUCCESS_MESSAGES,
  HEADERS,
  BUTTON_TEXTS,
  ERROR_MESSAGES,
} from '../../../utils/constants/resumeConstants';
import { ResumeState } from '../../../store/reducers/ResumeSlice';

const ResumeManagePage = () => {
  const resumes = useAppSelector((state) => state.resumeUtils.resumes);
  const dispatch = useAppDispatch();

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [severityProp, setSeverity] = useState(false);

  const showSuccessAlert = (alertString: string) => {
    setOpenSuccessAlert(true);
    setMessage(alertString);
    setSeverity(true);
  };

  const showErrorAlert = (alertString: string) => {
    setOpenErrorAlert(true);
    setMessage(alertString);
    setSeverity(false);
  };

  const removeResume = (item?: string) => {
    dispatch(removeResumeName(item));
    showSuccessAlert(SUCCESS_MESSAGES.successfullyRemoved);
  };

  const downloadResume = (item?: string) => {
    item && downloadFile(item);
  };

  const downloadFile = async (item: string) => {
    await ApiService.getFileToDownload(item)
      .then((response) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.setAttribute('href', downloadUrl);
        link.download = item;
        document.body.appendChild(link);
        link.click();
        link.remove();
        showSuccessAlert(SUCCESS_MESSAGES.successfullyDownloaded);
      })
      .catch((error) => {
        showErrorAlert(ERROR_MESSAGES.resumeNotDownloaded);
      });
  };

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          width: '100%',
          height: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {HEADERS.resumeList}
      </Typography>
      <Grid container spacing={2}>
        {resumes.map((item: ResumeState) => {
          return (
            <React.Fragment key={item.id}>
              <Grid container item xs={6}>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{
                    display: 'inline',
                    pl: '50px',
                    ml: '16px',
                  }}
                >
                  {item.filename}
                </Typography>
              </Grid>
              <Grid container justifyContent="center" item xs={6}>
                <Button onClick={() => downloadResume(item.id)}>{BUTTON_TEXTS.download}</Button>
                <Button>{BUTTON_TEXTS.editResume}</Button>
                <Button onClick={() => removeResume(item.id)}>{BUTTON_TEXTS.removeResume}</Button>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
      <AlertComponent
        setOpenSuccessAlert={setOpenSuccessAlert}
        setOpenErrorAlert={setOpenErrorAlert}
        setMessage={setMessage}
        setSeverity={setSeverity}
        severityProp={severityProp}
        message={message}
        openSuccessAlert={openSuccessAlert}
        openErrorAlert={openErrorAlert}
      />
    </>
  );
};

export default ResumeManagePage;
