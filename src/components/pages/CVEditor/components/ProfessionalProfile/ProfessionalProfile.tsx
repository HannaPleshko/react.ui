import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { setProfile } from '../../../../../store/reducers/ResumeSlice';
import ItemsList from '../../../../common/ItemsList/ItemsList';
import { HEADERS } from '../../../../../utils/constants/resumeConstants';

function ProfessionalProfile() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.resume.header.profile);

  const setProfProfile = (items: string[]) => {
    dispatch(setProfile(items));
  };

  return (
    <>
      <Typography variant="h6" sx={{ backgroundColor: 'lightgray', mt: 4, mb: 2, pl: 1.7 }}>
        {HEADERS.professionalProfile}
      </Typography>
      <ItemsList items={profile} setItems={setProfProfile} />
    </>
  );
}

export default ProfessionalProfile;
