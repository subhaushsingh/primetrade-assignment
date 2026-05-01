import app from "./app.js";

async function startServer() {
    try {
        const server = app.listen(env.PORT, () => {
            console.log(`Server running on port ${env.PORT}`);
        });

        process.on("SIGTERM", async () => {
            console.log("SIGTERM received. Shutting down...");
            server.close(() => {
                console.log("Process terminated");
            });
        });

        process.on("SIGINT", async () => {
            console.log("SIGINT received. Shutting down...");
            process.exit(0);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();