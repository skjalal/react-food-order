import { Request, Response } from "express";
import { config } from "./config/env.js";
import { buildApp } from "./lib/server.js";
import { errorHandler } from "./lib/error-handler.js";
import { healthHandler } from "./routes/health.js";
import { statusHandler } from "./routes/status.js";
import { loadMeals, createOrder } from "./routes/order.js";
import type { Order } from "./util/data-types.js";

const app = buildApp();

app.get("/healthz", healthHandler);
app.get("/api/v1/status", statusHandler);

app.get("/meals", async (_req: Request, res: Response) => {
  const meals = await loadMeals();
  res.json(meals);
});

app.post("/orders", async (req: Request, res: Response) => {
  const { order: orderData } = req.body;

  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (
    orderData === null ||
    orderData.items === null ||
    orderData.items.length === 0
  ) {
    return res.status(400).json({ message: "Missing data." });
  }
  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes("@") ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === "" ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === "" ||
    orderData.customer["postal-code"] === null ||
    orderData.customer["postal-code"].trim() === "" ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ""
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code or city is missing.",
    });
  }

  const newOrder: Order = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  await createOrder(newOrder);
  res.status(201).json({ message: "Order created!" });
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

// Error handler (must be last)
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.info(`Express server listening on port ${config.PORT}`);
});
