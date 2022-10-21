import React, { useEffect, useState } from 'react';
import { Button, Grid, LinearProgress, Typography } from '@mui/material';
import { useAppDispatch } from '../../../hooks/redux';
import { setResumes } from '../../../store/reducers/ResumeUtilsSlice';
import AlertComponent from '../CVEditor/components/AlertComponent';
import {
  SUCCESS_MESSAGES,
  HEADERS,
  BUTTON_TEXTS,
  ERROR_MESSAGES,
} from '../../../utils/constants/resumeConstants';
import { ResumeState } from '../../../store/reducers/ResumeSlice';
import { useGetAllResumeQuery, useRemoveResumeMutation } from '../../../store/api/ResumeApi';
import DownloadButton from '../CVEditor/components/Button/DownloadButton';

const ResumeManagePage = () => {
  const dispatch = useAppDispatch();

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [severityProp, setSeverity] = useState(false);
  const { data: resumes = [], isLoading, isError, isSuccess } = useGetAllResumeQuery();
  const [deleteResume] = useRemoveResumeMutation();

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

  useEffect(() => {
    if (isError) {
      showErrorAlert(ERROR_MESSAGES.serverError);
    }
    if (isSuccess) {
      dispatch(setResumes(resumes));
    }
  }, [isLoading]);

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
      {!isLoading ? (
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
                  <DownloadButton resume_id={item.id ?? ''} />
                  <Button>{BUTTON_TEXTS.editResume}</Button>
                  <Button onClick={() => deleteResume({ id: item.id })}>
                    {BUTTON_TEXTS.removeResume}
                  </Button>
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      ) : (
        <LinearProgress />
      )}
      <AlertComponent
        severityProp={severityProp}
        message={message}
        onError={{ openErrorAlert, setOpenErrorAlert }}
        onSuccess={{ openSuccessAlert, setOpenSuccessAlert }}
      />
    </>
  );
};

export default ResumeManagePage;
