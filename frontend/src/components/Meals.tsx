import React, { useState, useEffect } from "react";

import MealItem from "./MealItem.tsx";
import type { Meal } from "../util/data-types.ts";

const Meals: React.FC = () => {
  const [loadedMeals, setLoadedMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const fetchMeals = async (): Promise<void> => {
      const respone = await fetch("http://localhost:3000/meals");
      if (respone.ok) {
        const meals: Meal[] = await respone.json();
        setLoadedMeals(meals);
      }
    };
    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem meal={meal} key={meal.id} />
      ))}
    </ul>
  );
};

export default Meals;
