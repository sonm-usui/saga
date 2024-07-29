import { createReducer } from '@reduxjs/toolkit';
import {
  actionLeavePostSupport,
  actionLeavePostSurvey,
  actionPostSupport,
  actionPostSurvey
} from './actions';

interface IProjectsState {
  errors: {
    survey: unknown;
    support: unknown;
  };
}

const initialState: IProjectsState = {
  errors: {
    survey: undefined,
    support: undefined
  }
};

export default createReducer(initialState, (builder) => {
  builder
    // actionPostSurvey
    .addCase(actionPostSurvey.rejected, (state, action) => {
      state.errors.survey = (action.payload as any)?.error;
    })
    .addCase(actionLeavePostSurvey, (state, action) => {
      state.errors.survey = undefined;
    })

    // actionPostSupport
    .addCase(actionPostSupport.rejected, (state, action) => {
      state.errors.support = (action.payload as any)?.error;
    })
    .addCase(actionLeavePostSupport, (state, action) => {
      state.errors.support = undefined;
    });
});
