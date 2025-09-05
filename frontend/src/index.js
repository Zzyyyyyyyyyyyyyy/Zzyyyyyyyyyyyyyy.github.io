import React from 'react';
import { createRoot } from 'react-dom/client';
import 'magic-ui/dist/magic-ui.css';
import { Button } from 'magic-ui';

// See docs/frontend/README.md for development details

function App() {
  return (
    <div style={{ 
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center'
    }}>
      <h1>Magic UI Demo</h1>
      <Button style={{ marginTop: '20px', fontSize: '18px', padding: '10px 20px' }}>
        Click Me
      </Button>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
