export const INITIAL_PLATE_SIZE = 40;

export const INITIAL_SOURCE = {
  id: 0,
  x: 2,
  y: 2,
  t: 10,
};

export const INITIAL_PLATE_STATS = {
  plate1: {
    p: 1500,
    c: 1000,
  },
  plate2: null,
};

export const INITIAL_BORDERS = {
  left: {
    isActive: false,
    temperature: '',
  },
  right: {
    isActive: false,
    temperature: '',
  },
  top: {
    isActive: false,
    temperature: '',
  },
  bottom: {
    isActive: false,
    temperature: '',
  },
};

export const TEST_GRID = [
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.572382, -1.007387, -1.188579,
  -1.051415, -0.61641, 0.0, 0.0, -1.007387, -1.772987, -2.091874, -1.850461,
  -1.084862, 0.0, 0.0, -1.188579, -2.091874, -2.468102, -2.18326, -1.279967,
  0.0, 0.0, -1.051415, -1.850461, -2.18326, -1.931283, -1.132237, 0.0, 0.0,
  -0.61641, -1.084862, -1.279967, -1.132237, -0.663786, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0,
];

export const INITIAL_TIME_RANGE = 10;
