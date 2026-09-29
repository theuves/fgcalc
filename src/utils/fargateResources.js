export const CPU_VALUES = [0.25, 0.5, 1, 2, 4];

const range = (start, end) => Array.from({ length: end - start + 1 }, (_, index) => start + index);

const MEMORY_VALUES = {
  0.25: [0.5, 1, 2],
  0.5: range(1, 4),
  1: range(2, 8),
  2: range(4, 16),
  4: range(8, 30),
};

export const getMemoryValues = (cpu) => MEMORY_VALUES[cpu] || MEMORY_VALUES[0.25];
