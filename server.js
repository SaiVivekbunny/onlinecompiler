require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Use Environment Variable for API Key
const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com";
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY; // Secure API Key

app.use(cors());
app.use(express.json());

// ✅ Test Route
app.get("/", (req, res) => {
    res.send("Online Compiler Backend is Running!");
});

// 🚀 Run Code API
app.post("/run", async (req, res) => {
    try {
        const { code, language_id, input } = req.body;

        // ✅ Fixed API Headers (Use Environment Variable)
        const headers = {
            "X-RapidAPI-Key": JUDGE0_API_KEY,  // API Key from .env
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "Content-Type": "application/json"
        };

        const response = await axios.post(
            `${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
            {
                source_code: code,
                language_id,
                stdin: input
            },
            { headers }
        );

        res.json(response.data);
    } catch (error) {
        console.error("❌ Error executing code:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Code execution failed" });
    }
});

// 🌍 Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on: https://onlinecompiler-lktb.onrender.com`);
});
