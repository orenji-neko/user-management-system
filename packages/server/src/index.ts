import Express from "express";

const app = Express();

// middleware
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.get("/api", (request, response) => {
  response.send("Testing");
});

app.listen(3000);
