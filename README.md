# Design Website

This project is a design website built with React for the frontend and Node.js for the backend. It aims to provide a platform for showcasing design works and projects. 

## Video Embedding (GCS) Quick Start
- Add a placeholder in HTML: `<div class="video-slot" data-video-key="work-hero-01"></div>` or background: `<div class="video-bg" data-video-key="home-bg"></div>`.
- Define sources in `js/video-config.json` (see `AGENTS.md` for schema and GCS setup).
- The runtime `js/video-manager.js` injects `<video muted autoplay loop playsinline>` automatically.
- For setup details, CORS, and maintenance workflow, see `AGENTS.md`.

cd backend

npm install express 

node src/index.js 

npm install magic-ui 

import 'magic-ui/dist/magic-ui.css';

import { Button } from 'magic-ui';

import React, { useRef } from 'react';
import { AnimatedBeam } from './AnimatedBeam';

function MyComponent() {
  const containerRef = useRef(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);

  return (
    <div ref={containerRef} style={{ position: 'relative', height: '500px' }}>
      <div ref={fromRef} style={{ position: 'absolute', top: '50px', left: '50px' }}>Start</div>
      <div ref={toRef} style={{ position: 'absolute', top: '200px', left: '200px' }}>End</div>
      <AnimatedBeam containerRef={containerRef} fromRef={fromRef} toRef={toRef} />
    </div>
  );
}

npm install motion

npm start

npx create-react-app my-magic-ui-app
cd my-magic-ui-app

import React from 'react';
import ReactDOM from 'react-dom';
import 'magic-ui/dist/magic-ui.css';
import { Button } from 'magic-ui';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Magic UI Demo</h1>
      <Button>Click Me</Button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

cd frontend
npm install react-scripts
