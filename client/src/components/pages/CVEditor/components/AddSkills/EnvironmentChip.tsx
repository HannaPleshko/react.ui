import { FC } from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { ISkillItem } from '../../../../../types/skills';
interface IEnvironmentChipProps {
  chipData: ISkillItem[];
  setChipData: (item: ISkillItem[]) => void;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const EnvironmentChip: FC<IEnvironmentChipProps> = ({ chipData, setChipData }) => {
  const handleDelete = (chipToDelete: ISkillItem) => () => {
    setChipData(chipData.filter((chip) => chip.environment_id !== chipToDelete.environment_id));
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
        minHeight: 40,
      }}
      component="ul"
    >
      {chipData.map((data) => {
        return (
          <ListItem key={data.environment_id}>
            <Chip label={data.label} onDelete={handleDelete(data)} />
          </ListItem>
        );
      })}
    </Paper>
  );
};

export default EnvironmentChip;
