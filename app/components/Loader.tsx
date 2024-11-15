import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <img src="/logo.jpg" alt="Loading" className="rotating-logo" />
    </div>
  );
};

export default Loader;
