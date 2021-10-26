import { styled } from 'baseui';
import * as PropTypes from 'prop-types';

const Svg = styled('svg', (props) => {
  return {
    width: `${props.$size ?? 95.348}px`,
    height: `${props.$size ?? 95.348}px`,
  };
});

const Chart = ({ size, color }) => {
  return (
    <Svg
      version="1.1"
      id="chart-svg"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 490 490"
      $size={size}
    >
      <g>
        <polygon
          points="86.15,0 13.05,0 13.05,490 476.45,490 476.45,416.9 86.15,416.9"
          fill={color ?? '#000000'}
        />
        <rect
          x="399.15"
          y="205"
          width="77.8"
          height="176.9"
          fill={color ?? '#000000'}
        />
        <rect
          x="282.85"
          y="274.9"
          width="77.8"
          height="106.9"
          fill={color ?? '#000000'}
        />
        <rect
          x="166.95"
          y="53.7"
          width="77.8"
          height="328.2"
          fill={color ?? '#000000'}
        />
        <path
          d="M120.75,65h15.6c6.2,0,11.7-5.1,11.7-11.7s-5.1-11.7-11.7-11.7h-15.6c-6.2,0-11.7,5.1-11.7,11.7S114.55,65,120.75,65z"
          fill={color ?? '#000000'}
        />
        <path
          d="M120.75,138.9h15.6c6.2,0,11.7-5.1,11.7-11.7c0-6.2-5.1-11.7-11.7-11.7h-15.6c-6.2,0-11.7,5.1-11.7,11.7
			C109.05,133.8,114.55,138.9,120.75,138.9z"
          fill={color ?? '#000000'}
        />
        <path
          d="M120.75,212.7h15.6c6.2,0,11.7-5.1,11.7-11.7c0-6.2-5.1-11.7-11.7-11.7h-15.6c-6.2,0-11.7,5.1-11.7,11.7
			C109.05,207.3,114.55,212.7,120.75,212.7z"
          fill={color ?? '#000000'}
        />
        <path
          d="M120.75,286.2h15.6c6.2,0,11.7-5.1,11.7-11.7s-5.1-11.7-11.7-11.7h-15.6c-6.2,0-11.7,5.1-11.7,11.7
			C109.05,281.2,114.55,286.2,120.75,286.2z"
          fill={color ?? '#000000'}
        />
        <path
          d="M120.75,360.1h15.6c6.2,0,11.7-5.1,11.7-11.7c0-6.2-5.1-11.7-11.7-11.7h-15.6c-6.2,0-11.7,5.1-11.7,11.7
			C109.05,355,114.55,360.1,120.75,360.1z"
          fill={color ?? '#000000'}
        />
      </g>
    </Svg>
  );
};

Chart.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default Chart;
