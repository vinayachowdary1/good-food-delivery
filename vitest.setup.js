// Importing Jest DOM matchers
import '@testing-library/jest-dom/vitest';

// Using Vitest's global mocking
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

