import express from "express";

import cors from "cors";

import compatibilityRoutes
from "./routes/compatibilityRoutes.js";

import buildRoutes
from "./routes/buildRoutes.js";


const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/compatibility",
  compatibilityRoutes
);

app.use(
  "/api/builds",
  buildRoutes
);

export default app;