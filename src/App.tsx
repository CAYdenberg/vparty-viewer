import React from 'react';
import { API_KEY } from './config';

export const App: React.FC = () => {
  return (
    <div>
      <h1>Hello, world!</h1>
      <p>{API_KEY}</p>
    </div>
  );
};
