const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Basic health check route.
// For more details see docs/backend/README.md
app.get('/', (req, res) => {
  res.send('Backend is running');
});

if (require.main === module) {
  // Start the server only when this file is run directly.
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
