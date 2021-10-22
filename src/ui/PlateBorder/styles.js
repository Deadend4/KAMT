import { styled } from 'baseui';
import {
  TEMPERATURE_1,
  TEMPERATURE_2,
  TEMPERATURE_3,
  TEMPERATURE_4,
} from '../theme';

const getCellColor = (temp) => {
  if (temp > 0 && temp <= 30) {
    return TEMPERATURE_2;
  } else if (temp > 30 && temp <= 60) {
    return TEMPERATURE_3;
  } else if (temp > 60) {
    return TEMPERATURE_4;
  } else {
    return TEMPERATURE_1;
  }
};

export const Border = styled('div', (props) => {
  return {
    display: 'flex',
    flexDirection: `${props.$vertical ? 'column' : 'row'}`,
    width: `${props.$vertical ? 20 : props.$size * 20 + 2 * props.$size}px`,
    height: `${props.$vertical ? props.$size * 20 + 2 * props.$size : 20}px`,
    ':hover > div': {
      cursor: 'pointer',
      backgroundColor: '#810f0f',
    },
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
    border: '1px solid black',
    borderRadius: '5px',
    backgroundColor: props.$isActive
      ? getCellColor(props.$temperature)
      : '#a0a0a0',
  };
});
