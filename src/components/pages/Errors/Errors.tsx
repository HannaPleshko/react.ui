import { CircularProgress, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import JSONPretty from 'react-json-pretty';
import { useGetErrorsQuery } from '../../../store/api/ErrorsApi';
import { ERROR_MESSAGES } from '../../../utils/constants/resumeConstants';
import AlertComponent from '../CVEditor/components/AlertComponent';
import './Errors.css';

const Errors: React.FC = () => {
  const { data = [], isLoading, isError } = useGetErrorsQuery();
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  useEffect(() => {
    setOpenErrorAlert(false);
    if (isError) {
      setOpenErrorAlert(true);
    }
  }, [isLoading]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h6" sx={{ backgroundColor: 'lightgrey', mt: 4, mb: 2, pl: 1.7 }}>
        {ERROR_MESSAGES.errors}
      </Typography>
      {!isLoading ? (
        data.length !== 0 ? (
          <JSONPretty id="json-pretty" data={data}></JSONPretty>
        ) : null
      ) : (
        <CircularProgress />
      )}
      <AlertComponent
        severityProp={false}
        message={ERROR_MESSAGES.serverError}
        onError={{ openErrorAlert, setOpenErrorAlert }}
      />
    </Container>
  );
};

export default Errors;
