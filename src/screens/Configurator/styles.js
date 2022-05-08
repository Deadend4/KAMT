import { styled } from 'baseui';
import {
  PADDING_NORMAL,
  TEMPERATURE_1,
  TEMPERATURE_2,
  TEMPERATURE_3,
  TEMPERATURE_4,
} from '../../ui/theme';

const getPlateColor = (temp) => {
  if (temp <= 0) {
    return TEMPERATURE_1;
  } else if (temp > 0 && temp <= 30) {
    return TEMPERATURE_2;
  } else if (temp > 30 && temp <= 60) {
    return TEMPERATURE_3;
  } else if (temp > 60) {
    return TEMPERATURE_4;
  }
};

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
  width: '25%',
  borderWidth: '0 1px',
  borderStyle: 'solid',
  borderColor: 'black',
  overflowY: 'auto',
  overflowX: 'hidden',
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

export const RightColumn = styled('div', {
  width: '75%',
});

export const GraphContainer = styled('div', {
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'auto',
});

export const Plate = styled('div', (props) => {
  return {
    minWidth: `${props.$size * 20 + 2 * props.$size}px`,
    maxWidth: `${props.$size * 20 + 2 * props.$size}px`,
    height: `${props.$size * 20 + 2 * props.$size}px`,
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
  };
});

export const PlateCell = styled('div', (props) => {
  return {
    width: '20px',
    height: '20px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    backgroundColor: props.$isActive
      ? getPlateColor(props.$temperature)
      : '#a0a0a0',
    border: '1px solid black',
    borderRadius: '5px',
    ':hover': {
      cursor: 'pointer',
      backgroundColor: '#810f0f',
    },
  };
});

export const Title = styled('h2', {});

export const SubTitle = styled('h3', {});

export const BorderTitle = styled('span', {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
});
