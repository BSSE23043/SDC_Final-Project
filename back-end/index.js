const express = require("express");
const cors = require("cors");
const auth = require('./routes/auth.js');
const accounts = require('./routes/accounts.js');

const createTables = require("./models/allTables.js");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());      // <-- parse JSON bodies
app.use("/auth", auth);
app.use("/accounts", accounts);

app.get('/', (req, res) => {
  res.send('Hello World from backend!');
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await createTables();
});
