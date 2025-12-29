import React from "react";

type Meal = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  quantity?: number;
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

type CartContextProps = {
  items: Meal[];
  addItem: (item: Meal) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

type CartState = {
  items: Meal[];
};

type CartReducerAction = {
  type: string;
  item?: Meal;
  id?: string;
};

type ModalProps = {
  open: boolean;
  className?: string;
  onClose?: () => void;
};

type UserProgressContextProps = {
  progress: string;
  showCart: () => void;
  hideCart: () => void;
  showCheckout: () => void;
  hideCheckout: () => void;
};

type CartButtonProps = {
  onIncrease: () => void;
  onDecrease: () => void;
};

type CartItemProps = Meal & CartButtonProps;

type InputProps = {
  label: string;
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

type GenericApiResponse = {
  message?: string;
};

type HttpHookProps<T> = {
  data: T;
  isLoading: boolean;
  error: string;
  sendRequest: (body?: OrderRequest) => Promise<void>;
  clearData: () => void;
};

type ErrorPageProps = {
  title: string;
  message: string;
};

type Customer = {
  name: string;
  email: string;
  street: string;
  "postal-code": string;
  city: string;
};

type Order = {
  items: Meal[];
  customer: Customer;
};

type OrderRequest = {
  order: Order;
};

export type {
  Meal,
  MealItemProps,
  ButtonProps,
  CartContextProps,
  CartState,
  CartReducerAction,
  ModalProps,
  UserProgressContextProps,
  CartItemProps,
  InputProps,
  HttpHookProps,
  GenericApiResponse,
  ErrorPageProps,
  Customer,
  OrderRequest,
};
