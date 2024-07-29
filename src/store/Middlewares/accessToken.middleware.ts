import { Middleware } from '@reduxjs/toolkit';
import { APP_ENVIRONMENTS } from '../../config';
import {
  GET_CURRENT_USER_FULFILLED,
  GET_CURRENT_USER_REJECTED,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  LOGOUT_FULLFILLED
} from '../Auth/actions';
const { USER, ACCESS_TOKEN, REFRESH_TOKEN } = APP_ENVIRONMENTS;

const accessTokenMiddleware: Middleware = () => (next) => (action) => {
  switch (action.type) {
    case LOGIN_FULFILLED: {
      const { user, access_token, refresh_token } = action.payload;
      localStorage.setItem(USER, JSON.stringify(user));
      localStorage.setItem(ACCESS_TOKEN, access_token);
      localStorage.setItem(REFRESH_TOKEN, refresh_token);
      break;
    }

    case GET_CURRENT_USER_FULFILLED: {
      localStorage.setItem(USER, JSON.stringify(action.payload));
      break;
    }

    case LOGIN_REJECTED:
    case GET_CURRENT_USER_REJECTED:
    case LOGOUT_FULLFILLED: {
      localStorage.removeItem(USER);
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      break;
    }
  }
  next(action);
};

export default accessTokenMiddleware;
