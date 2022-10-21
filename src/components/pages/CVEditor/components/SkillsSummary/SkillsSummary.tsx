import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../hooks/redux';
import { Typography } from '@mui/material';
import Languages from './Languages/Languages';
import OperatingSystems from './OperatingSystems/OperatingSystems';
import { IEnvironments, ISkillItem } from '../../../../../types/skills';
import SkillsItem from './SkillsItem';
import { HEADERS } from '../../../../../utils/constants/resumeConstants';

function SkillsSummary() {
  const experience = useAppSelector((state) => state.resume.experience);
  const [environments, setEnvironments] = useState<IEnvironments[]>([]);

  const filteredEnvironments = useCallback(() => {
    const filteredItems = experience
      .map((company) => company.projects.map((project) => project.environment.map((item) => item)))
      .flat(2)
      .sort((a: ISkillItem, b: ISkillItem) => (a.priority > b.priority ? 1 : -1));

    const filteredSkills = Object.values(
      filteredItems.reduce((environments: Record<string, any>, el: ISkillItem) => {
        environments[el.category] = environments[el.category] || {
          categoryName: el.category,
          skills: [],
        };
        if (!environments[el.category].skills.find((item: any) => item === el.label)) {
          environments[el.category].skills.push(el.label);
        }
        return environments;
      }, {})
    );

    setEnvironments(filteredSkills);
  }, [experience]);

  useEffect(() => {
    filteredEnvironments();
  }, [filteredEnvironments]);

  return (
    <>
      <Typography variant="h6" sx={{ backgroundColor: 'lightgray', mt: 4, mb: 2, pl: 1.7 }}>
        {HEADERS.skillsSummary}
      </Typography>
      <SkillsItem environments={environments} />
      <OperatingSystems />
      <Languages />
    </>
  );
}

export default SkillsSummary;
