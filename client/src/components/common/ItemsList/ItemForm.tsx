import { Box, Button, Grid, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import { ONLY_LATIN_LETTERS, BUTTON_TEXTS } from '../../../utils/constants/resumeConstants';
import { isLatinLettersTextAndNumbers } from '../../../utils/resumeUtils';

interface IItemFormProps {
  addItem: (userInput: string) => void;
  label?: string;
}

const ItemForm: FC<IItemFormProps> = ({ addItem, label }) => {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = () => {
    addItem(userInput.trim());
    setUserInput('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && isLatinLettersTextAndNumbers(userInput)) {
      handleSubmit();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  return (
    <Box>
      <Grid container wrap="nowrap">
        <TextField
          onChange={handleChange}
          value={userInput}
          fullWidth
          id="fullWidth"
          label={label}
          onKeyDown={handleKeyPress}
          size="small"
          variant="outlined"
          error={!isLatinLettersTextAndNumbers(userInput)}
          helperText={!isLatinLettersTextAndNumbers(userInput) ? ONLY_LATIN_LETTERS : null}
        />
        <Button
          disabled={!isLatinLettersTextAndNumbers(userInput)}
          sx={{ maxHeight: '40px' }}
          onClick={handleSubmit}
          variant="outlined"
        >
          {BUTTON_TEXTS.add}
        </Button>
      </Grid>
    </Box>
  );
};

export default ItemForm;
