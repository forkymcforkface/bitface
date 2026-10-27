import { generateFoodGrid } from './generator.ts';
import { gridToSvg } from '../svg.ts';
import food from '../parts/food/index.ts';

export { generateFoodGrid } from './generator.ts';

export function generateFood(name: string): string {
  const grid = generateFoodGrid(name);
  return gridToSvg(grid, 'transparent');
}

export function getAvailableFoods(): string[] {
  return Object.keys(food);
}
