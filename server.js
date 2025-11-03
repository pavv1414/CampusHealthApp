const express = require("express");
const path = require("path");
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname)));

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "emergency.html"));
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
