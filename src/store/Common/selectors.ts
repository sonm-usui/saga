import { RootState } from '..';

export const selectorPostSurveyError = (state: RootState) => state.common.errors.survey;

export const selectorPostSupportError = (state: RootState) => state.common.errors.support;
