import React from 'react';
import PropTypes from 'prop-types';
import { Input, Title, Wrapper } from './styles';

const TextInput = ({ label, ...rest }) => (
  <Wrapper>
    {label && <Title for="text-input">{label}</Title>}
    <Input type="text" {...rest} id="text-input" />
  </Wrapper>
);

TextInput.propTypes = {
  label: PropTypes.string,
};

TextInput.defaultProps = {
  label: '',
};

export default TextInput;
