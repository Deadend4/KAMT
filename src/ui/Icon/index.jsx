import * as icons from './icons';
import * as PropTypes from 'prop-types';

const Icon = ({ name, color, size }) => {
  const TagName = icons[name ?? 'Help'];
  return <TagName color={color} size={size} />;
};

Icon.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
};

export default Icon;
