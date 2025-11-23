const express = require("express");
const path = require("path");
const app = express();

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Root route → serve index.html from /public
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`🚑 Campus EMS app running on port ${PORT}`);
});
