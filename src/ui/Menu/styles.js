import { styled } from 'baseui';
export const Container = styled('div', () => {
  return {
    height: '100%',
    borderStyle: 'solid',
    borderWidth: '0 1px 0 0',
    minWidth: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
});

export const MenuItem = styled('button', () => {
  return {
    width: '60px',
    height: '60px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: '0.2s all ease-out',
    ':hover': {
      opacity: 0.9,
    },
    ':active': {
      opacity: 0.5,
    },
  };
});
