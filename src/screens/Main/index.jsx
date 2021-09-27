import React, { useState } from 'react';
import { Slider } from 'baseui/slider';
import { Button } from 'baseui/button';
import {
  Container, Title, Block, LeftColumn, RightColumn, Row, GraphContainer, AdditionalSources,
} from './styles';
import TextInput from '../../ui/TextInput';

const initialStartCellStats = {
  x: 15, y: 15, t: 10, p: 1500, c: 1000,
};

const Main = () => {
  const [timeRange, setTimeRange] = useState([25, 75]);
  const [startCellStats, setStartCellStats] = useState(initialStartCellStats);
  const [additionalSources, setAdditionalSources] = useState([]);
  const handleReset = () => {
    setStartCellStats(initialStartCellStats);
  };
  const handleAddNewSource = () => {
    setAdditionalSources(
      [...additionalSources,
        {
          id: Date.now(),
          x: null,
          y: null,
          t: null,
        },
      ],
    );
  };

  const deleteSource = (item) => {
    const items = additionalSources.filter((s) => s.id !== item.id);
    setAdditionalSources(items);
  };
  //
  // const handleChangeSource = (item) => {
  //   const sources = [...additionalSources];
  //   const source = sources.find((s) => s.id === item.id);
  // };

  return (
    <Container>

      <LeftColumn $style={() => ({ width: '25%' })}>
        <Block>
          <Title>Отрезок времени</Title>
          <Slider
            value={timeRange}
            onChange={({ value }) => value && setTimeRange(value)}
          />
          <Title>Положение стартовой клетки</Title>
          <Row>
            <TextInput
              label="x"
              width="30%"
              type="number"
              value={startCellStats.x}
              onChange={(e) => setStartCellStats({ ...startCellStats, x: e.value })}
            />
            <TextInput
              label="y"
              width="30%"
              type="number"
              value={startCellStats.y}
              onChange={(e) => setStartCellStats({ ...startCellStats, y: e.value })}
            />
            <TextInput
              label="t"
              width="30%"
              type="number"
              value={startCellStats.t}
              onChange={(e) => setStartCellStats({ ...startCellStats, t: e.value })}
            />
          </Row>
          <Row>
            <TextInput
              label="p"
              width="30%"
              type="number"
              value={startCellStats.p}
              onChange={(e) => setStartCellStats({ ...startCellStats, p: e.value })}
            />
            <TextInput
              label="c"
              width="30%"
              type="number"
              value={startCellStats.c}
              onChange={(e) => setStartCellStats({ ...startCellStats, c: e.value })}
            />
            <Button
              overrides={{
                Root: {
                  style: {
                    width: '30%',
                    height: '100%',
                  },
                },
              }}
              onClick={handleReset}
            >
              Сбросить
            </Button>
          </Row>
          <Row>
            <Title $style={() => ({ width: '50%', marginBottom: 0 })}>Дополнительные источники тепла</Title>
            <Button
              overrides={{
                BaseButton: {
                  style: {
                    width: '24%',
                    height: '100%',
                  },
                },
              }}
              onClick={handleAddNewSource}
            >
              Добавить
            </Button>
          </Row>
          <AdditionalSources>
            {additionalSources.map((item) => (
              <Row key={item.id}>
                <TextInput label="x" width="24%" type="number" value={item.x} />
                <TextInput label="y" width="24%" type="number" value={item.y} />
                <TextInput label="t" width="24%" type="number" value={item.t} />
                <Button
                  overrides={{
                    BaseButton: {
                      style: {
                        width: '24%',
                        height: '100%',
                        backgroundColor: '#810808',
                      },
                    },
                  }}
                  onClick={() => deleteSource(item)}
                >
                  Удалить
                </Button>
              </Row>
            ))}
          </AdditionalSources>
        </Block>
      </LeftColumn>

      <RightColumn>
        <GraphContainer>
          <img src="https://i2.wp.com/www.marktechpost.com/wp-content/uploads/2021/04/Screen-Shot-2021-04-12-at-9.19.50-PM.png?fit=990%2C772&ssl=1" alt="graphics" width="100%" height="100%" style={{ objectFit: 'cover' }} />
        </GraphContainer>
        <Block>
          <Title>Set time range</Title>
          <Slider
            value={timeRange}
            onChange={({ value }) => value && setTimeRange(value)}
          />
        </Block>
      </RightColumn>
    </Container>
  );
};

export default Main;
