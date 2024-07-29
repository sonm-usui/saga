import React from 'react';
interface Props {
  className?: string;
}

const LocationSvg: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width="18"
      height="25"
      viewBox="0 0 18 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        d="M9 0C3.98438 0 0 4.07812 0 9C0 12.375 1.07812 13.4062 7.07812 22.9688C7.96875 24.375 9.98438 24.375 10.875 22.9688C16.875 13.4062 18 12.375 18 9C18 4.03125 13.9219 0 9 0ZM9 21.75C3 12.1875 2.25 11.5781 2.25 9C2.25 5.29688 5.25 2.25 9 2.25C12.7031 2.25 15.75 5.29688 15.75 9C15.75 11.5781 15 12.0938 9 21.75Z"
        fill="#1D1B1E"
      />
    </svg>
  );
};

export default LocationSvg;
