import React from 'react';
import {shallow} from 'enzyme';
import CustomButton from './index';
import {TouchableOpacity} from 'react-native';

describe('CustomButton', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(<CustomButton label="test label!" />);
      expect(component).toMatchSnapshot();
    });
  });

  describe('Interaction', () => {
    describe('onPressHandler', () => {
      it('should call onPress', () => {
        const mockOnPress = jest.fn();
        mockOnPress.mockReturnValue('Link on press invoked');
        const component = shallow(
          <CustomButton label="test label" onPress={mockOnPress} />,
        );

        component
          .find(TouchableOpacity)
          .first()
          .props()
          .onPress();

        expect(mockOnPress.mock.calls.length).toBe(1);
      });
    });
  });
});
