import React, { useEffect, useMemo, useState } from 'react';
import './DefaultLayout.scss';
import { Outlet, matchPath, useLocation } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { SurveyModal } from '../../../Components';
import { appPaths } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../store';
import { actionGetCurrentUser } from '../../../store/Auth/actions';
import { APP_ENVIRONMENTS } from '../../../config';
import { message } from 'antd';
import { selectorGetUser } from '../../../store/Auth/selectors';
import SupportModal from '../../../Components/Modals/SupportModal/SupportModal';
import logoImgDarkMode from '../../../assets/images/pngs/logo-dark.png';
message.config({
  top: 130
});

export const DefaultLayout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorGetUser);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSupport, setIsOpenSupport] = useState(false);
  // hide footer on pages
  const FOOTER_HIDDEN_PAGES_LIST = [appPaths.about.path];
  const showFooter = useMemo(() => {
    return FOOTER_HIDDEN_PAGES_LIST.some((path) => {
      return !matchPath(location.pathname, path);
    });
  }, [location]);

  useEffect(() => {
    if (location.pathname !== appPaths.about.path) {
      document!.getElementById('header-top')!.className = 'header-top';
      document!.getElementById('header-menu')!.className = 'header-menu';
      document.getElementById('logo-header')?.setAttribute('src', logoImgDarkMode);
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem(APP_ENVIRONMENTS.ACCESS_TOKEN);
    if (token) {
      dispatch(actionGetCurrentUser({}));
    }
  }, []);

  return (
    <div className="default-layout">
      <Header />
      <div className="default-layout__content">
        <Outlet />
      </div>
      {showFooter && <Footer />}

      {/* {user?.loaded ? (
        <>
          <div
            className={`${
              location?.pathname === appPaths.about.path ? 'get-involed-about' : ''
            } get-involed`}
            onClick={() => setIsOpenSupport(true)}>
            Support
          </div>
          {isOpenSupport && <SupportModal onClose={() => setIsOpenSupport(false)} />}
        </>
      ) : (
        <>
          <div
            className={`${
              location?.pathname === appPaths.about.path ? 'get-involed-about' : ''
            } get-involed`}
            onClick={() => setIsOpen(true)}>
            Get Involved
          </div>
          {isOpen && <SurveyModal onClose={() => setIsOpen(false)} />}
        </>
      )} */}
    </div>
  );
};
