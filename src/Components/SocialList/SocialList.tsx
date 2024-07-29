import React from 'react';
import './SocialList.scss';
import FacebookSvg from '../../assets/images/svgs/FacebookSvg';
import TwitterSvg from '../../assets/images/svgs/TwitterSvg';
import { map } from 'lodash';
import { ISocials } from '../../types/Common.type';
import { TelegramSvg } from '../../assets/images/svgs/TelegramSvg';
import signal from '../../assets/images/pngs/signal.png';

interface SocialListProps {
  className?: string;
  socials: ISocials;
}

const SocialList: React.FC<SocialListProps> = ({ className = '', socials }) => {
  const renderSocialIcon = (key: string) => {
    switch (key) {
      case 'facebook':
        return <FacebookSvg />;
      case 'telegram':
        return <TelegramSvg />;
      case 'twitter':
        return <TwitterSvg />;
      case 'signal':
        return <img src={signal} alt="signal" />;
      default:
        return null;
    }
  };
  return (
    <div className={`social ${className}`}>
      <div className="social">
        {map(socials, (link, key) => {
          return (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-item ${!link ? 'disabled' : ''}`}
              key={key}>
              {renderSocialIcon(key)}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialList;
