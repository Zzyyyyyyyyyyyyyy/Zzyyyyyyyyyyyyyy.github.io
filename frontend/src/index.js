import React from 'react';
import ReactDOM from 'react-dom';
import 'magic-ui/dist/magic-ui.css';
import { Button } from 'magic-ui';

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

ReactDOM.render(<App />, document.getElementById('root')); 