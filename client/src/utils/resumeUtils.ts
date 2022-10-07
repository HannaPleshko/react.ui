import { format } from 'date-fns';
import {
  ResumeState,
  ProfessionalExperience,
  Languages,
  Header,
  Skills,
} from '../store/reducers/ResumeSlice';

type FORMATS = 'MMMM yyyy';

export const regex = /^[a-zA-Z]/;

export const lanRegex = /[а-яА-ЯёЁ]/;

export const numRegex = /[0-9]/;

export const isLatinLettersText = (str: string | null | undefined) => {
  return str?.search(lanRegex) === -1 && str?.search(numRegex) === -1;
};

export const isLatinLettersTextAndNumbers = (str: string | null | undefined) => {
  return str?.search(lanRegex) === -1;
};
export const nullEndDate = (date: string | null) => {
  const present = date === null ? 'Present' : dateFormatter(date);
  return present;
};

export const dateFormatter = (
  date: string | null,
  formatDate: FORMATS = 'MMMM yyyy'
): string | null => {
  return date ? format(new Date(date), formatDate) : null;
};

export const createId = () => new Date().getTime();

export const isDefined = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined;

export const isNonEmptyString = (value: string | null | undefined): value is string =>
  isDefined(value) && value.trim?.().length > 0;

export const isInputCorrect = (
  value: string | null | undefined,
  validation: (value: string | null | undefined) => boolean
): value is string => validation(value);

export const isNonEmptyArrayOfStrings = (value: string[] | null | undefined): value is string[] =>
  isDefined(value) && value?.length > 0;

export const isExperienceFilled = (experience: ProfessionalExperience[]) =>
  isDefined(experience) && experience?.length > 0;

export const isLanguagesFilled = (languages: Languages[]) =>
  isDefined(languages) && languages?.length > 0;

export const isHeaderFilled = (header: Header) =>
  isInputCorrect(header.firstName, isLatinLettersText) &&
  isNonEmptyString(header.firstName) &&
  isInputCorrect(header.lastName, isLatinLettersText) &&
  isNonEmptyString(header.lastName) &&
  isInputCorrect(header.userPosition, isLatinLettersText) &&
  isNonEmptyString(header.userPosition) &&
  isInputCorrect(header.positionLevel, isLatinLettersText) &&
  isNonEmptyString(header.positionLevel) &&
  isNonEmptyArrayOfStrings(header.profile);

export const isSkillsFilled = (skills: Skills) =>
  isLanguagesFilled(skills.languages) && isNonEmptyArrayOfStrings(skills.operatingSystems);

export const validatedFields = (resume: ResumeState) => {
  const isValid =
    isNonEmptyArrayOfStrings(resume.education) &&
    isExperienceFilled(resume.experience) &&
    isHeaderFilled(resume.header) &&
    isSkillsFilled(resume.skills) &&
    isInputCorrect(resume.filename, isLatinLettersTextAndNumbers) &&
    isNonEmptyString(resume.filename);
  return isValid;
};
