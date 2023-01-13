const express = require("express");
const { connection } = require("./config/db.js");
const { userRouter } = require("./routes/user.routes.js");
const { noteRouter } = require("./routes/Note.routes.js");
const { authenticate } = require("./middlewares/authenticate.middleware.js");
const cors = require("cors");
require("dotenv").config();
const port = process.env.port;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);
app.use(authenticate);
app.use("/notes", noteRouter);



app.listen(port, async () => {
  try {
    await connection;
    console.log("Connection Established");
  } catch (error) {
    console.log("Err: Connection in DB");
    console.log(error);
  }
  console.log(`listening on port ${port}`);
});

// {
//   "title":"Frontend",
//   "note":"Crud PSC",
//   "catagory":"Live Session",
//   "author":"Sitansu"
// }
