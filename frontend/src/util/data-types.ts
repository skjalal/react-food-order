import React from "react";

type Meal = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

type MealItemProps = {
  meal: Meal;
};

type CustomButtonProps = {
  textOnly: boolean;
  className?: string;
};

type ButtonProps = CustomButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export type { Meal, MealItemProps, ButtonProps };
