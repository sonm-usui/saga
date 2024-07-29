import { IEnv } from '../types/Env.type';
import { PRODUCTION_ENVIRONMENTS } from './environments/production';
import { STAGE_ENVIRONMENTS } from './environments/stage';

export const APP_ENVIRONMENTS = {
  production: PRODUCTION_ENVIRONMENTS,
  stage: STAGE_ENVIRONMENTS
}[process.env.REACT_APP_CONFIG_ENV || 'stage'] as IEnv; //
