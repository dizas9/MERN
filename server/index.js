const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

//middlewire
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://mern-vihv.onrender.com",
      "https://mern-front-blush.vercel.app",
      "http://localhost:5173",
      "http://localhost:5000",
      "http://localhost:4173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const port = 5000;

// Database configuration
const URI =
  "mongodb+srv://dizas9:yoyo@cluster0.kxj2bsu.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

//set session store
const store = new MongoDBStore({
  uri: URI,
  databaseName: "test",
  collection: "mySession",
});

app.use(
  session({
    key: "session",
    secret: "Hello@34",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 60 * 60 * 60 * 10,
      secure: true,
      hostOnly: false,
      httpOnly: false,
    },
  })
);

//routes defination

app.use("/api/user/", require("./routes/auth"));

app.get("/", (req, res) => res.send("Hello World vercel!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
