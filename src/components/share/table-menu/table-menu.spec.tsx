import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { TableMenu } from './gray-icon-button';

Enzyme.configure({ adapter: new Adapter() });

describe('render gray-icon-button component', () => {
  it('test component render', () => {
    shallow(<TableMenu />);
  });

  it('render gray-icon-button component content', () => {
    const wrapper = shallow(
        <TableMenu>
          <div>icon</div>
        </TableMenu>
    );

    const content = <div>icon</div>;
    expect(wrapper.contains(content)).toEqual(true);
  });
});
