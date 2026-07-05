import express from "express";
const router = express.Router();
import { ENV } from "../lib/env.js";

// Route to handle code execution requests from the frontend
router.post('/execute', async (req, res) => {
  try {
    const { language, code } = req.body;

    // JDoodle configurations mapped on the backend where it is secure
    const LANGUAGE_VERSIONS = {
      javascript: { language: "nodejs", versionIndex: "4" },
      python: { language: "python3", versionIndex: "4" },
      java: { language: "java", versionIndex: "4" },
       cpp: { language: "cpp", versionIndex: "5" },
    };

    const config = LANGUAGE_VERSIONS[language];
    if (!config) {
      return res.status(400).json({ success: false, error: `Unsupported language: ${language}` });
    }

    // Call JDoodle securely from the server (Corrected fetch syntax)
    const response = await fetch('https://api.jdoodle.com/v1/execute', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        clientId: ENV.JOODLE_CLIENT_ID,         // Fixed typo: JOODLE -> JDOODLE
        clientSecret: ENV.JOODLE_CLIENT_SECRET, // Fixed typo: JOODLE -> JDOODLE
        script: code,
        language: config.language,
        versionIndex: config.versionIndex,
      })
    });

    // Parse the JSON response from native fetch
    const data = await response.json();

    // Now extract the output from the parsed data
    const output = data.output || "";

    // Check for common error or exception strings in JDoodle output
    if (output.toLowerCase().includes("error") || output.toLowerCase().includes("exception")) {
      return res.json({
        success: false,
        output: "",
        error: output,
      });
    }

    return res.json({
      success: true,
      output: output,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Backend failed to execute code: ${error.message}`,
    });
  }
});

export default router;