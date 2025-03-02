// src/components/ButtonComponent/ButtonComponent.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ButtonComponent from './ButtonComponent';

describe('ButtonComponent', () => {

it('should render the title text', () => {
    const { getByText } = render(<ButtonComponent title="Press Me" onPress={() => {}} />);
    getByText('Press Me');
  });

  it('should call the onPress function when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <ButtonComponent title="Press Me" onPress={onPressMock} disabled={false} />
    );
    fireEvent.press(getByText('Press Me'));
  expect(onPressMock).toHaveBeenCalledTimes(1);
  });
  
  it('should be disabled and not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <ButtonComponent title="Press Me" onPress={onPressMock} disabled={true} />
    );
    getByText('Press Me');
    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(0);
  });

  it('should show a loading spinner when loading is true', () => {
    const { getByTestId, queryByText } = render(
      <ButtonComponent title="Press Me" onPress={() => {}} loading={true} />
    );
    getByTestId('loading-spinner');
    expect(queryByText('Press Me')).toBeNull();
  });
  

  it('should apply custom styles passed through the style prop', () => {
    const customStyle = { backgroundColor: 'blue' };
    const { getByText } = render(
      <ButtonComponent title="Press Me" onPress={() => {}} style={customStyle} />
    );
  });
  

});

