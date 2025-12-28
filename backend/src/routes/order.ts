import { promises as fs } from "node:fs";
import path from "node:path";
import type { Meal, Order } from "../util/data-types.js";

const CHAR_SET = "utf-8";
const AVAILABLE_MEALS_FILE = "available-meals.json";
const ORDER_FILE = "orders.json";

export async function loadMeals(): Promise<Meal[]> {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      AVAILABLE_MEALS_FILE,
    );
    const meals = await fs.readFile(filePath, CHAR_SET);
    return JSON.parse(meals);
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function createOrder(newOrder: Order): Promise<void> {
  try {
    const filePath = path.join(process.cwd(), "src", "data", ORDER_FILE);
    const orders = await fs.readFile(filePath, CHAR_SET);
    const allOrders: Order[] = JSON.parse(orders);
    const updatedOrderId = allOrders.push(newOrder);
    console.info(updatedOrderId);
    await fs.writeFile(filePath, JSON.stringify(allOrders));
  } catch (err) {
    console.error(err);
  }
}
