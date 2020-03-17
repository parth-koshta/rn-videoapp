import React from 'react';
import CustomInput from './index';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

describe('CustomInput', () => {
  it('should render', () => {
    const rendered = renderer.create(<CustomInput />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('should change value', () => {
    const onChangeText = jest.fn();
    const wrapper = shallow(<CustomInput onChangeText={onChangeText} />);
    wrapper.find('TextInput').simulate('changeText', 'changed text');
    expect(onChangeText).toHaveBeenCalledWith('changed text');
  });
});
