const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  express.static(path.join(__dirname, '..', '..'), {
    setHeaders: (res) => {
      res.set('Cache-Control', 'public, max-age=31536000');
    },
  })
);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
