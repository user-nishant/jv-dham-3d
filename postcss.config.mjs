const option = {
  unitToConvert: 'px',
  viewportWidth: 1440,
  unitPrecision: 5,
  propList: ['*'],
  viewportUnit: 'vw',
  fontViewportUnit: 'vw',
  selectorBlackList: [],
  minPixelValue: 1,
  mediaQuery: false,
  replace: true,
  exclude: undefined,
  include: undefined,
  landscape: false,
  landscapeUnit: 'vw',
  landscapeWidth: 568,
  // include: /\/src\/|\/node_modules\/@ant-design\//,
}; // Base designer size; 360px by default

const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    // tailwindcss: {},
    'postcss-px-to-viewport-8-plugin': option,
    autoprefixer: {}
  },
};

export default config;
