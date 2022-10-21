import React, { FC, useState, useEffect } from 'react';
import { Tooltip } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { validatedFields } from '../../../../../utils/resumeUtils';
import { useAppSelector } from '../../../../../hooks/redux';
import {
  CONFIRMATION_MESSAGES,
  ERROR_MESSAGES,
  BUTTON_TEXTS,
  SUCCESS_MESSAGES,
} from '../../../../../utils/constants/resumeConstants';
import { useAddResumeMutation } from '../../../../../store/api/ResumeApi';
import SaveIcon from '@mui/icons-material/Save';
import DownloadButton from './DownloadButton';
import AlertComponent from '../AlertComponent';

const SaveButton: FC = (): JSX.Element => {
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [addResume, { isLoading, data: serverData, isSuccess }] = useAddResumeMutation();
  const [resume_id, setResumeId] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [severityProp, setSeverity] = useState(false);

  const showSuccessAlert = () => {
    setOpenSuccessAlert(true);
    setMessage(SUCCESS_MESSAGES.successfullySaved);
  };

  const showErrorAlert = () => {
    setOpenErrorAlert(true);
    setMessage(ERROR_MESSAGES.resumeNotSaved);
  };

  const resume = useAppSelector((state) => state.resume);
  const isValid = validatedFields(resume);
  const handleSubmit = (e?: React.SyntheticEvent | Event) => {
    e?.preventDefault();
    uploadResume();
  };

  useEffect(() => {
    if (isSuccess) {
      setResumeId(serverData);
      setDisabled(false);
    }
  }, [disabled, isLoading, isSuccess, serverData]);

  const uploadResume = async () => {
    await addResume(resume)
      .unwrap()
      .then(() => {
        showSuccessAlert();
        setSeverity(true);
      })
      .catch((error) => {
        showErrorAlert();
        setSeverity(false);
        console.error(error);
      });
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {isValid ? (
          <LoadingButton
            style={{
              margin: '2rem  2rem  2rem 2rem ',
            }}
            size="large"
            onClick={handleSubmit}
            loading={isLoading}
            startIcon={<SaveIcon />}
            loadingPosition="start"
            variant="contained"
            disabled={!isValid}
          >
            {BUTTON_TEXTS.saveResume}
          </LoadingButton>
        ) : (
          <Tooltip title={CONFIRMATION_MESSAGES.confirmFields} followCursor>
            <span>
              <LoadingButton
                style={{ margin: '2rem auto' }}
                size="large"
                onClick={handleSubmit}
                loading={isLoading}
                startIcon={<SaveIcon />}
                loadingPosition="start"
                variant="contained"
                disabled={!isValid}
              >
                {BUTTON_TEXTS.saveResume}
              </LoadingButton>
            </span>
          </Tooltip>
        )}
        <DownloadButton disabled={disabled} resume_id={resume_id} />
      </div>
      <AlertComponent
        severityProp={severityProp}
        message={message}
        onError={{ openErrorAlert, setOpenErrorAlert }}
        onSuccess={{ openSuccessAlert, setOpenSuccessAlert }}
      />
    </>
  );
};

export default SaveButton;
