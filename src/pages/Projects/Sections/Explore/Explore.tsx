import React from 'react';
import { BadgeComponent } from '../../../../Components/UI';
import './Explore.scss';

const LOCATION = [
  { key: 1, value: 'Thai' },
  { key: 3, value: 'Paraguay' },
  { key: 4, value: 'Zambia' }
];

interface Props {
  explore: string;
  totalProjects: number;
  onChangeExplore: (value: string) => void;
}

const styleBadge = {
  transform: 'translate(100%, 0%)'
};

const Explore = (props: Props) => {
  const { explore, onChangeExplore, totalProjects } = props;
  return (
    <div className="explore">
      <p className="explore-title">Explore by:</p>
      <div className="explore-list-container">
        <BadgeComponent
          count={
            <p className={`explore-badge ${explore === 'All' ? 'explore-badge-selected' : ''}`}>
              {totalProjects}
            </p>
          }
          style={styleBadge}>
          <div
            onClick={() => onChangeExplore('All')}
            className={`explore-item ${explore === 'All' ? 'explore-item-selected' : ''}`}>
            All projects
          </div>
        </BadgeComponent>
        <div className="explore-list">
          {LOCATION.map((item) => (
            <div
              key={item.key}
              onClick={() => onChangeExplore(item.value)}
              className={`explore-item ${explore === item.value ? 'explore-item-selected' : ''}`}>
              {item.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
