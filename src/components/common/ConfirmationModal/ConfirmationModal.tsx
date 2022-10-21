import { Dispatch, FC } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CONFIRMATION_MESSAGES, BUTTON_TEXTS } from '../../../utils/constants/resumeConstants';

interface IConfirmationModal {
  openModal: boolean;
  setOpenModal: Dispatch<boolean>;
  secondText: string;
  action: { payload: any; type: string };
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 4,
};

const ConfirmationModal: FC<IConfirmationModal> = ({
  openModal,
  setOpenModal,
  secondText,
  action,
}) => {
  const dispatch = useAppDispatch();
  const handleCloseRemoveModal = () => {
    setOpenModal(false);
  };
  return (
    <Modal
      BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.2)' } }}
      open={openModal}
      onClose={handleCloseRemoveModal}
    >
      <Box sx={style}>
        <Typography variant="h6">{CONFIRMATION_MESSAGES.confirmDeletion}</Typography>
        <Typography>{secondText}</Typography>
        <Stack spacing={2} direction="row" sx={{ justifyContent: 'flex-end', mt: 1 }}>
          <Button
            onClick={() => {
              dispatch(action);
              handleCloseRemoveModal();
            }}
          >
            {CONFIRMATION_MESSAGES.confirm}
          </Button>
          <Button onClick={handleCloseRemoveModal}>{BUTTON_TEXTS.cancel}</Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
