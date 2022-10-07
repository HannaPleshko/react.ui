import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { setResumeFileName } from '../../../../../store/reducers/ResumeSlice';
import { isLatinLettersTextAndNumbers } from '../../../../../utils/resumeUtils';
import { TextField } from '@mui/material';
import { ONLY_LATIN_LETTERS } from '../../../../../utils/constants/resumeConstants';

function ResumeFileName() {
  const dispatch = useAppDispatch();
  const resumeFileName = useAppSelector((state) => state.resume.filename);

  const handleResumeFileName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setResumeFileName(event.target.value.trim()));
  };

  return (
    <TextField
      sx={{ marginTop: 5, width: '30%' }}
      id="resumeName"
      label="Resume name"
      value={resumeFileName}
      onChange={handleResumeFileName}
      margin="normal"
      size="small"
      error={!isLatinLettersTextAndNumbers(resumeFileName)}
      helperText={!isLatinLettersTextAndNumbers(resumeFileName) ? ONLY_LATIN_LETTERS : null}
    />
  );
}

export default ResumeFileName;
