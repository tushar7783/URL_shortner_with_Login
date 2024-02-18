const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;
const urlroutes = require("./routes/urlRoute");
const userroutes = require("./routes/userRoute");
const { connectMongodb } = require("./connect");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middlware/auth");

connectMongodb("mongodb://127.0.0.1:27017/url-app-1").then(() => {
  console.log("mongodb connect ");
});

app.set("view engine", "ejs");
app.set("view", path.resolve("./view"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// const urlRoute = require("./routes/urlRoute");
app.use("/api", authMiddleware.checkForauthorization, urlroutes);
app.use("/user", userroutes);
app.get("/", async (req, res) => {
  try {
    console.log("api working");
    res.send("api working");
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
