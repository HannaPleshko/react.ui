import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import Logo from '../../../../../img/ibagroup.png';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import {
  setFirstName,
  setLastName,
  setLevelPosition,
  setUserPosition,
} from '../../../../../store/reducers/ResumeSlice';
import { isLatinLettersText } from '../../../../../utils/resumeUtils';
import {
  LEVEL_POSITION_LIST,
  ONLY_LATIN_LETTERS,
  POSITION,
  USER_POSITION_LIST,
} from '../../../../../utils/constants/resumeConstants';

function Header() {
  const dispatch = useAppDispatch();
  const firstName = useAppSelector((state) => state.resume.header.firstName);
  const lastName = useAppSelector((state) => state.resume.header.lastName);
  const levelValue = useAppSelector((state) => state.resume.header.positionLevel);
  const positionValue = useAppSelector((state) => state.resume.header.userPosition);

  const handleChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFirstName(event.target.value.trim()));
  };

  const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLastName(event.target.value.trim()));
  };

  const handleChangePosition = (event: SelectChangeEvent) => {
    dispatch(setUserPosition(event.target.value));
  };

  const handleChangeLevel = (event: SelectChangeEvent) => {
    dispatch(setLevelPosition(event.target.value));
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box sx={{ paddingTop: '10px', width: 350 }}>
          <TextField
            fullWidth
            id="firstName"
            label="First name"
            value={firstName}
            onChange={handleChangeFirstName}
            margin="normal"
            size="small"
            error={!isLatinLettersText(firstName)}
            helperText={!isLatinLettersText(firstName) ? ONLY_LATIN_LETTERS : null}
          />
          <TextField
            fullWidth
            id="lastName"
            label="Last name"
            value={lastName}
            onChange={handleChangeLastName}
            margin="normal"
            size="small"
            error={!isLatinLettersText(lastName)}
            helperText={!isLatinLettersText(lastName) ? ONLY_LATIN_LETTERS : null}
          />
          <FormControl fullWidth size="small" margin="normal">
            <InputLabel id="user-select">{POSITION.userPosition}</InputLabel>
            <Select
              onChange={handleChangePosition}
              labelId="user-select"
              label="Current position"
              value={positionValue}
            >
              {USER_POSITION_LIST?.map((option) => {
                return (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" margin="normal">
            <InputLabel id="level-select">{POSITION.levelPosition}</InputLabel>
            <Select
              onChange={handleChangeLevel}
              labelId="level-select"
              label="Level position"
              value={levelValue}
            >
              {LEVEL_POSITION_LIST?.map((option) => {
                return (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box
          component="img"
          sx={{ marginRight: '1em', height: 100 }}
          src={Logo}
          alt="IBA GROUP Logo"
        />
      </Box>
    </>
  );
}

export default Header;
