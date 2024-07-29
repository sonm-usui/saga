import React, { useMemo, useRef } from 'react';
import './Media.scss';
import { checkMediaType, prefixS3Url } from '../../../utils';
import { MEDIA_TYPES } from '../../../config';

interface IMediaProps {
  className?: string;
  mediaType: 'image' | 'video';
  solidColor?: string;
  src?: string;
}

export const Media: React.FC<IMediaProps> = ({ mediaType, src, className = '', solidColor }) => {
  const playerRef = useRef<HTMLElement | any>(null);
  const playVideo = () => {
    playerRef?.current.play();
  };
  const stopVideo = () => {
    playerRef?.current.pause();
  };

  const backgroundImageStyle = useMemo(() => {
    if (!src) return { backgroundColor: solidColor };
    const mediaType = checkMediaType(src);
    if (mediaType === MEDIA_TYPES.IMAGE) {
      return {
        background: `#f3f3f3 url(${prefixS3Url(src)}) no-repeat center / cover`
      };
    }
    return { backgroundColor: solidColor };
  }, [src]);

  return (
    <div className={`media ${className}`}>
      {mediaType === 'image' && (
        <div className="media-image" style={backgroundImageStyle}>
          <div className="media-image-display"></div>
        </div>
      )}

      {mediaType === 'video' && (
        <div className="media-video">
          <video
            className="video"
            autoPlay
            muted
            loop
            playsInline
            src={src}
            ref={playerRef}
            onMouseOut={playVideo}
            onMouseOver={stopVideo}></video>
        </div>
      )}
    </div>
  );
};
