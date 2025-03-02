
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from './HomeScreen'; 

// Mock navigation prop
const mockNavigation = {
  navigate: jest.fn(), 
};

describe('Home Screen', () => {


  it('renders correctly', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    expect(getByText('Take Picture of Invoice')).toBeTruthy();
  });

  it('navigates to Scan screen on button press', () => {
    console.log = jest.fn();
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    const button = getByText('Take Picture of Invoice');
    fireEvent.press(button);
    expect(console.log).toHaveBeenCalledWith('scan invoice');
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Scan');
  });
});
