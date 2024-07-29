import React, { useMemo } from 'react';
import './Footer.scss';
import { Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import LinkedSvg from '../../../assets/images/svgs/LinkedSvg';
import TwitterSvg from '../../../assets/images/svgs/TwitterSvg';
import MenuFooter from './MenuFooter/MenuFooter';
import BlackCoala from '../../../assets/images/svgs/BlackCoala';
import { SITE_LINKS } from '../../../config';

const MENU_FOOTER = [
  {
    title: 'About Us',
    items: [
      { value: 'Who We Are', path: '' },
      { value: 'Our Impact', path: '' },
      { value: 'Faq', path: '' }
    ]
  },
  {
    title: 'Get started',
    items: [
      { value: 'Fund a Project', path: '' },
      { value: 'Propose a Project', path: '' }
    ]
  },
  {
    title: 'Contact',
    items: [
      { value: 'Level2, 11 York Street,', path: '' },
      { value: 'New Your City', path: '' },
      { value: '+1 (123) 987 9663', path: '' }
    ]
  },
  {
    title: 'Info',
    items: [
      { value: 'Contact Us', path: '' },
      { value: 'Privacy Policy', path: '' },
      { value: 'Terms & Conditions', path: '' },
      { value: 'Do No Harm ', path: '' }
    ]
  }
];

export const Footer: React.FC = () => {
  const getYear = useMemo(() => {
    const date = new Date();
    return date.getFullYear();
  }, []);

  return (
    <div className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__top-container">
            <div className="footer__top-left">
              <div className="footer-logo">
                <BlackCoala className="coala-svg" />
              </div>
              <p>
                Want fresh funding opportunities in your inbox? Enter your email to join our mailing
                list.
              </p>
              <Input placeholder="Email" suffix={<ArrowRightOutlined />} />
              <div className="footer__top-left-social">
                <a href={SITE_LINKS.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedSvg />
                </a>
                <a href={SITE_LINKS.social.twitter} target="_blank" rel="noopener noreferrer">
                  <TwitterSvg />
                </a>
              </div>
            </div>

            <div className="footer__top-right">
              <MenuFooter menus={MENU_FOOTER} />
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-text">
            Contact Us: <a href="mailto:hello@coalapay.org">hello@coalapay.org</a>
          </div>
          <div className="footer__bottom-text">© Coala Pay {getYear}</div>
          <div className="footer__bottom-text">
            driven by <span>pellartech</span>
          </div>
        </div>
      </div>
    </div>
  );
};
