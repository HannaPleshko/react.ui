import { Dispatch, FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useAppDispatch } from '../../../../../../hooks/redux';
import {
  addExperience,
  editExperience,
  ProfessionalExperience,
} from '../../../../../../store/reducers/ResumeSlice';
import { createId, isLatinLettersTextAndNumbers } from '../../../../../../utils/resumeUtils';
import {
  ONLY_LATIN_LETTERS,
  USER_POSITION_LIST,
  BUTTON_TEXTS,
  POSITION,
  LEVEL_POSITION_LIST,
} from '../../../../../../utils/constants/resumeConstants';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface IAddItem {
  setOpenModal: Dispatch<boolean>;
  openModal: boolean;
  modalData: ProfessionalExperience;
  setData: Dispatch<any>;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

const AddItem: FC<IAddItem> = ({ setOpenModal, modalData, openModal, setData }) => {
  const dispatch = useAppDispatch();
  const handleCloseModal = () => setOpenModal(false);
  const handleSendExperience = () => {
    setOpenModal(false);
    const exsperience = {
      userPosition: modalData?.userPosition,
      positionLevel: modalData?.positionLevel,
      companyName: modalData?.companyName,
      startDate: modalData?.startDate?.toString() ?? null,
      endDate:
        !modalData?.isCheckedCurrentWork && modalData?.endDate
          ? modalData?.endDate.toString()
          : null,
      id: modalData?.id,
      isCheckedCurrentWork: modalData?.isCheckedCurrentWork,
      projects: modalData?.projects ?? [],
    };

    modalData?.id
      ? dispatch(editExperience(exsperience))
      : dispatch(
          addExperience({
            ...exsperience,
            id: createId(),
          })
        );
  };
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <FormControl fullWidth size="small" margin="normal">
          <InputLabel id="user-select">{POSITION.positionName}</InputLabel>
          <Select
            onChange={(e) => {
              setData({ ...modalData, userPosition: e.target.value });
            }}
            labelId="user-select"
            label="Position name"
            value={modalData?.userPosition ?? ''}
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
          <InputLabel id="user-select-level">{POSITION.levelPosition}</InputLabel>
          <Select
            onChange={(e) => {
              setData({ ...modalData, positionLevel: e.target.value });
            }}
            labelId="user-select-level"
            label="Position level"
            value={modalData?.positionLevel ?? ''}
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
        <TextField
          sx={{ paddingBottom: '16px' }}
          autoFocus
          fullWidth
          margin="normal"
          id="Company name"
          label="Company name"
          value={modalData?.companyName ?? ''}
          onChange={(e) => {
            setData({ ...modalData, companyName: e.target.value });
          }}
          error={
            Boolean(modalData?.companyName) && !isLatinLettersTextAndNumbers(modalData?.companyName)
          }
          helperText={
            modalData?.companyName && !isLatinLettersTextAndNumbers(modalData?.companyName)
              ? ONLY_LATIN_LETTERS
              : null
          }
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={2} direction="row">
            <DatePicker
              disableFuture
              views={['year', 'month']}
              label="Start date"
              defaultCalendarMonth={new Date()}
              value={modalData?.startDate ? new Date(modalData?.startDate) : new Date()}
              maxDate={modalData?.endDate ? new Date(modalData?.endDate) : new Date()}
              onChange={(newValue) => {
                setData({ ...modalData, startDate: newValue });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              disableFuture
              views={['year', 'month']}
              label="End date"
              value={modalData?.endDate ? new Date(modalData?.endDate) : new Date()}
              minDate={modalData?.startDate ? new Date(modalData?.startDate) : new Date()}
              disabled={modalData?.isCheckedCurrentWork}
              onChange={(newValue) => {
                setData({ ...modalData, endDate: newValue });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
        <FormControlLabel
          control={
            <Checkbox
              checked={modalData?.isCheckedCurrentWork || false}
              onChange={() => {
                setData({ ...modalData, isCheckedCurrentWork: !modalData?.isCheckedCurrentWork });
              }}
            />
          }
          label={POSITION.role}
        />
        <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end', paddingTop: '16px' }}>
          <Button
            onClick={handleSendExperience}
            disabled={
              !(
                modalData.companyName &&
                modalData.userPosition &&
                modalData.positionLevel &&
                modalData.startDate
              )
            }
          >
            {modalData.id ? BUTTON_TEXTS.saveChanges : BUTTON_TEXTS.save}
          </Button>
          <Button onClick={handleCloseModal}>{BUTTON_TEXTS.cancel}</Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddItem;
