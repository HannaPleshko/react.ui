import { createSlice } from '@reduxjs/toolkit';
import { ISkillItem } from './../../types/skills';

export interface ResumeState {
  id?: string;
  header: Header;
  skills: Skills;
  experience: ProfessionalExperience[];
  education: string[];
  filename: string;
}

export interface Header {
  firstName: string;
  lastName: string;
  userPosition: string;
  positionLevel: string;
  profile: string[];
}

export interface Languages {
  language: string;
  level: string;
}

export interface Skills {
  operatingSystems: string[];
  languages: Languages[];
}
export interface Project {
  userPosition: string;
  positionLevel: string;
  description: string;
  responsibilities: string[];
  environment: ISkillItem[];
  id: number;
}

export interface ProfessionalExperience {
  userPosition: string;
  positionLevel: string;
  companyName: string;
  startDate: string | null;
  endDate: string | null;
  id: number;
  isCheckedCurrentWork: boolean;
  projects: Project[];
}
export interface CompanyProject {
  position: string;
  description: string;
  responsibilities: string[];
  environment: string[];
  id: number;
}

const initialState: ResumeState = {
  header: {
    firstName: '',
    lastName: '',
    userPosition: '',
    positionLevel: '',
    profile: [],
  },
  skills: {
    operatingSystems: [],
    languages: [],
  },
  education: [],
  experience: [],
  filename: '',
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    resetResumeSlice: () => initialState,
    setFirstName: (state, action) => {
      state.header.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.header.lastName = action.payload;
    },
    setUserPosition: (state, action) => {
      state.header.userPosition = action.payload;
    },
    setLevelPosition: (state, action) => {
      state.header.positionLevel = action.payload;
    },
    addOperatingSystem: (state, action) => {
      state.skills.operatingSystems.push(action.payload);
    },
    removeOperatingSystem: (state, action) => {
      state.skills.operatingSystems = state.skills.operatingSystems.filter(
        (item) => item !== action.payload
      );
    },
    setProfile: (state, action) => {
      state.header.profile = action.payload;
    },
    setEducation: (state, action) => {
      state.education = action.payload;
    },
    addLanguages: (state, action) => {
      const index = state.skills.languages.findIndex((item) => {
        return action.payload.language === item.language;
      });
      if (index === -1) {
        state.skills.languages.push(action.payload);
      }
    },
    removeLanguages: (state, action) => {
      state.skills.languages = state.skills.languages.filter((item) => {
        const key = item.language + item.level;
        return key !== action.payload;
      });
    },
    addExperience: (state, action) => {
      state.experience.push(action.payload);
    },
    editExperience: (state, action) => {
      const index = state.experience.findIndex((item) => {
        return item.id === action.payload.id;
      });
      state.experience[index] = { ...action.payload };
    },
    removeExperience: (state, action) => {
      state.experience = state.experience.filter((item) => {
        return item.id !== action.payload.id;
      });
    },
    removeProject: (state, action) => {
      state.experience = state.experience.map((itemObj) => {
        return {
          ...itemObj,
          projects: itemObj.projects.filter((projItem) => {
            return projItem.id !== action.payload;
          }),
        };
      });
    },
    editProject: (state, action) => {
      state.experience = state.experience.map((itemObj) => {
        return {
          ...itemObj,
          projects: itemObj.projects.map((projItem) => {
            if (projItem.id === action.payload.id) {
              return (projItem = { ...action.payload });
            }
            return projItem;
          }),
        };
      });
    },
    setResumeFileName: (state, action) => {
      state.filename = action.payload;
    },
  },
});

export const {
  resetResumeSlice,
  setFirstName,
  setLastName,
  setUserPosition,
  setLevelPosition,
  addOperatingSystem,
  removeOperatingSystem,
  setProfile,
  setEducation,
  addLanguages,
  removeLanguages,
  addExperience,
  removeExperience,
  editExperience,
  setResumeFileName,
  removeProject,
  editProject,
} = resumeSlice.actions;

export default resumeSlice.reducer;
