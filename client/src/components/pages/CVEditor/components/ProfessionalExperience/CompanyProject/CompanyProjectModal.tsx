import { Dispatch, useEffect, useState } from 'react';
import styles from './CompanyProjectModal.module.css';
import Environment from '../../AddSkills/Environment';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { isLatinLettersTextAndNumbers } from '../../../../../../utils/resumeUtils';
import { Project } from '../../../../../../store/reducers/ResumeSlice';
import { ISkillItem } from '../../../../../../types/skills';
import ItemsList from '../../../../../common/ItemsList/ItemsList';
import {
  ONLY_LATIN_LETTERS,
  USER_POSITION_LIST,
  LEVEL_POSITION_LIST,
  PROJECT_MODAL,
  BUTTON_TEXTS,
  POSITION,
} from '../../../../../../utils/constants/resumeConstants';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
interface CompanyProjectModalProps {
  openModal: boolean;
  setOpenModal: (item: boolean) => void;
  setProjectData: Dispatch<any>;
  projectData: Project;
  saveProject: (responsibilities: string[], chips: ISkillItem[]) => void;
}

const CompanyProjectModal: React.FC<CompanyProjectModalProps> = ({
  openModal,
  setOpenModal,
  setProjectData,
  projectData,
  saveProject,
}) => {
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [chips, setChips] = useState<ISkillItem[]>([]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveProject = () => {
    saveProject(responsibilities, chips);
  };

  useEffect(() => {
    setResponsibilities(projectData?.responsibilities ?? []);
    setChips(projectData?.environment ?? []);
  }, [openModal, projectData?.environment, projectData?.responsibilities]);

  const isValid = Boolean(
    projectData.description &&
      chips.length > 0 &&
      projectData.userPosition &&
      projectData.positionLevel &&
      responsibilities.length > 0 &&
      isLatinLettersTextAndNumbers(projectData?.userPosition) &&
      isLatinLettersTextAndNumbers(projectData?.description)
  );

  return (
    <>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ width: { xs: '72%', sm: '75%', md: '45%', lg: '60%', xl: '60%' } }}
          bgcolor="background.paper"
          className={styles.box}
        >
          <FormControl fullWidth size="small" margin="normal">
            <InputLabel id="user-select">{POSITION.positionName}</InputLabel>
            <Select
              onChange={(e) => setProjectData({ ...projectData, userPosition: e.target.value })}
              labelId="user-select"
              label="Position name"
              value={projectData?.userPosition ?? ''}
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
              onChange={(e) => setProjectData({ ...projectData, positionLevel: e.target.value })}
              labelId="user-select-level"
              label="Position level"
              value={projectData?.positionLevel ?? ''}
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
            autoFocus
            multiline
            minRows={8}
            maxRows={20}
            margin="normal"
            id="Description"
            label="Description"
            fullWidth
            value={projectData?.description ?? ''}
            onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
            error={
              Boolean(projectData?.description) &&
              !isLatinLettersTextAndNumbers(projectData?.description)
            }
            helperText={
              projectData?.description && !isLatinLettersTextAndNumbers(projectData?.description)
                ? ONLY_LATIN_LETTERS
                : null
            }
          />

          <p className={styles.name}>{PROJECT_MODAL.responsibilities}</p>
          <ItemsList
            items={responsibilities}
            setItems={setResponsibilities}
            label={PROJECT_MODAL.responsibilities}
          />

          <p className={styles.name}>{PROJECT_MODAL.environment}</p>
          <Environment chips={chips} setChips={setChips} />

          <Button
            disabled={!isValid}
            onClick={handleSaveProject}
            variant="contained"
            className={styles.mt16}
          >
            {BUTTON_TEXTS.save}
          </Button>
          <Button onClick={handleCloseModal} className={styles.mt16}>
            {BUTTON_TEXTS.cancel}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CompanyProjectModal;
