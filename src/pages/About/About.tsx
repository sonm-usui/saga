import { useEffect, useRef, useState } from 'react';
import './About.scss';
import Diligence from './Section/Diligence/Diligence';
import Partners from './Section/Partners/Partners';
import WhatWeDo from './Section/WhatWeDo/WhatWeDo';
import WhyWeb3 from './Section/WhyWeb3/WhyWeb3';
import Funding from './Section/OurFunding/Funding';
import { SurveyModal } from '../../Components';
import billyLeaf from '../../assets/images/pngs/billy-leaf.png';
import leaf from '../../assets/images/pngs/leaf-green.png';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { useAboutUsTheme } from '../../context/AboutUsThemeContext';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';

const MENU_ABOUT = [
  {
    key: 0,
    offset_desktop: 75,
    offset_mobile: 140,
    value: 'funding',
    link: 'funding',
    theme: 'purple'
  },
  {
    key: 1,
    offset_desktop: 75,
    offset_mobile: 150,
    value: 'partners',
    link: 'partners',
    theme: 'dark'
  },
  {
    key: 2,
    offset_desktop: 130,
    offset_mobile: 135,
    value: 'what we do',
    link: 'whatwedo',
    theme: 'default'
  },
  {
    key: 3,
    offset_desktop: 130,
    offset_mobile: 135,
    value: 'due diligence',
    link: 'diligence',
    theme: 'default'
  },
  {
    key: 4,
    offset_desktop: 130,
    offset_mobile: 150,
    value: 'why web3?',
    link: 'whyweb3',
    theme: 'dark'
  }
];

const SCROLL_OFFSET = 150;
const MAX_VIEW_WIDTH = 1774;
const MAX_CONTENT_WIDTH = 1440;
const PADDING = 334;
const SCROLL_OFFSET_MOBILE = 1000;
const VIEW_WIDTH_MOBILE = 1200;

const About = () => {
  const [isMenuScrolling, setIsMenuScrolling] = useState(false);
  const menuRef = useRef(null);
  const { setAboutUsTheme, aboutUsTheme } = useAboutUsTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<number>(999);
  const { scrollYProgress } = useViewportScroll();

  const width = useTransform(
    scrollYProgress,
    [0, 0.06],
    [
      `${window.innerWidth > MAX_VIEW_WIDTH ? MAX_CONTENT_WIDTH : window.innerWidth - PADDING}px`,
      `${window.innerWidth + 50}px`
    ]
  );
  const borderRadius = useTransform(scrollYProgress, [0, 0.06], ['10px', `0px`]);

  const handleScrollToElement = (elementId: string) => {
    const selectedItem = MENU_ABOUT.find((item) => item.link === elementId);
    setAboutUsTheme(selectedItem?.theme || 'default');
    const element = document.getElementById(elementId);
    if (element && selectedItem) {
      const elementPosition =
        element.getBoundingClientRect().top +
        window.pageYOffset -
        (window.innerWidth > VIEW_WIDTH_MOBILE
          ? selectedItem?.offset_desktop
          : selectedItem?.offset_mobile || SCROLL_OFFSET_MOBILE);
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      handleMenuScroll(selectedItem?.key || 999);
    }
  };

  window.addEventListener('scroll', () => {
    const about = document.querySelector('.about');
    const billy = document.querySelector('.billy-background');
    const funding = document.querySelector('.funding');
    const partners = document.querySelector('.partners');
    const whatwedo = document.querySelector('.whatwedo');
    const diligence = document.querySelector('.diligence');
    const whyweb3 = document.querySelector('.whyweb3');

    if (billy instanceof HTMLElement) {
      if (window.scrollY >= billy.offsetTop - SCROLL_OFFSET) {
        setSelected(999);
        setAboutUsTheme('default');
      }
    }

    if (about instanceof HTMLElement) {
      if (window.scrollY >= about.offsetTop - SCROLL_OFFSET) {
        setSelected(999);
        setAboutUsTheme('purple');
      }
    }

    if (funding instanceof HTMLElement) {
      if (window.scrollY >= funding.offsetTop - SCROLL_OFFSET) {
        setSelected(0);
        setAboutUsTheme('purple');
      }
    }
    if (partners instanceof HTMLElement) {
      if (window.scrollY >= partners.offsetTop - SCROLL_OFFSET) {
        setSelected(1);
        setAboutUsTheme('dark');
      }
    }
    if (whatwedo instanceof HTMLElement) {
      if (window.scrollY >= whatwedo.offsetTop - SCROLL_OFFSET) {
        setSelected(2);
        setAboutUsTheme('default');
      }
    }
    if (diligence instanceof HTMLElement) {
      if (window.scrollY >= diligence.offsetTop - SCROLL_OFFSET) {
        setSelected(3);
        setAboutUsTheme('default');
      }
    }
    if (whyweb3 instanceof HTMLElement) {
      if (window.scrollY >= whyweb3.offsetTop - SCROLL_OFFSET) {
        setSelected(4);
        setAboutUsTheme('dark');
      }
    }
  });

  useEffect(() => {
    handleMenuScroll(selected);
  }, [selected]);

  const handleMenuScroll = (key: number) => {
    if (isMenuScrolling) return;
    setIsMenuScrolling(true);
    const menu = menuRef.current as unknown as HTMLElement;
    const element = document.getElementById(`menu-${key}`);
    if (element) {
      const elementWidth = element.getBoundingClientRect().width;
      const menuWidth = menu.getBoundingClientRect().width;
      const menuScrollLeft = menu.scrollLeft;
      const menuCenter = menuScrollLeft + menuWidth / 2;
      const elementLeft = element.offsetLeft;
      const elementRight = elementLeft + elementWidth;

      let scrollToCenter;
      if (elementLeft < menuCenter && elementRight > menuCenter) {
        scrollToCenter = menuScrollLeft;
      } else if (elementLeft < menuCenter) {
        scrollToCenter = elementLeft;
      } else {
        scrollToCenter = elementRight - menuWidth;
      }
      if (scrollToCenter < menuScrollLeft || key === 0) {
        scrollToCenter = 0;
      }

      menu.scrollTo({
        left: scrollToCenter,
        behavior: 'smooth'
      });
    }

    setTimeout(() => {
      setIsMenuScrolling(false);
    }, 1000);
  };

  const onNavClick = (amount: number) => {
    if (selected === 0 && amount === -1) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    const current = MENU_ABOUT.findIndex((item) => item.key === selected);
    if (current + amount < 0 || current + amount >= MENU_ABOUT.length) return;
    const selectedItem = MENU_ABOUT[current + amount];
    handleScrollToElement(selectedItem.link);
  };

  return (
    <div className="about-container">
      {isOpen && <SurveyModal onClose={() => setIsOpen(false)} />}
      <div className={`about-menu ${aboutUsTheme}`}>
        <LeftCircleOutlined onClick={() => onNavClick(-1)} className={`nav-btn ${aboutUsTheme}`} />

        <div className="container" ref={menuRef}>
          {MENU_ABOUT.map((item) => (
            <a
              id={`menu-${item.key}`}
              key={item.key}
              className={`about-menu-item ${aboutUsTheme} ${
                selected === item.key ? 'about-menu-item-selected' : ''
              }`}
              onClick={() => handleScrollToElement(item.link)}>
              {item.value}
            </a>
          ))}
        </div>
        <RightCircleOutlined onClick={() => onNavClick(1)} className={`nav-btn ${aboutUsTheme}`} />
      </div>
      <div className="title-container container">
        <div className="title-main">
          We make moving aid money simple, borderless, and programmable.
        </div>
      </div>

      <motion.div className="about">
        <motion.div className="about-inner" style={{ width }}>
          <motion.div
            className="billy-background"
            style={{
              borderRadius
            }}>
            <div className="top"></div>
            <img className="billy-leaf" src={billyLeaf} alt="" />
            <img className="leaf" src={leaf} alt="" />
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="section">
        <Funding />
      </div>
      <div className="section">
        <Partners />
      </div>
      <div className="section">
        <WhatWeDo />
      </div>
      <div className="section">
        <Diligence setIsOpen={setIsOpen} />
      </div>
      <div className="section">
        <WhyWeb3 />
      </div>
    </div>
  );
};

export default About;
