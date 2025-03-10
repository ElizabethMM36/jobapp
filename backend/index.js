require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createPool({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "jobapp"
}).promise();

// Base route
app.get("/api", (req, res) => {
    res.send("Welcome to Job Portal API");
});

/** JOB APPLICANTS **/
app.post("/api/applicants", async (req, res) => {
    const { name, education_level, email, phone, field, level } = req.body;
    try {
        await db.query("INSERT INTO job_applicants (name, education_level, email, phone, field, level) VALUES (?, ?, ?, ?, ?, ?)",
            [name, education_level, email, phone, field, level]);
        res.status(201).send("Applicant added successfully");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/applicants", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM job_applicants");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/** RECRUITERS **/
app.post("/api/recruiters", async (req, res) => {
    const { name, role, company_name, email, phone, category, location, company_phone, company_email } = req.body;
    try {
        await db.query("INSERT INTO recruiter (name, role, company_name, email, phone, category, location, company_phone, company_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [name, role, company_name, email, phone, category, location, company_phone, company_email]);
        res.status(201).send("Recruiter added successfully");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/recruiters", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM recruiter");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/** JOB POSTINGS **/
app.post("/api/jobposting", async (req, res) => {
    const { company, name, r_title, recruiter, category, post_date, emp_role, location, email, contactnum } = req.body;
    try {
        await db.query("INSERT INTO jobposting (company, name, r_title, recruiter, category, post_date, emp_role, location, email, contactnum) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [company, name, r_title, recruiter, category, post_date, emp_role, location, email, contactnum]);
        res.status(201).send("Job posted successfully");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/jobposting", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM jobposting");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/** JOB APPLICATIONS **/
app.post("/api/jobs_applied", async (req, res) => {
    const { company, app_name, position, location, email, contactnum, status } = req.body;
    try {
        await db.query("INSERT INTO jobs_applied (company, app_name, position, location, email, contactnum, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [company, app_name, position, location, email, contactnum, status]);
        res.status(201).send("Application submitted successfully");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/jobs_applied", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM jobs_applied");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/** LOGIN ROUTES **/
const loginRoutes = ["adminlogin", "recruiterlogin", "userlogin"];
loginRoutes.forEach(route => {
    app.post(`/api/${route}`, async (req, res) => {
        const { username, password } = req.body;
        try {
            const [rows] = await db.query(`SELECT * FROM ${route} WHERE username = ? AND password = ?`, [username, password]);
            if (rows.length > 0) {
                res.json({ success: true, message: "Login successful" });
            } else {
                res.status(401).json({ success: false, message: "Invalid credentials" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});