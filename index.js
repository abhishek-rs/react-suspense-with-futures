import React from 'react';
import Main from './src/components/Main';
import { render } from 'react-dom';

if (process.env.NODE_ENV === 'development') {
  require('./mocks');
}

const container = document.getElementById('#react');
render(<Main />, container);
