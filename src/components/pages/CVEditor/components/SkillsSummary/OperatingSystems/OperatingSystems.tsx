import { Checkbox, FormControlLabel, Box } from '@mui/material';
import React from 'react';
import { OPERATING_SYSTEMS_LIST } from '../../../../../../utils/constants/resumeConstants';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import {
  addOperatingSystem,
  removeOperatingSystem,
} from '../../../../../../store/reducers/ResumeSlice';

function OperatingSystems() {
  const dispatch = useAppDispatch();
  const selectedSystems = useAppSelector((state) => state.resume.skills.operatingSystems);

  const handleChangeOperatingSystem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = selectedSystems.indexOf(event.target.value);
    if (index === -1) {
      dispatch(addOperatingSystem(event.target.value));
    } else {
      dispatch(removeOperatingSystem(event.target.value));
    }
  };

  return (
    <>
      <Box style={{ alignItems: 'center' }}>
        <p style={{ marginRight: '20px', fontWeight: 'bold', marginBottom: 3 }}>
          Operating Systems:
        </p>
        {OPERATING_SYSTEMS_LIST.map((label, id) => (
          <FormControlLabel
            key={id}
            label={label}
            control={
              <Checkbox
                checked={selectedSystems.includes(label)}
                value={label}
                onChange={handleChangeOperatingSystem}
              />
            }
          />
        ))}
      </Box>
    </>
  );
}

export default OperatingSystems;
