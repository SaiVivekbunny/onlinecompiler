require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json()); // Parse JSON requests

// Test route
app.get("/", (req, res) => {
    res.send("Online Compiler Backend is Running!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.post("/run", async (req, res) => {
    try {
        const { code, language_id, input } = req.body;

        const response = await axios.post(
            `${process.env.JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
            {
                source_code: code,
                language_id,
                stdin: input
            },
            {
                headers: {
                    "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
                    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                    "Content-Type": "application/json"
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Error executing code:", error);
        res.status(500).json({ error: "Code execution failed" });
    }
});
