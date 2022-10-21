import { createSlice } from '@reduxjs/toolkit';
import { ResumeState } from './ResumeSlice';

interface ResumeUtilsState {
  resumes: ResumeState[];
  isResumeSaved: boolean;
}

const initialState: ResumeUtilsState = {
  resumes: [],
  isResumeSaved: false,
};

export const resumeUtilsSlice = createSlice({
  name: 'resumeUtils',
  initialState,
  reducers: {
    resetResumeUtilsSlice: () => initialState,
    removeResumeName: (state, action) => {
      state.resumes = state.resumes.filter((item) => item !== action.payload);
    },
    setResumes: (state, action) => {
      state.resumes = action.payload;
    },
    setResumeSaved: (state, action) => {
      state.isResumeSaved = action.payload;
    },
  },
});

export const {
  setResumes,
  resetResumeUtilsSlice,
  removeResumeName,
  setResumeSaved,
} = resumeUtilsSlice.actions;

export default resumeUtilsSlice.reducer;
