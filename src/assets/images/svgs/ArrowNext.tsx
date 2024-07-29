import React from 'react';
interface Props {
  className?: string;
}

const ArrowNext: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path d="M0.450195 5.33105H12.0001" stroke="#2C2830" strokeWidth="2" />
      <path d="M7.66943 1L12.0006 5.45495L7.66943 9.6624" stroke="#2C2830" strokeWidth="2" />
    </svg>
  );
};

export default ArrowNext;
