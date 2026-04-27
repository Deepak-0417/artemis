import "dotenv/config";
import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { initModels } from "./models/index.js";

const app = createApp();

initModels();

app.listen(env.port, () => {
  console.log(`GL Export Wizard API listening on http://localhost:${env.port}`);
});
