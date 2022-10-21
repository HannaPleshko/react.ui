import { FC, useEffect, useState } from 'react';
import { ISkillItem } from '../../../../../types/skills';
import { isLatinLettersText } from '../../../../../utils/resumeUtils';
import styles from '../ProfessionalExperience/CompanyProject/CompanyProjectModal.module.css';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {
  CATEGORY_LIST,
  ERROR_MESSAGES,
  ONLY_LATIN_LETTERS,
  PRIORITY_LIST,
  SUCCESS_MESSAGES,
  BUTTON_TEXTS,
} from '../../../../../utils/constants/resumeConstants';
import { useAddSkillMutation, useGetSkillsQuery } from '../../../../../store/api/SkillApi';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import AlertComponent from '../AlertComponent';

interface EnvironmentModalProps {
  open: boolean;
  setOpen: (arg0: boolean) => void;
  inputValue: string;
  setOptions: (item: ISkillItem[]) => void;
  setChipData: (item: ISkillItem[]) => void;
  chipData: ISkillItem[];
  options: ISkillItem[];
}

const EnvironmentModal: FC<EnvironmentModalProps> = ({
  open,
  setOpen,
  inputValue,
  setOptions,
  setChipData,
  chipData,
  options,
}) => {
  const [skillValue, setSkillValue] = useState('');
  const [categoryValue, setCategoryValue] = useState(CATEGORY_LIST[0].label);
  const [priorityValue, setPriorityValue] = useState(PRIORITY_LIST[3]);

  const [errorRepeated, setErrorRepeated] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [severityProp, setSeverity] = useState(false);

  const { data: serverSkills = [] } = useGetSkillsQuery();
  const [addSkill, { isLoading: loadingAddingSkill }] = useAddSkillMutation();

  const newSkillCategory = CATEGORY_LIST.filter((item) => item.label === categoryValue);
  const handleCloseModal = () => setOpen(false);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategoryValue(event.target.value);
  };

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriorityValue(event.target.value);
  };

  const newSkill = {
    label: skillValue,
    category: newSkillCategory[0].category,
    priority: Number(priorityValue),
  };

  useEffect(() => {
    if (inputValue) {
      setSkillValue(inputValue);
    }
    if (skillValue) {
      setErrorRepeated(false);
    }
  }, [inputValue, skillValue]);

  const handleSendSkill = async () => {
    if (
      skillValue &&
      categoryValue &&
      isLatinLettersText(skillValue) &&
      !options.some((item) => item.label === newSkill.label)
    ) {
      await addSkill(newSkill)
        .unwrap()
        .then((res) => {
          setChipData([...chipData, res]);
          setOptions([...serverSkills, res]);

          setOpenSuccessAlert(true);
          setOpen(false);
          setSeverity(true);
          setMessage(SUCCESS_MESSAGES.successfullySavedSkill);
        })
        .catch((err) => {
          console.error(err.error);

          setOpenErrorAlert(true);
          setOpen(false);
          setSeverity(false);
          setMessage(ERROR_MESSAGES.errorSkillNotSaved);
        });
    } else {
      setErrorRepeated(true);
    }
  };

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box bgcolor="background.paper" className={styles.box} sx={{ width: '40%' }}>
          <TextField
            margin="normal"
            size="small"
            autoFocus
            id="Id Skill"
            label="Your skill here"
            fullWidth
            value={skillValue}
            onChange={(e) => setSkillValue(e.target.value.trim())}
            error={!isLatinLettersText(skillValue) || errorRepeated}
            helperText={
              !isLatinLettersText(skillValue)
                ? ONLY_LATIN_LETTERS
                : null || errorRepeated
                ? ERROR_MESSAGES.errorEmptySkill
                : null
            }
          />
          <FormControl error={!categoryValue} margin="normal" fullWidth size="small">
            <InputLabel id="category-select">Category</InputLabel>
            <Select
              onChange={handleCategoryChange}
              labelId="category-select"
              label="Category"
              value={categoryValue}
              defaultValue={categoryValue}
            >
              {CATEGORY_LIST?.map((option) => {
                return (
                  <MenuItem key={option.label} value={option.label}>
                    {option.label}
                  </MenuItem>
                );
              })}
            </Select>
            {!categoryValue && <FormHelperText>Required</FormHelperText>}
          </FormControl>
          <FormControl margin="normal" fullWidth size="small">
            <InputLabel id="priority-select">Priority</InputLabel>
            <Select
              onChange={handlePriorityChange}
              labelId="priority-select"
              label="Priority"
              value={priorityValue}
              defaultValue={priorityValue}
            >
              {PRIORITY_LIST?.map((option) => {
                return (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <LoadingButton
            onClick={handleSendSkill}
            loading={loadingAddingSkill}
            startIcon={<SaveIcon />}
            loadingPosition="start"
            variant="contained"
            className={styles.mt16}
          >
            {BUTTON_TEXTS.save}
          </LoadingButton>
          <Button onClick={handleCloseModal} className={styles.mt16}>
            {BUTTON_TEXTS.cancel}
          </Button>
        </Box>
      </Modal>

      <AlertComponent
        severityProp={severityProp}
        onError={{ openErrorAlert, setOpenErrorAlert }}
        onSuccess={{ openSuccessAlert, setOpenSuccessAlert }}
        message={message}
      />
    </>
  );
};

export default EnvironmentModal;
