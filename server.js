import "dotenv/config";
import app from "./src/app.js";
import logger from "./src/utils/logger.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "[IP_ADDRESS]";

app.listen(PORT, HOST, () => {
  logger.info(`Server running on http://${HOST}:${PORT}`);
});