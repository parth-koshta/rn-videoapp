import React from 'react';
import CustomInput from './index';
import renderer from 'react-test-renderer';

describe('CustomInput', () => {
  it('should render', () => {
    const rendered = renderer.create(<CustomInput />).toJSON();
    expect(rendered).toBeTruthy();
  });
});
