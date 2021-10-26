import React from 'react';
import { Container, MenuItem } from './styles';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const Menu = ({ onMenuItemClick, selectedItem }) => {
  return (
    <Container>
      <MenuItem onClick={() => onMenuItemClick('configurator')}>
        <Icon
          name="Gear"
          color={selectedItem === 'configurator' ? 'red' : '#000000'}
        />
      </MenuItem>
      <MenuItem onClick={() => onMenuItemClick('chart')}>
        <Icon
          name="Chart"
          color={selectedItem === 'chart' ? 'red' : '#000000'}
        />
      </MenuItem>
    </Container>
  );
};

Menu.propTypes = {
  onMenuItemClick: PropTypes.func,
  selectedItem: PropTypes.oneOf(['configurator, chart']),
};

export default Menu;
