/**
 * @format
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

// Mock RootNavigation
jest.mock('../src/navigation/RootNavigation', () => {
  return () => <mock-RootNavigation testID="root-navigation" />;
});

describe('App Component', () => {
  it('renders the RootNavigation component', () => {
    const { getByTestId } = render(<App />);
    
    // Check if RootNavigation is present
    expect(getByTestId('root-navigation')).toBeTruthy();
  });
});


