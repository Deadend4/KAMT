import React, { useCallback, useState } from 'react';
import { Slider } from 'baseui/slider';
import * as PropTypes from 'prop-types';
import {
  Container,
  Title,
  Block,
  LeftColumn,
  RightColumn,
  Row,
  GraphContainer,
  PlateCell,
  Plate,
  BorderTitle,
} from './styles';
import TextInput from '../../ui/TextInput';
import BorderFrame from '../../ui/BorderFrame';
import { Checkbox } from 'baseui/checkbox';
import { capitalizeFirstLetter } from '../../utils';

const Configurator = ({
  sources,
  plateSize,
  borders,
  timeRange,
  onActiveCellClick,
  onInactiveCellClick,
  onSourceTemperatureChange,
  plateStats,
  onBorderClick,
  onBorderTemperatureChange,
  onPlateSizeChange,
  onTimeRangeChange,
  onStatsChange,
}) => {
  const [plate, setPlate] = useState(new Array(plateSize * plateSize).fill(0));

  const handlePlateSizeChange = useCallback(({ value }) => {
    onPlateSizeChange(value);
    setPlate(new Array(value * value).fill(0));
  });

  const setAdditionalSourcesInputs = useCallback(
    (letter, id) => (
      <TextInput
        label={letter}
        key={letter}
        width="30%"
        value={sources.find((s) => s.id === id)[letter]}
        onChange={
          letter === 't'
            ? ({ target }) => onSourceTemperatureChange(id, target.value)
            : undefined
        }
        disabled={letter !== 't'}
      />
    ),
    [sources],
  );

  const renderPlate = useCallback(
    (_, index) => {
      const y = Math.trunc(index / plateSize);
      const x = index % plateSize;
      const activeCell = sources.find((s) => s.x === x && s.y === y);
      const onCellClick = () => {
        if (!!activeCell) {
          onActiveCellClick(activeCell.id);
        } else {
          if (sources.length < plateSize / 5) {
            onInactiveCellClick(x, y, 10);
          }
        }
      };
      return (
        <PlateCell
          key={index}
          $isActive={!!activeCell}
          $temperature={activeCell?.t}
          onClick={onCellClick}
        >
          {!!activeCell && activeCell.t}
        </PlateCell>
      );
    },
    [sources],
  );

  const setBorderInputs = useCallback(
    (border) => {
      return (
        <TextInput
          label={
            <BorderTitle>
              {capitalizeFirstLetter(border)}, t°{' '}
              <Checkbox
                checked={borders[border].isActive}
                onChange={() => onBorderClick(border)}
              />
            </BorderTitle>
          }
          value={borders[border].temperature}
          width="24%"
          disabled={!borders[border].isActive}
          onChange={({ target }) =>
            onBorderTemperatureChange(border, target.value)
          }
        />
      );
    },
    [borders],
  );

  return (
    <Container>
      <LeftColumn>
        <Block>
          <Title>Размер пластины (у. е.)</Title>
          <Slider
            value={[plateSize]}
            onChange={handlePlateSizeChange}
            min={5}
            max={40}
          />
          <Title>Отрезок времени (сек)</Title>
          <Slider
            value={timeRange}
            onChange={onTimeRangeChange}
            min={1}
            max={60}
          />
          <Title>Характеристики пластины</Title>
          <Row>
            <TextInput
              label="c"
              width="48%"
              placeholder={plateStats.c}
              value={plateStats.c}
              onChange={onStatsChange('c')}
            />
            <TextInput
              label="p"
              width="48%"
              value={plateStats.p}
              placeholder={plateStats.p}
              onChange={onStatsChange('p')}
            />
          </Row>
          <Title>Границы</Title>
          <Row>{['top', 'right', 'bottom', 'left'].map(setBorderInputs)}</Row>
          <Title>Источники тепла</Title>
          {sources.map((item) => (
            <Row key={item.id} id={`source-x-y`}>
              {['x', 'y', 't'].map((key) =>
                setAdditionalSourcesInputs(key, item.id),
              )}
            </Row>
          ))}
        </Block>
      </LeftColumn>
      <RightColumn>
        <GraphContainer>
          <BorderFrame
            plateSize={plateSize}
            onBorderClick={onBorderClick}
            borders={borders}
          >
            <Plate $size={plateSize}>{plate.map(renderPlate)}</Plate>
          </BorderFrame>
        </GraphContainer>
      </RightColumn>
    </Container>
  );
};

Configurator.propTypes = {
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      t: PropTypes.number,
    }),
  ),
  plateSize: PropTypes.number,
  borders: PropTypes.shape({
    left: PropTypes.shape({
      isActive: PropTypes.bool,
      temperature: PropTypes.number,
    }),
    right: PropTypes.shape({
      isActive: PropTypes.bool,
      temperature: PropTypes.number,
    }),
    top: PropTypes.shape({
      isActive: PropTypes.bool,
      temperature: PropTypes.number,
    }),
    bottom: PropTypes.shape({
      isActive: PropTypes.bool,
      temperature: PropTypes.number,
    }),
  }),
  timeRange: PropTypes.number,
  onActiveCellClick: PropTypes.func,
  onInactiveCellClick: PropTypes.func,
  onSourceTemperatureChange: PropTypes.func,
  plateStats: PropTypes.func,
  onBorderClick: PropTypes.func,
  onBorderTemperatureChange: PropTypes.func,
  onPlateSizeChange: PropTypes.func,
  onTimeRangeChange: PropTypes.func,
  onStatsChange: PropTypes.func,
};

export default Configurator;
