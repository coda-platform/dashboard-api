import { Application } from "express";
import cors from "cors";

function register(app: Application) {
  const allowedOrigins: Array<string> = [
    ...(process.env.CODA_DASHBOARD_APP_URL
      ? [process.env.CODA_DASHBOARD_APP_URL]
      : []),
  ];

  const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
  };

  app.use(cors(corsOptions));
}

export default {
  register,
};
