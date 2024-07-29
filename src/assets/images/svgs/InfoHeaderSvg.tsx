import React from 'react';

interface InfoHeaderSvgProps {
  fill?: string;
  className?: string;
}

const InfoHeaderSvg: React.FC<InfoHeaderSvgProps> = ({ fill = '#F3F3F3', className = '' }) => {
  return (
    <svg
      width="21"
      height="17"
      viewBox="0 0 21 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <mask
        id="mask0_10068_1894"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="21"
        height="17">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.0625 0H20.0625V16.0814H0.0625V0Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_10068_1894)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.28549 2.04763C5.28549 3.1784 4.36883 4.09526 3.23806 4.09526C2.10709 4.09526 1.19043 3.1784 1.19043 2.04763C1.19043 0.91686 2.10709 0 3.23806 0C4.36883 0 5.28549 0.91686 5.28549 2.04763"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.39544 11.7689V4.86621H1.08087V14.8251H0.0625V16.081H2.33702V11.7688H4.13919V16.081H6.41371V14.8251H5.39554L5.39544 11.7689Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.1107 2.04763C12.1107 3.1784 11.194 4.09526 10.063 4.09526C8.93228 4.09526 8.01562 3.1784 8.01562 2.04763C8.01562 0.91686 8.93229 0 10.063 0C11.194 0 12.1107 0.91686 12.1107 2.04763V2.04763Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.22 11.7689V4.86621H7.90606V14.8251H6.8877V16.081H9.1624V11.7688H10.9642V16.081H13.2387V14.8251H12.2201L12.22 11.7689Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.9349 2.04763C18.9349 3.1784 18.0182 4.09526 16.8873 4.09526C15.7565 4.09526 14.8398 3.1784 14.8398 2.04763C14.8398 0.91686 15.7565 0 16.8873 0C18.0182 0 18.9349 0.91686 18.9349 2.04763V2.04763Z"
          fill={fill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.0445 14.8261V4.86719H14.7303V14.8261H13.7119V16.082H15.9866V11.7697H17.7884V16.082H20.0631V14.8261H19.0445Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

export default InfoHeaderSvg;
