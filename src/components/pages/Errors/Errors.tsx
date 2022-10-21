import { CircularProgress, Container, Typography } from '@mui/material';
import JSONPretty from 'react-json-pretty';
import { IRTQError, useGetErrorsQuery } from '../../../store/RTQ/ResumeApi';
import { ERROR_MESSAGES } from '../../../utils/constants/resumeConstants';
import './Errors.css';

function Errors() {
  const { data = [], isLoading, error, isError } = useGetErrorsQuery();
  const serverError = error as IRTQError;

  return (
    <Container maxWidth="lg">
      <Typography variant="h6" sx={{ backgroundColor: 'lightgrey', mt: 4, mb: 2, pl: 1.7 }}>
        {ERROR_MESSAGES.errors}
      </Typography>
      {isError && error ? (
        <Typography variant="h6" sx={{ backgroundColor: '#FF7377', mt: 4, mb: 2, pl: 1.7 }}>
          {serverError.error}
        </Typography>
      ) : null}
      {!isLoading ? (
        data.length !== 0 ? (
          <JSONPretty id="json-pretty" data={data}></JSONPretty>
        ) : null
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
}

export default Errors;
