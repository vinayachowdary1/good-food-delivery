// src/__tests__/Sum.test.jsx
import { Sum } from '../components/Sum';

  test("calculates the sum of two numbers", () => {
    const result = Sum(4, 3);
    expect(result).toBe(7); //assertion
  });
