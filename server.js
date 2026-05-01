import app from "./app.js";
import { env } from "./config/env.js";
import mongoose from "mongoose";

async function startServer() {
    try {
        await mongoose.connect(env.MONGO_URI);
         console.log("Database connected successfully");
        const server = app.listen(env.PORT, () => {
            console.log(`Server running on port ${env.PORT}`);
        });

        process.on("SIGTERM", async () => {
            console.log("SIGTERM received. Shutting down...");
            await mongoose.connection.close();
            server.close(() => {
                console.log("Process terminated");
            });
        });

        process.on("SIGINT", async () => {
            console.log("SIGINT received. Shutting down...");
            await mongoose.connection.close();
            process.exit(0);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();