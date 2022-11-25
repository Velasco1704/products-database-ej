import express from "express";
import cors from "cors";
import { PORT } from './config.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import productsRoutes from "./routes/products.routes.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

app.use(productsRoutes);

app.use(express.static(join(__dirname, '../client/dist')))

app.listen(PORT);
console.log(`Server on port ${PORT}`);