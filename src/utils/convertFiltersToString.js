export const convertFiltersToString = (filters) => `
  blur(${filters.blur}px)
  saturate(${filters.saturation}%)
  brightness(${filters.brightness}%)
  contrast(${filters.contrast}%)
  sepia(${filters.sepia}%)
`;
