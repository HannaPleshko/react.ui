import { FC, useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
  Typography,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { addLanguages, removeLanguages } from '../../../../../../store/reducers/ResumeSlice';
import { LANGUAGE_LIST, LEVEL_LIST } from '../../../../../../utils/constants/resumeConstants';
import { BUTTON_TEXTS, LANGUAGES } from '../../../../../../utils/constants/resumeConstants';

const Languages: FC = () => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector((state) => state.resume.skills.languages);
  const [languageValue, setLanguageValue] = useState('');
  const [levelValue, setLevelValue] = useState('');
  const [displayed, setDisplayed] = useState('');

  const handleChangeAddLanguages = () => {
    const language = { language: languageValue, level: levelValue };
    dispatch(addLanguages(language));
    handleChangeClearButton();
  };

  const handleChangeClearButton = () => {
    setLanguageValue('');
    setLevelValue('');
  };

  const isAlreadySelected = () => {
    const isSelected = languages.findIndex((item) => {
      return languageValue === item.language;
    });

    return isSelected !== -1;
  };

  const handleChange = (event: SelectChangeEvent) => {
    setLanguageValue(event.target.value as string);
  };

  const handleChangeLevel = (event: SelectChangeEvent) => {
    setLevelValue(event.target.value as string);
  };

  const menuItem = (option: string) => {
    return (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    );
  };
  return (
    <>
      <p style={{ margin: '5px 20px 5px 0', fontWeight: 'bold' }}>{LANGUAGES.foreighLanguages}</p>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          width: {
            xs: '70%',
            sm: '70%',
            md: '50%',
            lg: '40%',
            xl: '40%',
          },
          marginTop: '16px',
        }}
      >
        <FormControl sx={{ width: '150px' }} fullWidth size="small">
          <InputLabel id="language-select">{LANGUAGES.language}</InputLabel>
          <Select
            onChange={handleChange}
            labelId="language-select"
            label="Language"
            value={languageValue}
          >
            {LANGUAGE_LIST?.map((option) => menuItem(option))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: '150px' }} fullWidth size="small">
          <InputLabel id="level-select">{LANGUAGES.level}</InputLabel>
          <Select
            onChange={handleChangeLevel}
            labelId="level-select"
            label="Language"
            value={levelValue}
          >
            {LEVEL_LIST?.map((option) => menuItem(option))}
          </Select>
        </FormControl>
        <Button
          size="medium"
          variant="outlined"
          onClick={handleChangeAddLanguages}
          disabled={isAlreadySelected() || !levelValue || !languageValue}
        >
          {BUTTON_TEXTS.add}
        </Button>
        <Button
          size="medium"
          variant="outlined"
          onClick={handleChangeClearButton}
          disabled={!levelValue || !languageValue}
        >
          {BUTTON_TEXTS.clear}
        </Button>
      </Box>

      {languages.map((row) => {
        const key = row.language + row.level;
        return (
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              maxWidth: '300px',
              marginTop: '10px',
              minHeight: '30px',
              alignItems: 'center',
            }}
            key={key}
            onMouseEnter={() => setDisplayed(key)}
            onMouseLeave={() => setDisplayed('')}
          >
            <Typography>
              {row.language} | {row.level}
            </Typography>
            {displayed === key && (
              <Button
                color="error"
                sx={{ padding: 0 }}
                onClick={() => dispatch(removeLanguages(key))}
              >
                {BUTTON_TEXTS.removeLanguage}
              </Button>
            )}
          </Box>
        );
      })}
    </>
  );
};

export default Languages;
