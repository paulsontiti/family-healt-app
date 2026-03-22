import app from "./app.js";

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

