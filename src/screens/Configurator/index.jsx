import React, { useCallback, useState } from 'react';
import { Checkbox } from 'baseui/checkbox';
import { Radio, RadioGroup } from 'baseui/radio';
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
  SubTitle,
  StartButton,
  ResetButton,
  ButtonsRow,
  AfterLinkButton,
} from './styles';
import TextInput from '../../ui/TextInput';
import BorderFrame from '../../ui/BorderFrame';
import { capitalizeFirstLetter } from '../../utils';
import createClient from '../../client';

const client = createClient();

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
  calculationMode,
  onCalculationModeChange,
  homogeneity,
  onHomogeneityChange,
  onResetPress,
  plate,
}) => {
  const [downloadLink, setDownloadLink] = useState(null);

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
    [sources, onSourceTemperatureChange],
  );

  const renderPlate = useCallback(
    (_, index) => {
      const x = Math.trunc(index / plateSize);
      const y = index % plateSize;
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
    [sources, plateSize, onActiveCellClick, onInactiveCellClick],
  );

  const onStart = async () => {
    const res = await client.calculate({
      sources,
      plateSize,
      borders,
      timeRange,
      plateStats,
      calculationMode,
    });
    setDownloadLink(res.link);
  };

  const setBorderInputs = useCallback(
    (border) => {
      return (
        <TextInput
          label={
            <BorderTitle>
              {capitalizeFirstLetter(border)}, t°{' '}
              <Checkbox
                checked={borders[border].isActive}
                onChange={onBorderClick.bind(this, border)}
              />
            </BorderTitle>
          }
          key={`${border}-key`}
          value={borders[border].temperature}
          width="24%"
          disabled={!borders[border].isActive}
          onChange={({ target }) =>
            onBorderTemperatureChange(border, target.value)
          }
        />
      );
    },
    [borders, onBorderClick, onBorderTemperatureChange],
  );

  return (
    <Container>
      <LeftColumn>
        <Block>
          <Title>Размер пластины (у. е.)</Title>
          <Slider
            value={[plateSize]}
            onChange={onPlateSizeChange}
            min={5}
            max={40}
          />
          <Title>Отрезок времени (сек)</Title>
          <Slider
            value={timeRange}
            onChange={onTimeRangeChange}
            min={0}
            max={60}
          />
          <Title>Режим вычислений</Title>
          <Block>
            <RadioGroup
              value={calculationMode}
              onChange={onCalculationModeChange}
            >
              <Radio value="quasilinear">Квазилинейная задача</Radio>
              <Radio value="endothermic">
                С учётом эндотермических эффектов
              </Radio>
            </RadioGroup>
          </Block>
          <Title>Однородность пластины</Title>
          <Block>
            <RadioGroup value={homogeneity} onChange={onHomogeneityChange}>
              <Radio value="homogeneity">Однородная</Radio>
              <Radio value="heterogeneity">Неоднородная</Radio>
            </RadioGroup>
          </Block>
          <Title>Характеристики пластины</Title>
          {homogeneity === 'heterogeneity' && <SubTitle>Пластина 1</SubTitle>}
          <Row>
            <TextInput
              label="c"
              width="48%"
              placeholder={plateStats.plate1.c}
              value={plateStats.plate1.c}
              onChange={onStatsChange('plate1', 'c')}
            />
            <TextInput
              label="p"
              width="48%"
              value={plateStats.plate1.p}
              placeholder={plateStats.plate1.p}
              onChange={onStatsChange('plate1', 'p')}
            />
          </Row>
          {homogeneity === 'heterogeneity' && (
            <>
              <SubTitle>Пластина 2</SubTitle>
              <Row>
                <TextInput
                  label="c"
                  width="48%"
                  placeholder={plateStats.plate2?.c}
                  value={plateStats.plate2?.c}
                  onChange={onStatsChange('plate2', 'c')}
                />
                <TextInput
                  label="p"
                  width="48%"
                  value={plateStats.plate2?.p}
                  placeholder={plateStats.plate2?.p}
                  onChange={onStatsChange('plate2', 'p')}
                />
              </Row>
            </>
          )}
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
        <ButtonsRow>
          <StartButton onClick={onStart}>Start</StartButton>
          <ResetButton onClick={onResetPress}>Reset</ResetButton>
        </ButtonsRow>
        {downloadLink && (
          <ButtonsRow>
            <AfterLinkButton>
              <a href="#" download={'#'} style={{ color: 'white' }}>
                Скачать файл
              </a>
            </AfterLinkButton>
            <AfterLinkButton>
              <a
                href="mycustproto:Vizualizer"
                download={'#'}
                style={{ color: 'white' }}
              >
                Визуализатор
              </a>
            </AfterLinkButton>
          </ButtonsRow>
        )}
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
  plate: PropTypes.arrayOf(PropTypes.number),
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
  timeRange: PropTypes.arrayOf(PropTypes.number),
  plateStats: PropTypes.shape({
    plate1: PropTypes.shape({
      c: PropTypes.number,
      p: PropTypes.number,
    }),
    plate2: PropTypes.shape({
      c: PropTypes.number,
      p: PropTypes.number,
    }),
  }),
  homogeneity: PropTypes.string,
  onHomogeneityChange: PropTypes.func,
  calculationMode: PropTypes.oneOf(['quasilinear', 'endothermic']),
  onActiveCellClick: PropTypes.func,
  onInactiveCellClick: PropTypes.func,
  onSourceTemperatureChange: PropTypes.func,
  onBorderClick: PropTypes.func,
  onBorderTemperatureChange: PropTypes.func,
  onPlateSizeChange: PropTypes.func,
  onTimeRangeChange: PropTypes.func,
  onStatsChange: PropTypes.func,
  onResetPress: PropTypes.func,
};

export default Configurator;
