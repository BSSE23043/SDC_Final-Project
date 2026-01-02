const express = require("express");
const cors = require("cors");
const path = require("path");
const auth = require('./routes/auth.js');
const accounts = require('./routes/accounts.js');
const createTables = require("./models/allTables.js");
const book = require("./routes/book.js");

const app = express();
const PORT = 5000;

app.use(cors({origin: ["http://localhost:5173", "http://sdclb-108821170.us-east-1.elb.amazonaws.com"], credentials: true}));
app.use(require("./session.js"));
app.use(express.json());      // <-- parse JSON bodies


// Serve frontend
app.use(express.static(path.join(__dirname, "../front-end/dist")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/dist/index.html"));
});

//Routes
app.use("/auth", auth);
app.use("/session", require("./routes/session"));
app.use("/accounts", accounts);
app.use("/book", book);

app.get('/', (req, res) => {
  res.send('Hello World from backend!');
});

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await createTables();
});
