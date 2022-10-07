import { Box, Button, Grid } from '@mui/material';
import React, { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import { isLatinLettersTextAndNumbers } from '../../../utils/resumeUtils';
import { BUTTON_TEXTS, ONLY_LATIN_LETTERS } from '../../../utils/constants/resumeConstants';
export interface IItemProps {
  item: string;
  editItem: (arg0: string, arg1: string) => void;
  removeItem: (arg0: string) => void;
}

const Item: FC<IItemProps> = ({ editItem, item, removeItem }) => {
  const [editMode, setEditMode] = useState(false);
  const [userInput, setUserInput] = useState(item);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setUserInput(userInput.trim());
    if (userInput) {
      setEditMode(false);
      if (isLatinLettersTextAndNumbers(userInput)) {
        editItem(userInput.trim(), item);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && userInput && isLatinLettersTextAndNumbers(userInput)) {
      setEditMode(false);
    }
  };

  const remove = () => removeItem(userInput);

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3, mt: 2 }}>
      {!editMode && (
        <Grid sx={{ p: 1 }} container wrap="nowrap" spacing={1}>
          <TextField
            onChange={handleChange}
            onFocus={activateEditMode}
            value={item}
            fullWidth
            size="small"
            variant="standard"
            error={!isLatinLettersTextAndNumbers(item)}
            helperText={!isLatinLettersTextAndNumbers(item) ? ONLY_LATIN_LETTERS : null}
          />
          <Button
            sx={{ maxHeight: '40px' }}
            size="small"
            color="error"
            variant="outlined"
            onClick={remove}
          >
            {BUTTON_TEXTS.delete}
          </Button>
        </Grid>
      )}
      {editMode && (
        <Grid sx={{ p: 1 }} container wrap="nowrap" spacing={1}>
          <TextField
            onBlur={deactivateEditMode}
            onChange={handleChange}
            value={userInput}
            onKeyDown={handleKeyPress}
            fullWidth
            autoFocus={true}
            size="small"
            variant="outlined"
            error={!isLatinLettersTextAndNumbers(userInput)}
            helperText={!isLatinLettersTextAndNumbers(userInput) ? ONLY_LATIN_LETTERS : null}
          />
          <Button
            sx={{ maxHeight: '40px' }}
            size="small"
            color="error"
            variant="outlined"
            onClick={remove}
          >
            {BUTTON_TEXTS.delete}
          </Button>
        </Grid>
      )}
    </Box>
  );
};

export default Item;
