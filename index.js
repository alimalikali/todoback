require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todosRoutes = require("./routes/todosRoutes");
const userRoutes = require("./routes/usersRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorControllers");


const app = express();
0
app.use(cors());

app.use(express.json());

// app.use((req, res, next) => {
//   console.log("middleware is invoked");
//   console.log(req.path, req.method);
//   next();
// });

app.use("/api/todos", todosRoutes);
app.use("/api/users", userRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

mongoose
  .connect(process.env.MONGODB_URI, { dbName: "TODO_24" })
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`DB connected to port`, process.env.PORT);
    }) 
  )
  .catch((e) => console.log(e));
