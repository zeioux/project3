import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="text-white text-2xl">Chargement...</div>
    </div>
  );
};