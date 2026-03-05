type ComboFunction = <T>(
  array: T[],
  minOutputSize?: number,
  maxOutputSize?: number,
) => T[][];

function toIntegerOrFallback(value: number | undefined, fallback: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.floor(value);
}

function clamp(value: number, min: number, max: number): number {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

const combo: ComboFunction = function combo<T>(
  array: T[],
  minOutputSize?: number,
  maxOutputSize?: number,
): T[][] {
  if (!Array.isArray(array)) {
    throw new TypeError("Expected first argument to be an array.");
  }

  if (array.length === 0) {
    return [];
  }

  const normalizedMin = clamp(
    toIntegerOrFallback(minOutputSize, 1),
    1,
    array.length,
  );
  const normalizedMax = clamp(
    toIntegerOrFallback(maxOutputSize, array.length),
    1,
    array.length,
  );

  if (normalizedMax < normalizedMin) {
    return [];
  }

  const output: T[][] = [];
  const working: T[] = [];

  function build(startIndex: number, picksRemaining: number): void {
    if (picksRemaining === 0) {
      output.push([...working]);
      return;
    }

    const maxIndex = array.length - picksRemaining;
    for (let i = startIndex; i <= maxIndex; i += 1) {
      working.push(array[i]);
      build(i + 1, picksRemaining - 1);
      working.pop();
    }
  }

  for (let size = normalizedMin; size <= normalizedMax; size += 1) {
    build(0, size);
  }

  return output;
};

export = combo;
