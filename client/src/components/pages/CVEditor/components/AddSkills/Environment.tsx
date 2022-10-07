import { FC } from 'react';
import { Box } from '@mui/material';
import { ISkillItem } from '../../../../../types/skills';
import EnvironmentChip from './EnvironmentChip';
import EnvironmentSearch from './EnvironmentSearch';
interface EnvironmentProps {
  chips: ISkillItem[];
  setChips: (items: ISkillItem[]) => void;
}
const Environment: FC<EnvironmentProps> = ({ chips, setChips }) => {
  return (
    <>
      <Box sx={{ pt: 3, pb: 3 }}>
        <EnvironmentChip setChipData={setChips} chipData={chips} />
      </Box>
      <EnvironmentSearch setChipData={setChips} chipData={chips} />
    </>
  );
};

export default Environment;
