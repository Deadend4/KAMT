import React, { useEffect, useRef } from 'react';
import { Container } from './styles';

const d3 = require('d3');

const thresholds = d3.range(1, 20).map((i) => Math.pow(2, i));

const value = (x, y) =>
  (1 +
    (x + y + 1) ** 2 *
      (19 - 14 * x + 3 * x ** 2 - 14 * y + 6 * x * y + 3 * y ** 2)) *
  (30 +
    (2 * x - 3 * y) ** 2 *
      (18 - 32 * x + 12 * x * x + 48 * y - 36 * x * y + 27 * y ** 2));

const color = d3.scaleSequentialLog(d3.extent(thresholds), d3.interpolateMagma);

const Chart = ({ height, width, size }) => {
  const ref = useRef(null);

  const x = d3.scaleLinear([-2, 2], [0, width + 28]);

  const y = d3.scaleLinear([-2, 1], [height, 0]);

  const xAxis = (g) =>
    g
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisTop(x).ticks((width / height) * 10))
      .call((g) => g.select('.domain').remove())
      .call((g) =>
        g
          .selectAll('.tick')
          .filter((d) => x.domain().includes(d))
          .remove(),
      );

  const yAxis = (g) =>
    g
      .attr('transform', 'translate(-1,0)')
      .call(d3.axisRight(y))
      .call((g) => g.select('.domain').remove())
      .call((g) =>
        g
          .selectAll('.tick')
          .filter((d) => y.domain().includes(d))
          .remove(),
      );

  const grid = (() => {
    const q = 4;
    const x0 = -q / 2;
    const x1 = width + 28 + q;
    const y0 = -q / 2;
    const y1 = height + q;
    const n = Math.ceil((x1 - x0) / q);
    const m = Math.ceil((y1 - y0) / q);
    const _grid = new Array(n * m);
    for (let j = 0; j < m; ++j) {
      for (let i = 0; i < n; ++i) {
        _grid[j * n + i] = value(x.invert(i * q + x0), y.invert(j * q + y0));
      }
    }
    _grid.x = -q;
    _grid.y = -q;
    _grid.k = q;
    _grid.n = n;
    _grid.m = m;

    return _grid;
  })();

  const transform = ({ type, value, coordinates }) => {
    return {
      type,
      value,
      coordinates: coordinates.map((rings) => {
        return rings.map((points) => {
          return points.map(([x, y]) => [
            grid.x + grid.k * x,
            grid.y + grid.k * y,
          ]);
        });
      }),
    };
  };

  const contours = d3
    .contours()
    .size([grid.n, grid.m])
    .thresholds(thresholds)(grid)
    .map(transform);
  console.log('contours', contours);

  const chart = () => {
    const svg = d3
      .select(ref.current)
      .attr('viewBox', [0, 0, width + 28, height])
      .style('display', 'block')
      .style('margin', '0 -14px')
      .style('width', 'calc(100% + 28px)');

    svg
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#fff')
      .attr('stroke-opacity', 0.5)
      .selectAll('path')
      .data(contours)
      .join('path')
      .attr('fill', (d) => color(d.value))
      .attr('d', d3.geoPath());

    svg.append('g').call(xAxis);

    svg.append('g').call(yAxis);

    return svg.node();
  };

  useEffect(() => {
    if (ref.current) {
      chart();
    }
  }, [ref]);

  return (
    <Container>
      <svg ref={ref} width={width} height={height} />
    </Container>
  );
};

export default Chart;
