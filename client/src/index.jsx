import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './components/App.jsx';

// createRoot(document.getElementById('app')).render(<App tab='home'/>)
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
