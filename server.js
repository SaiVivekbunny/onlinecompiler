require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Corrected Judge0 API URL for RapidAPI
const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com";

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

        // ✅ Fixed API Headers (Include API Key)
        const headers = {
            "X-RapidAPI-Key": process.env.d4f7708ed0msh3d9086bf42eb6ddp1270a4jsnff0a6d0342aa, // Your RapidAPI Key
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
        console.error("Error executing code:", error);
        res.status(500).json({ error: "Code execution failed" });
    }
});

// 🌍 Start Server
app.listen(PORT, () => {
    console.log(`Server running on https://onlinecompiler-lktb.onrender.com`);
});
