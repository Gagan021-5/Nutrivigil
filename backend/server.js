import express from "express";
import cors from "cors";
import router from "./router/processingroute.js";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/analyze", router);

app.get("/", (req, res) => {
  res.send({ msg: "Hey mate ! Backend Running!" });
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running at port ${process.env.PORT || 3000}`)
);
