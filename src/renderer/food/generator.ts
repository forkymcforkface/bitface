import type { PixelGrid } from '../../types.ts';
import { stampPart } from '../generator.ts';
import food from '../parts/food/index.ts';
import { FOOD_COLOR_ROLES } from '../parts/food/palette.ts';

const BASE_SIZE = 16;

export function generateFoodGrid(name: string): PixelGrid {
  const grid: PixelGrid = Array.from({ length: BASE_SIZE }, () =>
    Array.from({ length: BASE_SIZE }, () => null)
  );

  if (Object.prototype.hasOwnProperty.call(food, name)) {
    stampPart(grid, food[name], FOOD_COLOR_ROLES);
  }

  return grid;
}
