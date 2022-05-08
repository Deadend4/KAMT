import React, { useCallback, useState } from 'react';
import Configurator from '../Configurator';
import { Container, Content } from './styles';
import {
  INITIAL_BORDERS,
  INITIAL_PLATE_SIZE,
  INITIAL_PLATE_STATS,
  INITIAL_SOURCE,
  INITIAL_TIME_RANGE,
} from '../../initialParams';
import { isNotNegative } from '../../utils';

const Main = () => {
  const [timeRange, setTimeRange] = useState([0, INITIAL_TIME_RANGE]);
  const [sources, setSources] = useState([INITIAL_SOURCE]);
  const [plateSize, setPlateSize] = useState(INITIAL_PLATE_SIZE);
  const [plate, setPlate] = useState(new Array(plateSize * plateSize).fill(0));
  const [plateStats, setPlateStats] = useState(INITIAL_PLATE_STATS);
  const [borders, setBorders] = useState(INITIAL_BORDERS);
  const [calculationMode, setCalculationMode] = useState('quasilinear');
  const [homogeneity, setHomogeneity] = useState('homogeneity');

  /* Plate */
  const handlePlateSizeChange = useCallback(({ value }) => {
    const [val] = value;
    setPlateSize(val);
    setSources([INITIAL_SOURCE]);
    setPlate(new Array(val * val).fill(0));
  }, []);

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
    (plate, stat) =>
      ({ target }) => {
        if (isNotNegative(target.value)) {
          setPlateStats({
            ...plateStats,
            ...plateStats,
            [plate]: {
              ...plateStats[plate],
              [stat]: +target.value,
            },
          });
        }
      },
    [plateStats],
  );
  const handleCalculationModeChange = useCallback((e) => {
    setCalculationMode(e.currentTarget.value);
  }, []);

  const handleHomogeneityChange = useCallback(
    (e) => {
      setHomogeneity(e.currentTarget.value);
      setPlateStats({
        ...plateStats,
        plate2:
          e.currentTarget.value === 'homogeneity'
            ? null
            : {
                ...INITIAL_PLATE_STATS.plate1,
              },
      });
    },
    [plateStats],
  );

  const handleReset = useCallback(() => {
    setTimeRange([INITIAL_TIME_RANGE]);
    handlePlateSizeChange?.({ value: [INITIAL_PLATE_SIZE] });
    setPlateStats(INITIAL_PLATE_STATS);
    setBorders(INITIAL_BORDERS);
    setCalculationMode('quasilinear');
    setHomogeneity('homogeneity');
  }, []);

  const getContent = () => {
    return (
      <Configurator
        plateSize={plateSize}
        borders={borders}
        sources={sources}
        onBorderClick={handleBorderClick}
        onActiveCellClick={deleteSource}
        onBorderTemperatureChange={handleBorderTemperatureChange}
        onInactiveCellClick={handleAddNewSource}
        onPlateSizeChange={handlePlateSizeChange}
        onSourceTemperatureChange={handleSourceTemperatureChange}
        onStatsChange={handleStatsChange}
        onTimeRangeChange={handleTimeRangeChange}
        plateStats={plateStats}
        timeRange={timeRange}
        calculationMode={calculationMode}
        onCalculationModeChange={handleCalculationModeChange}
        homogeneity={homogeneity}
        onHomogeneityChange={handleHomogeneityChange}
        onResetPress={handleReset}
        plate={plate}
      />
    );
  };
  return (
    <Container>
      <Content>{getContent()}</Content>
    </Container>
  );
};

export default Main;
