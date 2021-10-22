import React, { useState, useRef, useCallback, memo } from 'react';
import { Slider } from 'baseui/slider';
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
import { capitalizeFirstLetter, isNotNegative } from '../../utils';
import {
  INITIAL_TIME_RANGE,
  INITIAL_PLATE_STATS,
  INITIAL_BORDERS,
  INITIAL_SOURCE,
  INITIAL_PLATE_SIZE,
} from '../../initialParams';

const Main = () => {
  const [timeRange, setTimeRange] = useState([INITIAL_TIME_RANGE]);
  const [sources, setSources] = useState([INITIAL_SOURCE]);
  const [plateSize, setPlateSize] = useState([INITIAL_PLATE_SIZE]);
  const [plateStats, setPlateStats] = useState(INITIAL_PLATE_STATS);
  const [borders, setBorders] = useState(INITIAL_BORDERS);
  const plate = useRef(new Array(plateSize[0] * plateSize[0]).fill(0));

  const handleReset = useCallback(() => {
    setPlateSize([INITIAL_PLATE_SIZE]);
    setSources([INITIAL_SOURCE]);
    setBorders(INITIAL_BORDERS);
    setTimeRange([INITIAL_TIME_RANGE]);
    setPlateStats(INITIAL_PLATE_STATS);
  }, []);

  /* Plate */

  const handlePlateSizeChange = useCallback(
    (e) => {
      const { value } = e;
      setPlateSize(value);
      plate.current = new Array(value * value).fill(0);
      setSources([INITIAL_SOURCE]);
    },
    [handleReset, plate],
  );

  const setAdditionalSourcesInputs = useCallback(
    (letter, id) => (
      <TextInput
        label={letter}
        key={letter}
        width="30%"
        value={sources.find((s) => s.id === id)[letter]}
        onChange={
          letter === 't'
            ? ({ target }) => handleSourceTemperatureChange(id, target.value)
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
          deleteSource(activeCell.id);
        } else {
          if (sources.length < plateSize / 5) {
            handleAddNewSource(x, y, 10);
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

  /* Sources */

  const handleAddNewSource = useCallback(
    (x, y, t) => {
      setSources([...sources, { id: Date.now(), x, y, t }]);
    },
    [sources],
  );

  const handleSourceTemperatureChange = useCallback(
    (id, temp) => {
      const localSources = [...sources];
      const sourceToChange = localSources.find((s) => s.id === id);
      if (+temp < 100) {
        sourceToChange.t = +temp || 0;
      }
      setSources(localSources);
    },
    [sources],
  );

  const deleteSource = useCallback(
    (id) => {
      const items = sources.filter((s) => s.id !== id);
      setSources(items);
    },
    [sources],
  );

  /* Borders */

  const handleBorderTemperatureChange = useCallback(
    (border, temp) => {
      if (+temp < 100) {
        setBorders({
          ...borders,
          [border]: {
            ...borders[border],
            temperature: temp,
          },
        });
      }
    },
    [borders],
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
                onChange={() => handleBorderClick(border)}
              />
            </BorderTitle>
          }
          value={borders[border].temperature}
          width="24%"
          disabled={!borders[border].isActive}
          onChange={({ target }) =>
            handleBorderTemperatureChange(border, target.value)
          }
        />
      );
    },
    [borders],
  );

  const handleBorderClick = useCallback(
    (border) => {
      setBorders({
        ...borders,
        [border]: {
          isActive: !borders[border].isActive,
          temperature: !borders[border].isActive
            ? !borders[border].temperature
              ? 10
              : borders[border].temperature
            : 0,
        },
      });
    },
    [borders],
  );

  /* Time Range */

  const handleTimeRangeChange = useCallback(
    ({ value }) => value && setTimeRange(value),
    [],
  );

  /* Stats */

  const handleStatsChange = useCallback(
    (stat) =>
      ({ target }) => {
        if (isNotNegative(target.value)) {
          setPlateStats({
            ...plateStats,
            [stat]: target.value,
          });
        }
      },
    [plateStats],
  );

  return (
    <Container>
      <LeftColumn>
        <Block>
          <Title>Размер пластины (у. е.)</Title>
          <Slider
            value={plateSize}
            onChange={handlePlateSizeChange}
            min={5}
            max={40}
          />
          <Title>Отрезок времени (сек)</Title>
          <Slider
            value={timeRange}
            onChange={handleTimeRangeChange}
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
              onChange={handleStatsChange('c')}
            />
            <TextInput
              label="p"
              width="48%"
              value={plateStats.p}
              placeholder={plateStats.p}
              onChange={handleStatsChange('p')}
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
            plateSize={plateSize[0]}
            onBorderClick={handleBorderClick}
            borders={borders}
          >
            <Plate $size={plateSize[0]}>
              {plate.current?.map(renderPlate)}
            </Plate>
          </BorderFrame>
        </GraphContainer>
      </RightColumn>
    </Container>
  );
};

export default memo(Main);
