import React from 'react';
import { Link } from 'react-router-dom';
import './GlobalNotFound.scss';

export const GlobalNotFound: React.FC = () => {
  return (
    <div className="page-404">
      <div className="text">Page Not Found</div>
      <div className="back-home">
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};
