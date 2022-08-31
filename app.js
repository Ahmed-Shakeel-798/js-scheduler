const express = require("express");
const cors = require("cors");
const connectMongoDB = require("./db/mongoose");

class ExpressServer {
  /**
   * Creates a new instance of express server
   * @param {Object} config - Application configuration
   */
  constructor(config) {
    this.config = config;
    this.app = express();
  }

  /**
   * Initial setup for services
   */
  async setup() {
    await connectMongoDB(this.config.MONGO_URI);
    this.createServer();
  }

  /**
   * Cretes an http(s) express server
   */
  async createServer() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.listen(3000, () =>
      console.log(`Scheduler server listening on PORT:${this.config.PORT}`)
    );
  }
}

module.exports = ExpressServer;