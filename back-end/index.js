const express = require("express");
const cors = require("cors");
const auth = require('./routes/auth.js');
const accounts = require('./routes/accounts.js');
const createTables = require("./models/allTables.js");

const app = express();
const PORT = 5000;

app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(require("./session.js"));
app.use(express.json());      // <-- parse JSON bodies

//Routes
app.use("/auth", auth);
app.use("/session", require("./routes/session"));
app.use("/accounts", accounts);

app.get('/', (req, res) => {
  res.send('Hello World from backend!');
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await createTables();
});
