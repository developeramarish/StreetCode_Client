import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    //antd: "<rootDir>/__mocks__/antd/antd",
    "^antd/(.*)$": "<rootDir>/node_modules/antd/es/$1",
    "antd/es/form/FormItem": "<rootDir>/__mocks__/antd/es/form/FormItem",
    "antd/es/form/Form": "<rootDir>/__mocks__/antd/es/form/Form",
    "antd/es/form/TextArea": "<rootDir>/__mocks__/antd/es/input/TextArea",
    "antd/es/mentions": "<rootDir>/__mocks__/antd/es/mentions/mentions",
    "@/app/api/team/positions.api":
      "<rootDir>/src/app/api/team/positions.api.mock.ts",
    "^@images/(.*)$": "<rootDir>/src/assets/images/$1",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.ts",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@features/(.*)$": "<rootDir>/src/features/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@components/(.*)$": "<rootDir>/src/app/common/components/$1",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@api/(.*)$": "<rootDir>/src/app/api/$1",
    "^@constants/(.*)$": "<rootDir>/src/app/common/constants/$1",
    "^@hooks/(.*)$": "<rootDir>/src/app/common/hooks/$1",
    "^antd/es/upload$": "<rootDir>/__mocks__/antd/es/upload/upload.tsx",
    "^antd/es/date-picker/locale/uk_UA$": "<rootDir>/__mocks__/antd/es/date/localeprovider.tsx",
    "^antd/locale/(.*)$": "<rootDir>/node_modules/antd/locale/$1",
    "^antd/es/table$": "<rootDir>/node_modules/antd/es/table",

    // DEV_NOTE: Down below is the right solution for compiling files by path
    // But we need to fix ALL typo errors before it could be compiled
    // Temp solution - mocking modules.
    // After fixing type error remove mocks or continue using them(as more simple solution)
    /*
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@app/(.*)$': '<rootDir>/src/app/$1',
        '^@sass/(.*)$': '<rootDir>/src/assets/sass/$1',
        '^@images/(.*)$': '<rootDir>/src/assets/images/$1',
        '^@features/(.*)$': '<rootDir>/src/features/$1',
        '^@api/(.*)$': '<rootDir>/src/app/api/$1',
        '^@stores/(.*)$': '<rootDir>/src/app/stores/$1',
        '^@models/(.*)$': '<rootDir>/src/models/$1',
        '^@components/(.*)$': '<rootDir>/src/app/common/components/$1',
        '^@hooks/(.*)$': '<rootDir>/src/app/common/hooks/$1',
        '^@constants/(.*)$': '<rootDir>/src/app/common/constants/$1',
        '^@utils/(.*)$': '<rootDir>/src/app/common/utils/$1',
        */
  },

  verbose: true,
  collectCoverageFrom: [
    "src/**/*.{ts,js}",
    "!src/**/*.d.ts",
    // temp disable coverage collection for tsx, jsx until type errors will be fixed
  ],
  globals: {
    _env_: {
      API_URL: "https://mock_URL.com",
      SERVER_API_URL: "https://test.server.com",
    },
  },
  transform: {
    "^.+\\.svg$": "jest-transformer-svg",
    // "^.+\\.tsx?$": "babel-jest",
  },
  // transformIgnorePatterns: [
  //   '/node_modules/(?!(antd)/)',
  // ],
  coverageThreshold: {
    global: {
      statements: 0.1,
      branches: 0.0,
      functions: 0.0,
      lines: 0.1,
    },
  },
};

export default jestConfig;
