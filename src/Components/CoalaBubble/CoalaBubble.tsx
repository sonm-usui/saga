import React, { useEffect } from 'react';
import PurpleCoala from '../../assets/images/svgs/PurpleCoala';
import './CoalaBubble.scss';

interface CoalaBubbleProps {
  text: string;
  onClick?: () => void;
}

const CoalaBubble: React.FC<CoalaBubbleProps> = ({ text, onClick }) => {
  const [active, setActive] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setActive(!active);
    }, 1500);
  }, [active]);

  return (
    <div className="coala-bubble" onClick={onClick}>
      <div className={`coala-bubble-text ${active ? 'active' : ''}`}>{text}</div>
      <div className="coala-bubble-logo">
        <PurpleCoala />
      </div>
    </div>
  );
};

export default CoalaBubble;
