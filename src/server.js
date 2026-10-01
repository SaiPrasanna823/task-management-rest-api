const express = require("express");
const jwt = require("jsonwebtoken");

const db = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const PORT = 5000;

process.env.JWT_SECRET = "my_task_api_secret_2026";

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Task API is running!"
    });
});

app.get("/test-db", (req, res) => {
    const tables = db
        .prepare(`
            SELECT name
            FROM sqlite_master
            WHERE type = 'table'
        `)
        .all();

    res.status(200).json(tables);
});

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        message: "Internal server error"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("JWT Secret configured");
});