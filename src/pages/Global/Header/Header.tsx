import React, { useEffect, useState } from 'react';
import EthereumSvg from '../../../assets/images/svgs/EthereumSvg';
import InfoHeaderSvg from '../../../assets/images/svgs/InfoHeaderSvg';
import './Header.scss';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import ConnectWallet from '../../../Components/ConnectWallet/ConnectWallet';
import { AccountBalance } from '../../../Components/Shared';
import { useWeb3React } from '@web3-react/core';
import { ConnectorName, activateInjectedProvider } from '../../../utils';
import { APP_ENVIRONMENTS } from '../../../config';
import connectors from '../../../utils/connector';

export const Header: React.FC = () => {
  const [className, setClassName] = useState<string>('');
  const [isOpenModalConnect, setIsOpenModalConnect] = useState<boolean>(false);
  const { activate } = useWeb3React();

  useEffect(() => {
    const loadGoogleTranslate = () => {
      const anyWindow = window as any;

      anyWindow.googleTranslateElementInit = () => {
        if (
          anyWindow.google &&
          anyWindow.google.translate &&
          anyWindow.google.translate.TranslateElement
        ) {
          new anyWindow.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              layout: anyWindow.google.translate.TranslateElement.InlineLayout.SIMPLE
            },
            'google_translate_element'
          );
        }
      };

      const loadScript = () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        script.onload = anyWindow.googleTranslateElementInit;
        document.body.appendChild(script);
      };

      if (!anyWindow.google || !anyWindow.google.translate) {
        loadScript();
      } else {
        anyWindow.googleTranslateElementInit();
      }

      const intervalId = setInterval(() => {
        const translateElement = document.getElementById('google_translate_element');
        if (translateElement && translateElement.childElementCount === 0) {
          anyWindow.googleTranslateElementInit();
        } else {
          clearInterval(intervalId);
        }
      }, 3000);

      return () => clearInterval(intervalId);
    };

    loadGoogleTranslate();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const header = document.getElementById('header');
      if (header) {
        const classNames = header.className;
        if (scrollY > 50) {
          if (classNames === 'header purple') {
            setClassName('purple scroll');
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const autoConnectWallet = async () => {
    try {
      const connectorName = localStorage.getItem(APP_ENVIRONMENTS.CONNECTOR_NAME);
      if (!connectorName) return;

      if (
        connectorName === ConnectorName.Injected ||
        connectorName === ConnectorName.CoinbaseWallet
      ) {
        activateInjectedProvider(connectorName);
      }
      const currentConnector = connectors[connectorName];

      await activate(currentConnector, (error) => {
        localStorage.removeItem(APP_ENVIRONMENTS.CONNECTOR_NAME);
      });

      localStorage.setItem(APP_ENVIRONMENTS.CONNECTOR_NAME, connectorName);
    } catch (error) {
      localStorage.removeItem(APP_ENVIRONMENTS.CONNECTOR_NAME);
    }
  };

  useEffect(() => {
    autoConnectWallet();
  }, [activate]);

  return (
    <>
      <div id="header" className={`header ${className}`}>
        <div className="header-container">
          <div className="header-top" id="header-top">
            <div className="container">
              <div className="header-top-wrapper">
                <div className="header__left">
                  <div id="google_translate_element"></div>
                </div>

                <div className="header__center">Better Aid for Everybody</div>

                <div className="header__right">
                  <div className="header__right-frame">
                    <InfoHeaderSvg />
                    <p>0</p>
                  </div>
                  <div className="header__right-space" />
                  <div className="header__right-frame">
                    <AccountBalance />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <HeaderMenu connectWallet={() => setIsOpenModalConnect(true)} />
          </div>
        </div>
      </div>
      {<ConnectWallet open={isOpenModalConnect} onClose={() => setIsOpenModalConnect(false)} />}
    </>
  );
};
