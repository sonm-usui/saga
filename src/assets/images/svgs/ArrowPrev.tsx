import React from 'react';
interface Props {
  className?: string;
}

const ArrowPrev: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path d="M13.5503 5.33105L2.00042 5.33105" stroke="#2C2830" strokeWidth="2" />
      <path
        d="M6.33105 9.66211L1.99985 5.20716L6.33105 0.999709"
        stroke="#2C2830"
        strokeWidth="2"
      />
    </svg>
  );
};

export default ArrowPrev;
