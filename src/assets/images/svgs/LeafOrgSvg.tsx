import React from 'react';
interface Props {
  className?: string;
  fill?: string;
}

const LeafOrgSvg: React.FC<Props> = ({ className = '', fill = '#1D1B1E' }) => {
  return (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_0_646" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="22">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.949219 0.5H18.0001V21.7224H0.949219V0.5Z"
          fill="white"
          className={className}
        />
      </mask>
      <g mask="url(#mask0_0_646)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.981489 0.508628C0.981489 0.508628 10.8333 -0.0187225 16.6101 7.17237C19.6064 10.8878 16.8258 14.8429 16.8258 14.8429C16.8258 14.8429 15.5554 11.6068 12.7029 8.85029C8.93967 5.20693 6.90211 4.94326 6.90211 4.94326C6.90211 4.94326 8.19642 5.5905 12.5831 9.97702C15.2438 12.6375 16.2746 16.6408 16.3704 17.6715C16.4903 18.8461 16.0348 21.5307 16.0348 21.5307C16.0348 21.5307 15.843 21.9621 15.1239 21.5307C13.7816 20.6917 14.5486 20.2603 14.5486 20.2603C14.5486 20.2603 16.0347 19.1097 15.5792 17.4078C15.4113 16.8085 15.2436 16.305 15.0518 15.8737C13.4698 16.1135 9.65853 16.305 6.18284 13.1172C0.214239 7.67591 0.981289 0.508788 0.981289 0.508788L0.981489 0.508628Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

export default LeafOrgSvg;
