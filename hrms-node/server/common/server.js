import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as http from "http";
import * as path from "path";
import morgan from "morgan";
import apiErrorHandler from "../helper/apiErrorHandler.js";

const app = new express();
const server = http.createServer(app);

class ExpressServer {
  constructor() {
    app.use(express.json({ limit: "1000mb" }));

    app.use(express.urlencoded({ extended: true, limit: "1000mb" }));

    app.use(morgan("dev"));

    app.use(
      cors({
        allowedHeaders: ["Content-Type", "Authorization", "token"],
        exposedHeaders: ["token", "Authorization"],
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        credentials: true,
      })
    );

    // Handle preflight requests for all routes
    app.options("*", cors());
  }
  router(routes) {
    routes(app);
    return this;
  }



  handleError() {
    app.use(apiErrorHandler);

    return this;
  }

  async configureDb(dbUrl) {
    try {
      mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log("database connection established");
      return this;
    } catch (err) {
      console.error(`Error in mongodb connection ${err.message}`);
      throw err;
    }
  }

  // })

  listen(port) {
    server.listen(port, () => {
      console.log(
        `secure app is listening @port ${port}`,
        new Date().toLocaleString()
      );
    });
    return app;
  }
  
}





export default ExpressServer;
