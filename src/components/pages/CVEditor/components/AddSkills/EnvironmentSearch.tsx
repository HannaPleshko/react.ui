import { FC, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { ISkillItem } from '../../../../../types/skills';
import { isLatinLettersText, isLatinLettersTextAndNumbers } from '../../../../../utils/resumeUtils';
import { Button } from '@mui/material';
import EnvironmentModal from './EnvironmentModal';
import {
  ONLY_LATIN_LETTERS,
  PROJECT_MODAL,
  NO_OPTIONS,
} from '../../../../../utils/constants/resumeConstants';
import { useGetSkillsQuery } from '../../../../../store/api/SkillApi';

interface ISearchProps {
  chipData: ISkillItem[];
  setChipData: (item: ISkillItem[]) => void;
}

const EnvironmentSearch: FC<ISearchProps> = ({ chipData, setChipData }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<ISkillItem[]>([]);
  const [value, setValue] = useState<ISkillItem | null>(null);
  const loading = open && options.length === 0;
  const [openModal, setOpenModal] = useState(false);
  const { data: serverSkills = [], isLoading } = useGetSkillsQuery();

  useEffect(() => {
    if (value && !chipData.some((item) => item.environment_id === value.environment_id)) {
      setChipData([
        ...chipData,
        {
          ...value,
        },
      ]);
      setValue(null);
    }
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (active) {
      setOptions([...serverSkills]);
    }

    return () => {
      active = false;
    };
  }, [loading, setValue, value, chipData, setChipData, isLoading, serverSkills]);

  return (
    <>
      <EnvironmentModal
        inputValue={inputValue}
        setOpen={setOpenModal}
        open={openModal}
        setOptions={setOptions}
        setChipData={setChipData}
        chipData={chipData}
        options={options}
      />
      <Autocomplete
        filterSelectedOptions={true}
        id="asynchronous"
        fullWidth
        autoHighlight={true}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        value={value}
        onChange={(_, newValue: ISkillItem | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue.trim());
        }}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        getOptionLabel={(option) => option.label}
        noOptionsText={
          !isLatinLettersTextAndNumbers(inputValue) ? (
            <div style={{ color: '#d32f2f' }}>{ONLY_LATIN_LETTERS}</div>
          ) : (
            <div>
              <span style={{ marginRight: 15 }}>{NO_OPTIONS}</span>
              <Button
                size="small"
                variant="contained"
                color="primary"
                type="button"
                onClick={() => setOpenModal(true)}
              >
                {PROJECT_MODAL.addYourSkill}
              </Button>
            </div>
          )
        }
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Add skills"
            error={!isLatinLettersText(inputValue)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </>
  );
};

export default EnvironmentSearch;
