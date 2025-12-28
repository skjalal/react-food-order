type Meal = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

type Customer = {
  email: string;
  name: string;
  street: string;
  "postal-code": string;
  city: string;
};

type Order = {
  id: string;
  customer: Customer;
  items: string[];
};

export type { Meal, Order, Customer };
