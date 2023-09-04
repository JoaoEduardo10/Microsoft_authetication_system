import { app } from "./app/app";

const PORT = process.env.PORT || 7000;

app.listen(PORT, () =>
  console.log(`server running on: http://localhost:${PORT}`)
);
