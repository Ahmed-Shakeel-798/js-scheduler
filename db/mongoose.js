const mongoose = require("mongoose");

/**
 * Connect to a mongodb server via mongoose
 * @param {String} MONGO_URI - uri of the mongodb server to connect to
 */
const connectMongoDB = async (MONGO_URI) => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("[+]::> DB (mongo) connected successfully");
    })
    .catch((error) => {
      console.error(`[-]<:: Error connecting to mongodb`);
      console.error(error.message);
    });
};

module.exports = connectMongoDB;
