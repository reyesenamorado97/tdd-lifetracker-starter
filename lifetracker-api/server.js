const express = require("express")
const cors = require("cors")
const morgan = require("morgan");
const { PORT } = require("./config")
const security = require("./middleware/security")

const authRoutes = require("./routes/auth.js")
const nutritionRoutes = require("./routes/nutrition");


const { BadRequestError, NotFoundError } = require("./utils/errors")

const app = express()

// enable cross-origin resource sharing
app.use(cors());
// parse incoming request with JSON
app.use(express.json());
// log request info
app.use(morgan("tiny"));

// For every request, check if a token exists
// in the authorization header
// if it does, attach the decoded user to res.local
app.use(security.extractUserFromJwt)

// SET ROUTES
app.use("/auth", authRoutes)
app.use("/nutrition", nutritionRoutes);

app.get('/', function (request, response) {
  response.status(200).json({ping: "pong"});
})

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
  
app.listen(process.env.PORT || PORT, () => {
    console.log(`🚀 Server running http://localhost:${PORT}`);
  });