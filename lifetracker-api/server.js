const express = require("express")
const cors = require("cors")
const morgan = require("morgan");
const { PORT } = require("../config")

const authRoutes = require("./routes/auth.js")

const { BadRequestError, NotFoundError } = require("./utils/errors")

const app = express()

// enable cross-origin resource sharing
app.use(cors());
// parse incoming request with JSON
app.use(express.json());
// log request info
app.use(morgan("tiny"));

app.use("/auth", authRoutes)


app.use((req, res, next) => {
    return next(new NotFoundError());
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
});
  


app.listen(PORT, () => {
    console.log(`🚀 Server running http://localhost:${PORT}`);
  });