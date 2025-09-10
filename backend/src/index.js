const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Return works data
app.get('/api/works', (req, res) => {
  const works = [
    {
      id: 'interactive-1',
      category: 'interactive',
      title: 'Physical Computing Project',
      image: 'project/Physical Computing&Prototyping/project1/1.JPG',
      tags: ['Arduino', 'Electronics'],
      link: 'project/Physical Computing&Prototyping/project1/project-page.html'
    },
    {
      id: 'media-1',
      category: 'media',
      title: 'Rube Goldberg Machine',
      video: 'project/Media&Motion Design/Rube Goldberg Machine/Final_Rube Goldberg Machine_2.mp4',
      tags: ['Motion Design', 'Physical Design'],
      link: 'project/Media&Motion Design/Rube Goldberg Machine/index.html'
    },
    {
      id: 'physical-1',
      category: 'physical',
      title: 'Project Title 1',
      icon: 'fas fa-cube',
      tags: ['Physical', 'Design'],
      link: '#'
    },
    {
      id: 'visual-1',
      category: 'visual',
      title: 'Project Title 1',
      icon: 'fas fa-paint-brush',
      tags: ['Visual', 'Art'],
      link: '#'
    }
  ];

  res.json(works);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
