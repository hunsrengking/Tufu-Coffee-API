import "dotenv/config";
import app from "./src/app.js";
import logger from "./src/utils/logger.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(process.env.NODE_ENV);
  logger.info(`Server running on port ${HOST}:${PORT}`);
});