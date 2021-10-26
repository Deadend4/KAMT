import { styled } from 'baseui';

export const Container = styled('div', () => {
  return {
    height: '100%',
    width: '100%',
    display: 'flex',
  };
});

export const Content = styled('div', () => {
  return {
    width: 'calc(100% - 30px)',
    display: 'flex',
    position: 'relative',
    height: '100%',
  };
});
