const axios = require("axios");

module.exports = axios.create({
  baseURL: process.env.CODA_HUB_API_URL,
  // If the request takes more than `timeout` ms, it is aborted.
  timeout: 300 * 1000,
  // Communication between FE and BE is JSON
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
