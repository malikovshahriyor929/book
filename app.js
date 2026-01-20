const exress = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const postModel = require("./models/post.model");
const dotenv = require("dotenv");
dotenv.config();

const app = exress();

app.use(exress.json());

app.get("/uuid", (req, res) => {
  const newUuid = uuidv4();
  res.send({ uuid: newUuid });
});

app.post("/", async (req, res) => {
  const { title, body } = req.body;
  const newPost = await postModel.create({ title, body });

  console.log(newPost);

  res.json({ title, body });
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ id });
});

const Port = process.env.PORT || 3000;



const starter = async () => {
  try {
    await mongoose.connect(process.env.DB_URL).then(() => console.log("Connected to DB"));
    app.listen(Port, () => {
      console.log("Server is running on port", Port);
    });
  } catch (error) {
    console.log(`Connecting DB error: ${error}`);
  }
};

starter();
