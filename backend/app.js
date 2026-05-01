import express from 'express';
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import hpp from 'hpp';
import compression from "compression";
import cookieParser from "cookie-parser";
import { rateLimit } from 'express-rate-limit';

import { env } from "./config/env.js";
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import routes from "./routes/index.js";

const app = express();
app.use(cookieParser());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56,

})

app.set("trust proxy", 1);
app.use(helmet());
app.use(hpp());
app.use(compression());
app.use(limiter);

app.use(cors({
    origin: [
        'http://localhost:5173'],
    credentials: true,
}));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

if (env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        environment: env.NODE_ENV,
    });
});

app.use("/api/v1", routes);

app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` })
})

app.use(errorHandler);

export default app;