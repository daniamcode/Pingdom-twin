import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from '../redux/configureStore';
import Detail from '../pages/detail/[id]';
// import '@testing-library/jest-dom/extend-expect';
// import {describe, expect } from '@jest/globals'
import '@testing-library/jest-dom'


jest.mock('react-google-charts')
jest.mock('next/router')

describe('Detail Component', () => {
  let wrapper = null;
  let store = null;
  const wrapperFactory = (wrapperState) => {
    store = configureStore(wrapperState);
    
    return ({ children }) => (
      <Provider store={store}>
          {children}
      </Provider>
    );
  };

  afterEach(() => {
    jest.restoreAllMocks();
    wrapper = null;
  });

  test('Should render detail', () => {
    const state = {
   
    };

    wrapper = wrapperFactory(state);

    render(<Detail match={{params: {url: 'yavendras.com'}}}/>, { wrapper });

    expect(screen.getByTestId('detail')).toBeInTheDocument();
  })

})