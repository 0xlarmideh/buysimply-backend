import express from "express";
import bodyParser from "body-parser";
import loanRoutes from "./routes/loan";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use("/api", loanRoutes);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(err.status || 500).json({
      error: {
        message: err.message || "An unexpected error occurred",
      },
    });
  }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
