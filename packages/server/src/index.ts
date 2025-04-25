import Express from "express";

const app = Express();

app.get("/api", (request, response) => {
  response.send("Testing");
});

app.listen(3000);