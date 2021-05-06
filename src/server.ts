// import path from "path";
import express from "express";

const app = express();
app.use(express.static("dist"));

// this serves the html page
app.get("/", (_req, res) => {
  // const options = {
  //   root: path.resolve(__dirname, ".."),
  // };
  // since the options' root is pointing to the root, we can access public
  // from there
  // res.sendFile("index.html", options);
  res.sendFile("index.html");
});

app.listen(3000, () => console.log("listening on port 3000"));
