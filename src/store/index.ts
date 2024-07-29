import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import projectReducer from './Projects/reducer';
import organizationsReducer from './Organizations/reducer';
import commonReducer from './Common/reducer';
import authReducer from './Auth/reducer';
import userReducer from './Users/reducer';
import marketplaceAccessReducer from './MarketplaceAccess/reducer';
import accessTokenMiddleware from './Middlewares/accessToken.middleware';
import mastercardReducer from './Mastercard/reducer';
import nftReducer from './Nft/reducer';

const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
    users: userReducer,
    projects: projectReducer,
    organizations: organizationsReducer,
    marketplaceAccess: marketplaceAccessReducer,
    mastercard: mastercardReducer,
    nft: nftReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(accessTokenMiddleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
