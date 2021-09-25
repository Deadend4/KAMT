import React from 'react';
import TextInput from '.';

export default {
  title: 'UI/TextInput',
  component: TextInput,
};

const Template = (args) => <TextInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Set x',
};
