import { Dispatch, FC, useState } from 'react';
import {
  ProfessionalExperience,
  removeExperience,
} from '../../../../../../store/reducers/ResumeSlice';
import { dateFormatter, nullEndDate } from '../../../../../../utils/resumeUtils';
import ConfirmationModal from '../../../../../common/ConfirmationModal/ConfirmationModal';
import CompanyProject from '../CompanyProject/CompanyProject';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  CONFIRMATION_MESSAGES,
  DATE,
  COMPANY_MODAL,
  BUTTON_TEXTS,
} from '../../../../../../utils/constants/resumeConstants';

interface IProfessionalItem {
  items?: ProfessionalExperience[];
  item: ProfessionalExperience;
  modalData?: ProfessionalExperience;
  setData?: Dispatch<any>;
  setOpenModal?: Dispatch<boolean>;
  findOneProfessionalExspirience?: (id: number) => ProfessionalExperience | undefined;
}

const ProfessionalItem: FC<IProfessionalItem> = ({
  item,
  modalData = {} as ProfessionalExperience,
  setData = () => undefined,
  setOpenModal = () => undefined,
  findOneProfessionalExspirience = () => undefined,
}) => {
  const [removeModal, setRemoveModal] = useState(false);
  const [displayed, setDisplayed] = useState(0);

  const handleOpenEditModal = (id: number) => {
    const professionalExperienceCompany = findOneProfessionalExspirience(id);
    if (professionalExperienceCompany) {
      setData(professionalExperienceCompany);
    }
    setOpenModal(true);
  };

  const handleOpenRemoveModal = (item: object) => {
    setData(item);
    setRemoveModal(true);
  };

  interface IStyleProps {
    display: string;
    alignItems: string;
    marginLeft?: {
      xs: number;
      sm: number;
    };
  }

  const stylePositionCompany = { display: 'flex', alignItems: 'center', fontSize: '16px' };
  const styleEndDate = {
    marginLeft: { xs: 0, sm: 10 },
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
  };

  const renderCenteredBlock = (title: string, value: string | null, style: IStyleProps) => {
    return (
      <Typography variant="h6" noWrap sx={style}>
        {title}
        <Typography noWrap sx={{ marginLeft: 2 }}>
          {value}
        </Typography>
      </Typography>
    );
  };

  return (
    <Box
      key={item.id}
      sx={{ border: 1, borderColor: 'grey.500', borderRadius: 1, marginBottom: 3, p: 3 }}
      onMouseEnter={() => setDisplayed(item.id)}
      onMouseLeave={() => setDisplayed(0)}
    >
      {renderCenteredBlock(COMPANY_MODAL.company, item.companyName, stylePositionCompany)}
      {renderCenteredBlock(COMPANY_MODAL.position, item.userPosition, stylePositionCompany)}
      {renderCenteredBlock(COMPANY_MODAL.positionLevel, item.positionLevel, stylePositionCompany)}

      <Box sx={{ marginBottom: 1, display: { xs: 'block', sm: 'flex' } }}>
        {renderCenteredBlock(DATE.startDate, dateFormatter(item?.startDate), stylePositionCompany)}
        {renderCenteredBlock(DATE.endDate, nullEndDate(item?.endDate), styleEndDate)}
      </Box>
      {displayed === item.id && (
        <>
          <Button
            color="info"
            onClick={() => {
              handleOpenEditModal(item?.id!);
            }}
          >
            {BUTTON_TEXTS.edit}
          </Button>
          <Button color="error" onClick={() => handleOpenRemoveModal(item)}>
            {BUTTON_TEXTS.remove}
          </Button>
        </>
      )}

      <CompanyProject item={item} />

      <ConfirmationModal
        secondText={CONFIRMATION_MESSAGES.confirmDeleteCompany}
        openModal={removeModal}
        setOpenModal={setRemoveModal}
        action={removeExperience(modalData)}
      />
    </Box>
  );
};

export default ProfessionalItem;
