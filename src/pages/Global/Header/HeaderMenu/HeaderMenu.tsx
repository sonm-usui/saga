import React, { useMemo, useEffect, useState } from 'react';
import './HeaderMenu.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { appPaths } from '../../../../constants';
import { Logo } from '../../../../Components/UI/Logo/Logo';
import { useThemeModes } from '../../../../hook/useThemeModes';
import { useWidthBreakpoint } from '../../../../hook';
import BadgeComponent from '../../../../Components/UI/Badge/BadgeComponent';
import { Button } from '../../../../Components/UI';
import {
  ButtonBackgrounds,
  ButtonColors,
  ButtonSizes,
  ButtonTypes
} from '../../../../Components/UI/Button/enums';
import { useWeb3React } from '@web3-react/core';
import { truncateAddress } from '../../../../utils';
import { APP_ENVIRONMENTS, ROLES } from '../../../../config';
import { useSelector } from 'react-redux';
import { selectorGetUser } from '../../../../store/Auth/selectors';
import { message } from 'antd';
import { useAppDispatch } from '../../../../store';
import { actionLogout } from '../../../../store/Auth/actions';
import { ADMIN_MENU_HEADER, DONOR_MENU_HEADER, ORG_MENU_HEADER, PUBLIC_MENU_HEADER } from './menu';
import { filter, isEmpty, replace } from 'lodash';
import { SurveyModal } from '../../../../Components';
import { selectorGetListMarketplaceApprove } from '../../../../store/MarketplaceAccess/selectors';
import { marketplaceAccessService } from '../../../../services';
import BillyLight from '../../../../assets/images/svgs/BillyLight';
import BillyDark from '../../../../assets/images/svgs/BillyDark';

const { REFRESH_TOKEN, CONNECTOR_NAME } = APP_ENVIRONMENTS;

interface HeaderMenuProps {
  connectWallet: () => void;
}

interface MenuHeader {
  value: string;
  path: string;
  image: React.ReactNode;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ connectWallet }) => {
  const user = useSelector(selectorGetUser);
  const [selected, setSelected] = useState<string>('');
  const [showMenuMobile, setShowMenuMobile] = useState<boolean>(false);
  const [menus, setMenus] = useState<MenuHeader[]>(PUBLIC_MENU_HEADER);
  const [isOpen, setIsOpen] = useState(false);
  const listMarketplace: any = useSelector(selectorGetListMarketplaceApprove);
  const { getListMarketplaceApprove } = marketplaceAccessService();

  const { deactivate } = useWeb3React();
  const dispatch = useAppDispatch();

  const themes = useThemeModes();
  const breakpoint = useWidthBreakpoint(1200);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onNavigate = (value: string, path: string) => {
    setSelected(value);
    navigate(path);
  };

  const generateClassNameAccordingTheme = useMemo(() => {
    if (themes.isDarkMode) {
      return 'dark';
    }
    if (themes.isPurpleMode) {
      return 'purple';
    }
    return 'light';
  }, [themes]);

  useEffect(() => {
    if (user?.role === ROLES.ADMIN) {
      return setMenus(ADMIN_MENU_HEADER);
    }
    if (user?.role === ROLES.ORG) {
      const orgMenu = ORG_MENU_HEADER.map((item: MenuHeader) => {
        if (item.value === 'dashboard') {
          return {
            ...item,
            path: `${replace(
              appPaths.adminOrganisationsDetail.path,
              ':key',
              user?.organization_key
            )}`
          };
        }
        return item;
      });
      return setMenus(orgMenu);
    }
    if (user?.role === ROLES.DONOR) {
      if (isEmpty(listMarketplace)) {
        return setMenus(filter(DONOR_MENU_HEADER, (item: any) => item.value !== 'marketplace'));
      }
      return setMenus(DONOR_MENU_HEADER);
    }
    return setMenus(PUBLIC_MENU_HEADER);
  }, [user, listMarketplace]);

  useEffect(() => {
    if (user?.role === ROLES.DONOR) {
      getListMarketplaceApprove();
    }
  }, [user]);

  useEffect(() => {
    const menuSelected = menus.find((item: MenuHeader) => item.path === pathname);
    if (menuSelected) setSelected(menuSelected.value);
  }, [navigate]);

  const renderButtonConnectWallet = (className?: string) => {
    if (user?.digital_wallet_address) {
      return (
        <BadgeComponent
          count={
            <span className="badge cursor-pointer" onClick={() => handleLogout()}>
              Logout
            </span>
          }
          className={`badge-wrapper-${className}`}>
          <Button
            type={ButtonTypes.filled}
            size={ButtonSizes.small}
            color={ButtonColors.white}
            background={ButtonBackgrounds.black}
            className="btn-connect">
            {truncateAddress({
              address: user?.digital_wallet_address,
              countFirst: 3,
              countEnd: 4
            })}
          </Button>
        </BadgeComponent>
      );
    }
    return (
      <BadgeComponent className={`badge-wrapper-${className}`}>
        <Button
          type={ButtonTypes.filled}
          size={ButtonSizes.small}
          color={ButtonColors.white}
          background={ButtonBackgrounds.black}
          className="btn-connect"
          onClick={connectWallet}>
          Log In
        </Button>
      </BadgeComponent>
    );
  };

  const handleLogout = () => {
    const refresh_token = localStorage.getItem(REFRESH_TOKEN);
    if (!refresh_token) return;
    dispatch(
      actionLogout({
        params: { refresh_token },
        callback: (isSuccess) => {
          if (isSuccess) {
            message.success('Logout success');
            deactivate();
            localStorage.removeItem(CONNECTOR_NAME);
          }
        }
      })
    );
  };

  const handleMenuClick = (value: string, path: string) => {
    setSelected(value);
    onNavigate(value, path);
    if (breakpoint) {
      setShowMenuMobile(false);
    }
  };

  return (
    <div className="header-menu" id="header-menu">
      <div className="container">
        <div className="header-menu-wrapper">
          <div className="header-menu-left-center">
            <div
              className={`header-menu__center ${
                showMenuMobile ? 'show' : ''
              } ${generateClassNameAccordingTheme}`}>
              {menus.map(({ image, value, path }, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (value === 'Register') {
                      setIsOpen(true);
                      setSelected(value);
                    } else {
                      handleMenuClick(value, path);
                    }
                  }}
                  className={`header-menu__center-item ${
                    selected === value ? 'header-menu__center-item-selected ' : ''
                  } ${image ? 'header-menu__center-item-home' : ''}`}>
                  {image && image}
                  {value && <>{value}</>}
                </div>
              ))}
              {renderButtonConnectWallet('mobile')}
            </div>
          </div>

          <Link to={'/'}>
            <div className="billy">
              {themes.isDarkMode || themes.isPurpleMode ? <BillyDark /> : <BillyLight />}
            </div>
          </Link>

          <div className="header-menu__right">
            <div
              className={`menubar-toggle ${showMenuMobile ? 'show' : ''}`}
              onClick={() => setShowMenuMobile(!showMenuMobile)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            {renderButtonConnectWallet('desktop')}
          </div>
        </div>
      </div>
      {isOpen && <SurveyModal onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default HeaderMenu;
