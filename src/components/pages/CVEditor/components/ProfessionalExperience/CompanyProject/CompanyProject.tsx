import { Dispatch, FC, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../../../hooks/redux';
import styles from './CompanyProject.module.css';
import { Box, Button } from '@mui/material';
import {
  editExperience,
  editProject,
  ProfessionalExperience,
  Project as ProjectType,
  removeProject,
} from '../../../../../../store/reducers/ResumeSlice';
import CompanyProjectModal from './CompanyProjectModal';
import ConfirmationModal from '../../../../../common/ConfirmationModal/ConfirmationModal';
import { createId } from '../../../../../../utils/resumeUtils';
import { ISkillItem } from '../../../../../../types/skills';
import { CONFIRMATION_MESSAGES } from '../../../../../../utils/constants/resumeConstants';
interface ICompanyProject {
  item: ProfessionalExperience;
  modalData?: ProfessionalExperience;
  setData?: Dispatch<any>;
}

const CompanyProject: FC<ICompanyProject> = ({
  item,
  modalData = {} as ProfessionalExperience,
  setData = () => undefined,
}) => {
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [idForRemove, setIdForRemove] = useState<number | null>(null);
  const [openConfModal, setOpenConfModal] = useState(false);
  const [projectData, setProjectData] = useState({} as ProjectType);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    setData({
      ...modalData,
      projects: [projectData],
    });
  }, [modalData, projectData, setData]);

  const handleAddProject = () => {
    setOpenModal(true);
    setProjectData({} as ProjectType);
  };

  const saveProject = (responsibilities: string[], chips: ISkillItem[]) => {
    const newObj = {
      userPosition: projectData?.userPosition,
      positionLevel: projectData?.positionLevel,
      description: projectData?.description,
      responsibilities: projectData?.responsibilities,
      environment: projectData?.environment,
      id: projectData?.id,
    };
    const filteredObj = item.projects.filter((item) => item.id !== projectData?.id);
    const sendObj = {
      ...filteredObj,
      ...newObj,
      responsibilities: responsibilities,
      environment: chips,
    };

    projectData?.id
      ? dispatch(editProject(sendObj))
      : dispatch(
          editExperience({
            ...item,
            projects: [
              ...item.projects,
              { ...newObj, id: createId(), responsibilities: responsibilities, environment: chips },
            ],
          })
        );
    setOpenModal(false);
  };

  const handleRemoveProject = (id: number) => {
    setOpenConfModal(true);
    setIdForRemove(id);
  };

  const handleOpenEditModal = (id: number) => {
    const findProject = item.projects.find((item) => item.id === id);
    if (findProject) {
      setProjectData(findProject);
    }
    setOpenModal(true);
  };

  return (
    <>
      <Button onClick={handleAddProject}>Add project</Button>
      <CompanyProjectModal
        saveProject={saveProject}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setProjectData={setProjectData}
        projectData={projectData}
      />
      {item.projects.map((proj) => {
        const environmentList = [...proj?.environment]
          ?.sort((a, b) => (a.priority > b.priority ? 1 : -1))
          .map((item) => item.label)
          .join(', ');
        return (
          <Box
            onMouseEnter={() => setDisplayed(proj.id)}
            onMouseLeave={() => setDisplayed(0)}
            key={proj.id}
            sx={{
              border: 1,
              borderColor: 'grey.500',
              borderRadius: 1,
              marginBottom: 2,
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div className={styles.responsibilities}>
                <div className={styles.title}>Position: </div>
                <div className={styles.valuesBlock}>
                  <p> {proj.userPosition}</p>
                </div>
              </div>
              <div className={styles.responsibilities}>
                <div className={styles.title}>Position level: </div>
                <div className={styles.valuesBlock}>
                  <p> {proj.positionLevel}</p>
                </div>
              </div>
              <div className={styles.responsibilities}>
                <div className={styles.title}>Description: </div>
                <div className={styles.valuesBlock}>
                  <p> {proj.description}</p>
                </div>
              </div>
              <div className={styles.responsibilities}>
                <div className={styles.title}>Responsibilities: </div>
                <div className={styles.valuesBlock}>
                  <ul className={styles.list}>
                    {proj?.responsibilities?.map((item: string) => (
                      <li key={item} className={styles.listItem}>
                        - {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={styles.environment}>
                <div className={styles.title}>Environment: </div>
                <div className={styles.valuesBlock}>{environmentList}</div>
              </div>
            </div>
            {displayed === proj.id && (
              <div>
                <Button
                  sx={{ mt: 2 }}
                  color="info"
                  onClick={() => {
                    handleOpenEditModal(proj.id);
                  }}
                >
                  edit
                </Button>
                <Button sx={{ mt: 2 }} color="error" onClick={() => handleRemoveProject(proj.id)}>
                  remove
                </Button>
              </div>
            )}

            <ConfirmationModal
              secondText={CONFIRMATION_MESSAGES.confirmDeleteProject}
              openModal={openConfModal}
              setOpenModal={setOpenConfModal}
              action={removeProject(idForRemove)}
            />
          </Box>
        );
      })}
    </>
  );
};

export default CompanyProject;
