const exress = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const postRouter = require("./routes/post.route");
const authRouter = require("./routes/auth.route");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error.middleware");

const app = exress();

app.use(exress.json());
app.use(cookieParser({}));
app.use(exress.static("static"));
app.use(fileUpload({}));

app.use("/api", postRouter);
app.use("/api/auth", authRouter);

app.use(errorMiddleware);

const Port = process.env.PORT || 3000;

const starter = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log("Connected to DB"));
    app.listen(Port, () => {
      console.log("Server is running on port", Port);
    });
  } catch (error) {
    console.log(`Connecting DB error: ${error}`);
  }
};

starter();
