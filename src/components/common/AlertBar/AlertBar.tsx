import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { ERROR_MESSAGES } from '../../../utils/constants/resumeConstants';
import AlertComponent from '../../pages/CVEditor/components/AlertComponent';

export default function AlertBar() {
  const isServerError = useAppSelector((state) => state.service.serverError);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  useEffect(() => {
    if (isServerError) {
      setOpenErrorAlert(true);
    }
  }, [isServerError]);

  return (
    <AlertComponent
      severityProp={false}
      message={ERROR_MESSAGES.serverError}
      onError={{ openErrorAlert, setOpenErrorAlert }}
    />
  );
}
