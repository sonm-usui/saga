import React from 'react';

interface Props {
  className?: string;
  fill?: string;
}

export const TelegramSvg: React.FC<Props> = ({ className, fill = '#1D1B1E' }) => {
  return (
    <svg
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <g clipPath="url(#clip0_1485_69682)">
        <path
          d="M8.00073 1C3.58138 1 0.000732422 4.58065 0.000732422 9C0.000732422 13.4194 3.58138 17 8.00073 17C12.4201 17 16.0007 13.4194 16.0007 9C16.0007 4.58065 12.4201 1 8.00073 1ZM11.9298 6.48064L10.6169 12.6677C10.5201 13.1065 10.2588 13.2129 9.89428 13.0065L7.89428 11.5323L6.92976 12.4613C6.82331 12.5677 6.73299 12.6581 6.52654 12.6581L6.66847 10.6226L10.3749 7.27419C10.5362 7.13226 10.3394 7.05161 10.1265 7.19355L5.54589 10.0774L3.5717 9.46129C3.14267 9.32581 3.13299 9.03226 3.66202 8.82581L11.3749 5.85161C11.733 5.72258 12.0459 5.93871 11.9298 6.48064Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_1485_69682">
          <rect
            width="16"
            height="16.5161"
            fill="white"
            transform="translate(0.000732422 0.742188)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
