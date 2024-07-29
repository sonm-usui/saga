import React from 'react';
import { BadgeComponent } from '../../../Components/UI';
import './HomeMenu.scss';
import { Link } from 'react-router-dom';
import { appPaths } from '../../../constants';

const HOME_MENU = [
  { value: 'Find & Fund', path: '/' },
  { value: 'Propose', path: '/' },
  { value: 'Library', path: '/' },
  { value: 'About', path: appPaths.about.path }
];

const styleBadge = {
  transform: 'translate(125%, -50%)'
};

const HomeMenu = () => {
  return (
    <div className="homeMenu">
      {HOME_MENU.map((item, index) => {
        return item.value === 'Find & Fund' ? (
          <BadgeComponent
            count={<p className="homeMenu-badge">14</p>}
            style={styleBadge}
            key={index}>
            <div className="homeMenu__item">
              <Link to={item.path}>{item.value}</Link>
            </div>
          </BadgeComponent>
        ) : (
          <div key={index} className="homeMenu__item">
            <Link to={item.path}>{item.value}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default HomeMenu;
