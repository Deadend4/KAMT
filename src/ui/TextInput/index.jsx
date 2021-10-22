import React from 'react';
import * as PropTypes from 'prop-types';
import { Input } from 'baseui/input';
import { FormControl } from 'baseui/form-control';

const TextInput = ({ label, width, ...props }) => (
  <div style={{ width }}>
    <FormControl
      label={label}
      overrides={{
        ControlContainer: {
          style: { marginBottom: 0 },
        },
      }}
    >
      <Input {...props} />
    </FormControl>
  </div>
);

TextInput.propTypes = {
  label: PropTypes.node,
  width: PropTypes.string,
};

TextInput.defaultProps = {
  label: '',
  width: '100%',
};

export default TextInput;
