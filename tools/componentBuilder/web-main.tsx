/**
 * Web Builder Entry Point
 * 
 * This file sets up the component builder as a standalone web application.
 * It can be run independently or integrated into your existing web app.
 * 
 * Usage:
 * - In a Vite/React project: import BuilderApp from this file
 * - As standalone: Run with `npm run builder` or `yarn builder`
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import BuilderApp from './index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BuilderApp />
  </React.StrictMode>
);
