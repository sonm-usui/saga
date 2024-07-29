import React from 'react';
interface Props {
  className?: string;
  fill?: string;
}

const DotSvg: React.FC<Props> = ({ className, fill = '#B2FF00' }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="8" cy="8" rx="8" ry="8" fill={fill} />
      <ellipse cx="8" cy="8" rx="8" ry="8" fill={fill} />
      <ellipse cx="8" cy="8" rx="8" ry="8" fill={fill} />
      <ellipse cx="8" cy="8" rx="8" ry="8" fill={fill} />
    </svg>
  );
};

export default DotSvg;
