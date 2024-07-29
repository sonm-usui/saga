import React from 'react';
interface Props {
  className?: string;
  fillColor?: string;
}

const InstagramSvg: React.FC<Props> = ({ className, fillColor = '#F7F5F2' }) => {
  return (
    <svg
      width="28"
      height="27"
      viewBox="0 0 28 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        d="M14.125 7.01172C10.375 7.01172 7.38672 10.0586 7.38672 13.75C7.38672 17.5 10.375 20.4883 14.125 20.4883C17.8164 20.4883 20.8633 17.5 20.8633 13.75C20.8633 10.0586 17.8164 7.01172 14.125 7.01172ZM14.125 18.1445C11.7227 18.1445 9.73047 16.2109 9.73047 13.75C9.73047 11.3477 11.6641 9.41406 14.125 9.41406C16.5273 9.41406 18.4609 11.3477 18.4609 13.75C18.4609 16.2109 16.5273 18.1445 14.125 18.1445ZM22.6797 6.77734C22.6797 5.89844 21.9766 5.19531 21.0977 5.19531C20.2188 5.19531 19.5156 5.89844 19.5156 6.77734C19.5156 7.65625 20.2188 8.35938 21.0977 8.35938C21.9766 8.35938 22.6797 7.65625 22.6797 6.77734ZM27.1328 8.35938C27.0156 6.25 26.5469 4.375 25.0234 2.85156C23.5 1.32812 21.625 0.859375 19.5156 0.742188C17.3477 0.625 10.8438 0.625 8.67578 0.742188C6.56641 0.859375 4.75 1.32812 3.16797 2.85156C1.64453 4.375 1.17578 6.25 1.05859 8.35938C0.941406 10.5273 0.941406 17.0312 1.05859 19.1992C1.17578 21.3086 1.64453 23.125 3.16797 24.707C4.75 26.2305 6.56641 26.6992 8.67578 26.8164C10.8438 26.9336 17.3477 26.9336 19.5156 26.8164C21.625 26.6992 23.5 26.2305 25.0234 24.707C26.5469 23.125 27.0156 21.3086 27.1328 19.1992C27.25 17.0312 27.25 10.5273 27.1328 8.35938ZM24.3203 21.4844C23.9102 22.6562 22.9727 23.5352 21.8594 24.0039C20.1016 24.707 16 24.5312 14.125 24.5312C12.1914 24.5312 8.08984 24.707 6.39062 24.0039C5.21875 23.5352 4.33984 22.6562 3.87109 21.4844C3.16797 19.7852 3.34375 15.6836 3.34375 13.75C3.34375 11.875 3.16797 7.77344 3.87109 6.01562C4.33984 4.90234 5.21875 4.02344 6.39062 3.55469C8.08984 2.85156 12.1914 3.02734 14.125 3.02734C16 3.02734 20.1016 2.85156 21.8594 3.55469C22.9727 3.96484 23.8516 4.90234 24.3203 6.01562C25.0234 7.77344 24.8477 11.875 24.8477 13.75C24.8477 15.6836 25.0234 19.7852 24.3203 21.4844Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default InstagramSvg;