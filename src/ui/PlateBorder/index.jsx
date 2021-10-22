import React from 'react';
import * as PropTypes from 'prop-types';
import { Border, PlateCell } from './styles';

const PlateBorder = ({ vertical, size, isActive, temperature }) => {
  return (
    <Border $vertical={vertical} $size={size}>
      {new Array(size).fill(0).map((_, index) => (
        <PlateCell $isActive={isActive} key={index} $temperature={temperature}>
          {isActive && temperature}
        </PlateCell>
      ))}
    </Border>
  );
};

PlateBorder.propTypes = {
  vertical: PropTypes.bool,
  size: PropTypes.number,
  isActive: PropTypes.bool,
  temperature: PropTypes.number,
};

PlateBorder.defaultProps = {
  vertical: false,
  isActive: false,
  temperature: null,
};

export default PlateBorder;
