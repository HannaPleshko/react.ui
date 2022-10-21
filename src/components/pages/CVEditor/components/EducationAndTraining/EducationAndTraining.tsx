import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { setEducation } from '../../../../../store/reducers/ResumeSlice';
import ItemsList from '../../../../common/ItemsList/ItemsList';
import { HEADERS } from '../../../../../utils/constants/resumeConstants';

function EducationAndTraining() {
  const dispatch = useAppDispatch();
  const education = useAppSelector((state) => state.resume.education);

  const setEducationAndTraining = (items: string[]) => {
    dispatch(setEducation(items));
  };

  return (
    <>
      <Typography variant="h6" sx={{ backgroundColor: 'lightgray', mt: 5, mb: 3, pl: 1.7 }}>
        {HEADERS.educationalAndTraining}
      </Typography>
      <ItemsList items={education} setItems={setEducationAndTraining} />
    </>
  );
}

export default EducationAndTraining;
