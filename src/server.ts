// App config from .env
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import KeycloakFactory from "./auth/keycloak-factory";

import CorsMiddleware from "./middleware/CorsMiddleware";
import indexRouter from "./routes/index";
import apiRouter from "./routes/api";
import sitesRouter from "./routes/sites";
import homeRouter from "./routes/home";
import statsRouter from "./routes/stats";
import learningRouter from "./routes/learning";
import version from "./utils/version";

const app = express();

// Replaces body-parser, which is deprecated
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

CorsMiddleware.register(app);

const port = process.env.PORT || 3000;
app.set("port", port);
const server = app.listen(app.get("port"), () => {
  console.log(
    `⚡️[coda-dashboard-api]: Server is running at http://localhost:${port}`,
  );
  console.log(
    `⚡️[coda-dashboard-api]: Running ${version.getBuildVersion()} version of build`,
  );
});

const keycloak = KeycloakFactory.get(app);
app.use(keycloak.middleware());

app.use("/", indexRouter);
app.use("/sites", keycloak.protect(), sitesRouter);
app.use("/home", keycloak.protect(), homeRouter);
app.use("/api", keycloak.protect(), apiRouter);
app.use("/stats", keycloak.protect(), statsRouter);
app.use("/learning", keycloak.protect(), learningRouter);