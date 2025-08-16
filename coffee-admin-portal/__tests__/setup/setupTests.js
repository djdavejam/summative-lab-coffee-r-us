import '@testing-library/jest-dom';

// Mock window.alert for all tests
beforeEach(() => {
  window.alert = jest.fn();
});

// Mock window.confirm for all tests
beforeEach(() => {
  window.confirm = jest.fn(() => true);
});

// Mock console.error to avoid noise in test output
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});