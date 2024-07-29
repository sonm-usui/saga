import React, { useMemo } from 'react';
import './Avatar.scss';
import { Link } from 'react-router-dom';
import { checkMediaType, prefixS3Url } from '../../../utils';
import { MEDIA_TYPES } from '../../../config';

interface AvatarProps {
  className?: string;
  avatarType: 'image' | 'video' | 'solidColor';
  solidColor?: string;
  src?: string;
  avatarLink?: string;
  avatarLinkExternal?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  className = '',
  src,
  avatarType,
  solidColor = '#f3f3f3',
  avatarLink,
  avatarLinkExternal
}) => {
  const avatarImageStyle = useMemo(() => {
    if (!src) return { backgroundColor: solidColor };
    const mediaType = checkMediaType(src);
    if (mediaType === MEDIA_TYPES.IMAGE) {
      return {
        background: `#f3f3f3 url(${src}) no-repeat center / cover`
      };
    }
    return { backgroundColor: solidColor };
  }, [src, solidColor]);

  return <img className="logo-support" src={src} alt="" />;

  // const AvatarContentJSX = () => {
  //   return (
  //     <>
  //       {avatarType === 'image' && <img src={src} alt="" />}

  //       {avatarType === 'video' && (
  //         <div className="avatar-video">
  //           <video className="video" autoPlay muted loop playsInline src={src}></video>
  //         </div>
  //       )}
  //     </>
  //   );
  // };

  // return (
  //   <div className={`avatar ${className}`}>
  //     {avatarLink && <Link to={avatarLink}>{AvatarContentJSX()}</Link>}
  //     {avatarLinkExternal && (
  //       <a href={avatarLinkExternal} target="_blank" rel="noopener noreferrer">
  //         {AvatarContentJSX()}
  //       </a>
  //     )}
  //     {!avatarLink && !avatarLinkExternal && AvatarContentJSX()}
  //   </div>
  // );
};
