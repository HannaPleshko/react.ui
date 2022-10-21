import { useState, useEffect, FC } from 'react';
import { Tooltip } from '@mui/material';
import {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  DOC_TYPE,
  BUTTON_TEXTS,
} from '../../../../../utils/constants/resumeConstants';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import { LoadingButton } from '@mui/lab';
import { useDownloadResumeQuery } from '../../../../../store/api/ResumeApi';
import AlertComponent from '../AlertComponent';

interface IDownloadButton {
  resume_id: string;
  disabled?: boolean;
}
const DownloadButton: FC<IDownloadButton> = ({ resume_id, disabled = false }) => {
  const [skipRTK, setSkipRTK] = useState(true);
  const [type, setType] = useState(DOC_TYPE.DOC);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [severityProp, setSeverity] = useState(false);

  const { isLoading, isFetching, isError, isSuccess } = useDownloadResumeQuery(
    { resume_id, docType: type },
    { skip: skipRTK }
  );

  useEffect(() => {
    if (!isFetching) {
      setSkipRTK(true);
    }
    if (isError) {
      setOpenErrorAlert(true);
      setSeverity(false);
      setMessage(ERROR_MESSAGES.resumeNotDownloaded);
    }
    if (isSuccess) {
      setOpenSuccessAlert(true);
      setSeverity(true);
      setMessage(SUCCESS_MESSAGES.successfullyDownloaded);
    }
  }, [isError, isFetching, isSuccess]);

  const downloadFile = async (id: string, docType: string) => {
    setType(docType);
    setSkipRTK(false);
  };

  return (
    <>
      <Tooltip title={BUTTON_TEXTS.downloadPDF} followCursor>
        <span>
          <LoadingButton
            disabled={disabled ? disabled : isLoading && type === DOC_TYPE.DOC}
            loading={isLoading && type === DOC_TYPE.PDF}
            loadingPosition="start"
            startIcon={<PictureAsPdfIcon />}
            onClick={() => downloadFile(resume_id, DOC_TYPE.PDF)}
          ></LoadingButton>
        </span>
      </Tooltip>
      <Tooltip title={BUTTON_TEXTS.downloadDOC} followCursor>
        <span>
          <LoadingButton
            disabled={disabled ? disabled : isLoading && type === DOC_TYPE.PDF}
            loading={isLoading && type === DOC_TYPE.DOC}
            loadingPosition="start"
            startIcon={<DescriptionIcon />}
            onClick={() => downloadFile(resume_id, DOC_TYPE.DOC)}
          ></LoadingButton>
        </span>
      </Tooltip>

      <AlertComponent
        severityProp={severityProp}
        message={message}
        onError={{ openErrorAlert, setOpenErrorAlert }}
        onSuccess={{ openSuccessAlert, setOpenSuccessAlert }}
      />
    </>
  );
};

export default DownloadButton;
