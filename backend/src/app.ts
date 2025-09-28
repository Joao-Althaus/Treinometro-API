import dotenv  from "dotenv";
import express from "express";
import router from './routes/index'
import cors from "cors";

dotenv.config({ quiet: true });

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;


const app = express();

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("API ta funcionando");
});

app.use('/api', router);

export default app
