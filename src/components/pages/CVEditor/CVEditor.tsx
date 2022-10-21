import { Container } from '@mui/material';
import SaveButton from './components/Button/SaveButton';
import EducationAndTraining from './components/EducationAndTraining/EducationAndTraining';
import Header from './components/Header/Header';
import ProfessionalExperience from './components/ProfessionalExperience/ProfessionalExperience';
import ProfessionalProfile from './components/ProfessionalProfile/ProfessionalProfile';
import ResumeFileName from './components/ResumeFileName/ResumeFileName';
import SkillsSummary from './components/SkillsSummary/SkillsSummary';

function CVEditor() {
  return (
    <>
      <Container maxWidth="lg" sx={{ mb: 7, mt: 3 }}>
        <Header />
        <ProfessionalProfile />
        <SkillsSummary />
        <ProfessionalExperience />
        <EducationAndTraining />
        <ResumeFileName />
        <SaveButton />
      </Container>
    </>
  );
}

export default CVEditor;
