import React from 'react';
import { render } from '@testing-library/react';
import TyprescriptTest from './TyprescriptTest';

describe('typrescriptTest tests', () => {
  it('my test', () => {
    expect.assertions(1);
    expect(render(<TyprescriptTest/>)).toBeTruthy();
  });
});
