import React from "react";

import MealItem from "./MealItem.tsx";
import ErrorPage from "./ErrorPage.tsx";
import { useHttp } from "../hooks/useHttp.ts";
import type { Meal } from "../util/data-types.ts";

const requestConfig: RequestInit = {};
const Meals: React.FC = () => {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp<Meal[]>("http://localhost:3000/meals", [], requestConfig);

  if (isLoading) {
    return <p className="center">Fetching Meals...</p>;
  }

  if (error !== "") {
    return <ErrorPage title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem meal={meal} key={meal.id} />
      ))}
    </ul>
  );
};

export default Meals;
