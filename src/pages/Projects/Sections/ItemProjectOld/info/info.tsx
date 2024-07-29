import React from 'react';
import './info.scss';

interface IProps {
  image: React.ReactNode | string;
  value: React.ReactNode | string;
}

const InfoProject = (props: IProps) => {
  const { image, value } = props;
  return (
    <div className="info-project">
      {typeof image === 'string' ? (
        <p className="info-project-title">{image}</p>
      ) : (
        <div className="info-project-height">{image}</div>
      )}
      {typeof value === 'string' ? (
        <p className="info-project-value">{value}</p>
      ) : (
        <div className="info-project-height">{value}</div>
      )}
    </div>
  );
};

export default InfoProject;
