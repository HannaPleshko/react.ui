import { FC } from 'react';
import { CATEGORY_LIST } from '../../../../../utils/constants/resumeConstants';
import { IEnvironments } from '../../../../../types/skills';
import styles from './SkillsSummary.module.css';

interface ISkillItemProps {
  environments: IEnvironments[];
}

const SkillsItem: FC<ISkillItemProps> = ({ environments }) => {
  return (
    <>
      {CATEGORY_LIST.map((item) => {
        return (
          <div key={item.category} className={styles.item}>
            <p className={styles.name}>{item.label}:</p>
            {environments.map((itemEnvironment) => {
              if (item.category === itemEnvironment.categoryName) {
                return (
                  <div className={styles.label} key={itemEnvironment.categoryName}>
                    {itemEnvironment.skills.map((itemSkill, index) => (
                      <p key={itemSkill} className={styles.label}>
                        {(index ? ', ' : '') + itemSkill}
                      </p>
                    ))}
                  </div>
                );
              }
              return null;
            })}
          </div>
        );
      })}
    </>
  );
};

export default SkillsItem;
