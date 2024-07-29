import React from 'react';
interface CalendarSvgProps {
  fill?: string;
  className?: string;
}

const CalendarSvg: React.FC<CalendarSvgProps> = ({ fill = '#1D1B1E', className = '' }) => {
  return (
    <svg
      width="25"
      height="22"
      viewBox="0 0 25 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.126953 0.435547H18.8422V6.26254H0.126953V0.435547Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.126953 8.01074H24.6692V13.8377H0.126953V8.01074Z"
        fill={fill}
        fillOpacity="0.2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.126953 15.5859H24.6692V21.4129H0.126953V15.5859Z"
        fill={fill}
        fillOpacity="0.2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.8418 0.435547H24.6688V6.26254H18.8418V0.435547Z"
        fill={fill}
        fillOpacity="0.2"
      />
    </svg>
  );
};

export default CalendarSvg;
