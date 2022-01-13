import { styled } from 'baseui';

export const Frame = styled('div', (props) => {
  return {
    position: 'relative',
    width: `${props.$size * 20 + 2 * props.$size}px`,
    height: `${props.$size * 20 + 2 * props.$size}px`,
    minHeight: `${props.$size * 20 + 2 * props.$size}px`,
  };
});

export const TopBorder = styled('div', () => {
  return {
    position: 'absolute',
    top: 0,
    left: '22px',
  };
});

export const BottomBorder = styled('div', () => {
  return {
    position: 'absolute',
    bottom: '2px',
    left: '22px',
  };
});

export const LeftBorder = styled('div', () => {
  return {
    position: 'absolute',
    top: '22px',
    left: 0,
  };
});
export const RightBorder = styled('div', () => {
  return {
    position: 'absolute',
    right: '2px',
    top: '22px',
  };
});

export const Content = styled('div', () => {
  return {
    position: 'absolute',
    right: '22px',
    top: '22px',
  };
});
