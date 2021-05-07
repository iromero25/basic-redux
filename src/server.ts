import express from "express";

const app = express();
app.use(express.static("dist"));

// this serves the html page
app.get("/", (_req, res) => {
  res.sendFile("index.html");
});

app.listen(3000, () => console.log("listening on port 3000"));
