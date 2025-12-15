import React from 'react';
import DragDropBuilder from './components/DragDropBuilder';
import './index.css';

export const BuilderApp: React.FC = () => {
  const handleExport = (code: string) => {
    console.log('Exporting code:', code);
    // You can add logic here to save to a file or send to a backend
  };

  return (
    <div>
      <DragDropBuilder onExport={handleExport} />
    </div>
  );
};

export default BuilderApp;
