const esModules = ['@agm', 'ngx-bootstrap', 'lodash-es', 'graphql'].join('|');

module.exports = {
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  // testMatch: [
  //   '<rootDir>/(tests/*.test.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
  // ],
  transformIgnorePatterns: ["node_modules/graphql/(?!graphql).+\\.js$"],
  moduleDirectories: [
    "node_modules" // This is required
  ],
  moduleFileExtensions: [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node"
  ]
};
