import { FC, useState } from 'react';
import { Button, Typography } from '@mui/material';
import ProfessionalItem from './Professionalitem/ProfessionalItem';
import AddItem from './AddItem/AddItem';
import { useAppSelector } from '../../../../../hooks/redux';
import { ProfessionalExperience as ProfessionalExperienceType } from '../../../../../store/reducers/ResumeSlice';
import { HEADERS, PROJECT_MODAL } from '../../../../../utils/constants/resumeConstants';

const ProfessionalExperience: FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const experience = useAppSelector((state) => state.resume.experience);
  const [modalData, setData] = useState<ProfessionalExperienceType>(
    {} as ProfessionalExperienceType
  );

  const handleOpenModal = () => {
    setData({} as ProfessionalExperienceType);
    setOpenModal(true);
  };

  const findOneProfessionalExspirience = (id: number): ProfessionalExperienceType | undefined =>
    experience.find((item) => item.id === id);

  return (
    <>
      <Typography variant="h6" sx={{ backgroundColor: 'lightgray', mt: 4, mb: 2, pl: 1.7 }}>
        {HEADERS.professionalExperience}
      </Typography>
      <Button
        variant="contained"
        size="small"
        style={{ display: 'block', textAlign: 'center', margin: '1.5rem' }}
        onClick={handleOpenModal}
      >
        {PROJECT_MODAL.addCompany}
      </Button>
      {experience.map((item) => {
        return (
          <ProfessionalItem
            key={item.id}
            item={item}
            modalData={modalData}
            setData={setData}
            findOneProfessionalExspirience={findOneProfessionalExspirience}
            setOpenModal={setOpenModal}
          />
        );
      })}

      <AddItem
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalData={modalData}
        setData={setData}
      />
    </>
  );
};

export default ProfessionalExperience;
