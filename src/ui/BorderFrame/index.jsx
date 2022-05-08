import React from 'react';
import * as PropTypes from 'prop-types';
import {
  BottomBorder,
  Frame,
  LeftBorder,
  RightBorder,
  TopBorder,
  Content,
} from './styles';
import PlateBorder from '../PlateBorder';

const BorderFrame = ({ borders, onBorderClick, children, plateSize }) => {
  const handleBorderClick = (border) => () => {
    onBorderClick(border);
  };
  return (
    <Frame $size={plateSize + 2}>
      <TopBorder onClick={handleBorderClick('top')}>
        <PlateBorder
          size={plateSize}
          isActive={borders.top.isActive}
          temperature={borders.top.temperature}
        />
      </TopBorder>
      <LeftBorder onClick={handleBorderClick('left')}>
        <PlateBorder
          size={plateSize}
          isActive={borders.left.isActive}
          temperature={borders.left.temperature}
          vertical
        />
      </LeftBorder>
      <RightBorder onClick={handleBorderClick('right')}>
        <PlateBorder
          size={plateSize}
          isActive={borders.right.isActive}
          vertical
          temperature={borders.right.temperature}
        />
      </RightBorder>
      <Content>{children}</Content>
      <BottomBorder onClick={handleBorderClick('bottom')}>
        <PlateBorder
          size={plateSize}
          isActive={borders.bottom.isActive}
          temperature={borders.bottom.temperature}
        />
      </BottomBorder>
    </Frame>
  );
};

BorderFrame.propTypes = {
  onBorderClick: PropTypes.func,
  children: PropTypes.node,
  plateSize: PropTypes.number,
  borders: PropTypes.shape({
    left: PropTypes.shape({
      isActive: PropTypes.bool,
      temperature: PropTypes.number,
    }),
    right: PropTypes.shape({
      isActive: PropTypes.bool,
      temperature: PropTypes.number,
    }),
    top: PropTypes.shape({
      isActive: PropTypes.bool,
      temperature: PropTypes.number,
    }),
    bottom: PropTypes.shape({
      isActive: PropTypes.bool,
      temperature: PropTypes.number,
    }),
  }),
};

export default BorderFrame;
