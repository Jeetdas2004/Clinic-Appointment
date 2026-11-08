"use client";

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '../../redux/index';

const WrapComponent = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default WrapComponent;
