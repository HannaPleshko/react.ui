export const BUTTON_TEXTS = {
  editResume: 'Edit resume',
  removeResume: 'Remove resume',
  removeLanguage: 'Remove language',
  save: 'Save',
  cancel: 'Cancel',
  add: 'Add',
  addProject: 'Add project',
  clear: 'Clear',
  delete: 'Delete',
  saveResume: 'Save resume',
  saveChanges: 'Save changes',
  edit: 'edit',
  remove: 'remove',
  downloadPDF: 'Download pdf file',
  downloadDOC: 'Download doc file',
};

export interface ICategoryList {
  category: string;
  label: string;
}

export const CATEGORY_LIST: ICategoryList[] = [
  {
    category: 'programmingLanguages',
    label: 'Programming languages',
  },
  {
    category: 'webTechnologies',
    label: 'Web technologies',
  },
  {
    category: 'applicationServers',
    label: 'Application servers',
  },
  {
    category: 'databases',
    label: 'Data bases',
  },
  {
    category: 'otherSkills',
    label: 'Other skills',
  },
];

export const LANGUAGE_LIST = ['English', 'Polish', 'German', 'Russian', 'French', 'Chinese'];

export const LEVEL_POSITION_LIST = ['Trainee', 'Junior', 'Middle', 'Senior', 'Team Lead'];
export const USER_POSITION_LIST = [
  'Software Developer',
  'CEO',
  'Team Lead',
  'Enterprise Architect',
  'Project Manager',
  'Delivery Manager',
  'Software Engineer',
  'Business Analyst',
  'QA Engineer',
  'DevOps Engineer',
  'DB Administrator',
  'UI/UX Specialist',
];

export const LEVEL_LIST = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export const PRIORITY_LIST = ['1', '2', '3', '4', '5'];

export const DATE = {
  startDate: 'Start date:',
  endDate: 'End date:',
};

export const OPERATING_SYSTEMS_LIST: string[] = ['Windows', 'Mac OS', 'Linux', 'iOS', 'Android'];

export const LINKS = [
  { name: 'Create', path: '/create' },
  { name: 'Manage', path: '/manage' },
];

export const LANGUAGES = {
  level: 'Level',
  language: 'Language',
  foreighLanguages: 'Foreign Languages:',
};

export const HEADERS = {
  resumeList: 'RESUME LIST',
  professionalProfile: 'PROFESSIONAL PROFILE',
  educationalAndTraining: 'EDUCATION AND TRAINING',
  professionalExperience: 'PROFESSIONAL EXPERIENCE',
  skillsSummary: 'SKILLS SUMMARY',
};

export const CONFIRMATION_MESSAGES = {
  confirm: 'Confirm',
  confirmDeletion: 'Confirm deletion',
  confirmFields: 'Please confirm the fields',
  confirmDeleteProject: 'Are you sure you want to delete the project',
  confirmDeleteCompany: 'Are you sure you want to delete the professional experience company?',
};

export const ERROR_MESSAGES = {
  errors: 'Errors',
  error: 'Error:',
  errorSkillNotSaved: 'Error: Skill does not saved',
  errorEmptySkill: 'Error: Repeated or empty skill',
  resumeNotSaved: 'The resume does not saved.',
  resumeNotDownloaded: 'Resume was not downloaded!',
  serverError: 'Server error occurred!',
};

export const SUCCESS_MESSAGES = {
  successfullyDownloaded: 'Resume successfully downloaded!',
  successfullyRemoved: 'Resume successfully removed!',
  successfullySaved: 'Resume successfully saved!',
  successfullySavedSkill: 'Skill successfully saved!',
};

export const PAGE_NOT_FOUND = {
  title: 'Oops!',
  subTitle: '404 - The Page can not be found',
  linkTitle: 'Go to homepage',
};

export const PROJECT_MODAL = {
  addCompany: 'Add Company',
  addYourSkill: 'Add your Skill',
  environment: 'Environment',
  responsibilities: 'Responsibilities',
};

export const COMPANY_MODAL = {
  position: 'Position:',
  positionLevel: 'Position level:',
  company: 'Company:',
};

export const ONLY_LATIN_LETTERS = 'Please use only Latin letters';
export const NO_OPTIONS = 'No options?';

export const POSITION = {
  levelPosition: 'Level position',
  role: 'I am currently working in this role',
  userPosition: 'Current position',
  positionName: 'Position name',
};

export const DOC_TYPE = {
  DOC: 'doc',
  PDF: 'pdf',
};
