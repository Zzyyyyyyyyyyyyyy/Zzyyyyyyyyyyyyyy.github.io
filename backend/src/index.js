const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const works = [
  {
    id: 'interactive-1',
    category: 'interactive',
    title: 'Physical Computing Project',
    image: 'project/Physical Computing&Prototyping/project1/1.JPG',
    tags: ['Arduino', 'Electronics'],
    link: 'project/Physical Computing&Prototyping/project1/project-page.html',
  },
  {
    id: 'media-1',
    category: 'media',
    title: 'Rube Goldberg Machine',
    video:
      'project/Media&Motion Design/Rube Goldberg Machine/Final_Rube Goldberg Machine_2.mp4',
    tags: ['Motion Design', 'Physical Design'],
    link: 'project/Media&Motion Design/Rube Goldberg Machine/index.html',
  },
];

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.get('/api/works', (req, res) => {
  res.json(works);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
