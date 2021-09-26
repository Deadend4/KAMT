import styled from 'styled-components';
import {
  PADDING_NORMAL,
  BORDER_RADIUS,
  COLOR_NEUTRAL_2,
  FONT_FAMILY,
  COLOR_PRIMARY_4,
} from '../theme';

export const Wrapper = styled.div`
  padding: 0;
  position: relative;
  background-color: inherit;
`;

export const Input = styled.input`
  margin: 0;
  padding: ${PADDING_NORMAL}px;
		border-radius: ${BORDER_RADIUS}px;
		border: 1px solid ${COLOR_NEUTRAL_2};
		outline: 0;
  font-family: ${FONT_FAMILY};
  color: ${COLOR_PRIMARY_4};
  font-weight: 500;
  background-color: inherit;
		&:focus-visible {
    border: 2px solid ${COLOR_PRIMARY_4};
		}
  &[type=number] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: none;
  }
  &[type=number]::-webkit-inner-spin-button,
  &[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;

export const Title = styled.label`
  color: ${COLOR_PRIMARY_4};
  position: absolute;
  top: -10px;
  left: ${PADDING_NORMAL - 4}px;
  padding: 0 4px;
  border-radius: ${BORDER_RADIUS}px;
  background-color: inherit;
`;
