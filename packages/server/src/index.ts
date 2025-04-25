import Express from "express";
import authentication from "./modules/authentication";

const app = Express();

// middleware
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// modules
app.use("/api/auth", authentication);

app.listen(3000);
