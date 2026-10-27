import { useState } from 'react';
import { generateFood, getAvailableFoods } from '../../src/renderer/food/index.ts';
import { PartSelector } from './PartSelector.tsx';
import { SvgPreview } from './Preview.tsx';

export function FoodPlayground() {
  const [food, setFood] = useState('apple_red');
  const foods = getAvailableFoods();

  function randomize() {
    const index = Math.floor(Math.random() * foods.length);
    setFood(foods[index]);
  }

  return (
    <div className="grid grid-cols-2 gap-8 items-start max-sm:grid-cols-1">
      <div className="sticky top-4 max-sm:static">
        <SvgPreview svg={generateFood(food)} config={{ food }} />
      </div>
      <PartSelector
        category="food"
        label="Food"
        variants={foods}
        selected={food}
        getThumbnail={generateFood}
        onChange={setFood}
        onRandomize={randomize}
      />
    </div>
  );
}
