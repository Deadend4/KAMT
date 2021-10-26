import React, { useCallback, useState } from 'react';
import Menu from '../../ui/Menu';
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
  const [selectedTab, setSelectedTab] = useState('configurator');
  const [timeRange, setTimeRange] = useState([INITIAL_TIME_RANGE]);
  const [sources, setSources] = useState([INITIAL_SOURCE]);
  const [plateSize, setPlateSize] = useState(INITIAL_PLATE_SIZE);
  const [plateStats, setPlateStats] = useState(INITIAL_PLATE_STATS);
  const [borders, setBorders] = useState(INITIAL_BORDERS);

  const handleReset = useCallback(() => {
    setPlateSize(INITIAL_PLATE_SIZE);
    setSources([INITIAL_SOURCE]);
    setBorders(INITIAL_BORDERS);
    setTimeRange([INITIAL_TIME_RANGE]);
    setPlateStats(INITIAL_PLATE_STATS);
  }, []);

  /* Plate */

  const handlePlateSizeChange = useCallback((value) => {
    setPlateSize(value[0]);
    setSources([INITIAL_SOURCE]);
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

  const getContent = () => {
    switch (selectedTab) {
      case 'configurator':
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
          />
        );
      case 'chart':
        return (
          <iframe
            width="1600"
            height="900"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
    }
  };
  return (
    <Container>
      <Menu selectedItem={selectedTab} onMenuItemClick={setSelectedTab} />
      <Content>{getContent()}</Content>
    </Container>
  );
};

export default Main;
