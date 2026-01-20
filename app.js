const exress = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const postRouter = require("./routes/post.route");
dotenv.config();

const app = exress();

app.use(exress.json());

app.use("/api", postRouter);

// app.get("/uuid", );

// app.post("/", async (req, res) => {
//   const { title, body } = req.body;
//   const newPost = await postModel.create({ title, body });

//   console.log(newPost);

//   res.json({ title, body });
// });

// app.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   res.json({ id });
// });

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
