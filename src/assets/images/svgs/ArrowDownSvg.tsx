import React from 'react';
interface Props {
  className?: string;
  fill?: string;
}

const ArrowDownSvg: React.FC<Props> = ({ className = '', fill = '#B2FF00' }) => {
  return (
    <svg
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        d="M15.5039 1.15625L14.8359 0.453125C14.6602 0.277344 14.3789 0.277344 14.2383 0.453125L7.875 6.81641L1.47656 0.453125C1.33594 0.277344 1.05469 0.277344 0.878906 0.453125L0.210938 1.15625C0.0351562 1.29688 0.0351562 1.57812 0.210938 1.75391L7.55859 9.10156C7.73438 9.27734 7.98047 9.27734 8.15625 9.10156L15.5039 1.75391C15.6797 1.57812 15.6797 1.29688 15.5039 1.15625Z"
        fill={fill}
      />
    </svg>
  );
};

export default ArrowDownSvg;
