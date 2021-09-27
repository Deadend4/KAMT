import { styled } from 'baseui';
import { PADDING_NORMAL } from '../../ui/theme';

export const Container = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  overflow: 'hidden',
});

export const LeftColumn = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '35%',
  borderWidth: '0 1px',
  borderStyle: 'solid',
  borderColor: 'black',
});

export const RightColumn = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '75%',
  borderWidth: '0 1px 0 0',
  borderStyle: 'solid',
  borderColor: 'black',
});

export const Block = styled('div', {
  padding: `${PADDING_NORMAL}px`,
});

export const Row = styled('div', {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
});

export const GraphContainer = styled('div', {
  width: '100%',
  height: '65%',
  position: 'relative',
  borderWidth: '0 0 1px 0',
  borderStyle: 'solid',
  borderColor: 'black',
});

export const AdditionalSources = styled('div', {
  width: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',
  height: '400px',
});

export const Title = styled('h2', {});
