import Express from "express";
import authentication from "./modules/authentication";
import error from "./middleware/error";
import user from "./modules/user";

const app = Express();

// middleware
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// modules
app.use("/api", authentication);
app.use("/api/users", user);

// error
app.use(error);

app.listen(3000);
