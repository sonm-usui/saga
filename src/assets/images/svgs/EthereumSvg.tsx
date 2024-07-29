import React from 'react';

const EthereumSvg = (props: { fill?: string }) => {
  return (
    <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9961 10.1875L6.06248 13.8125L0.125 10.1875L6.06248 0L11.9961 10.1875ZM6.06248 14.9765L0.125 11.3515L6.06248 19.9999L12 11.3515L6.06248 14.9765Z"
        fill={props?.fill || 'white'}
      />
    </svg>
  );
};

export default EthereumSvg;
