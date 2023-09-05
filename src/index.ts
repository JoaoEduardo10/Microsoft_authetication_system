import { app } from "./app/app";
import { cache } from "./database/cache";

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  cache.connect();
  console.log(`server running on: http://localhost:${PORT}`);
});
