export default {
  clearMocks: true,
  preset: 'ts-jest',
  // roots: ["<rootDir>/test", "<rootDir>/src/app"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/test/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: ["<rootDir>/src/**/*.{js,jsx,ts,tsx}"],
  setupFiles: ["./jest.setup.js"],
  coveragePathIgnorePatterns: [
    "migrations",
  ]
};
