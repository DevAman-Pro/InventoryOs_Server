
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import { env } from "./config/env.js";
import authRoutes from "./modules/auth/auth.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL }));
app.use(express.json({ limit: "100kb" }));

app.get("/api/v1/health", (_req, res) => {
  const connected = mongoose.connection.readyState === 1;

  res.status(connected ? 200 : 503).json({
    success: connected,
    message: connected
      ? "InventoryOS API and database are running"
      : "Database disconnected",
  });
});

app.use("/api/v1/auth", authRoutes);

// Keep the error handler after all routes.
app.use(errorHandler);

export default app;
