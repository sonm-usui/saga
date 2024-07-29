import React from 'react';
interface Props {
  className?: string;
}

const FacebookSvg: React.FC<Props> = ({ className = '' }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        d="M17.7188 9.25C17.7188 4.43359 13.8164 0.53125 9 0.53125C4.18359 0.53125 0.28125 4.43359 0.28125 9.25C0.28125 13.6094 3.44531 17.2305 7.62891 17.8633V11.7812H5.41406V9.25H7.62891V7.35156C7.62891 5.17188 8.92969 3.94141 10.8984 3.94141C11.8828 3.94141 12.8672 4.11719 12.8672 4.11719V6.26172H11.7773C10.6875 6.26172 10.3359 6.92969 10.3359 7.63281V9.25H12.7617L12.375 11.7812H10.3359V17.8633C14.5195 17.2305 17.7188 13.6094 17.7188 9.25Z"
        fill="#1D1B1E"
      />
    </svg>
  );
};

export default FacebookSvg;
