import React from 'react';
import ReactDOM from 'react-dom/client';

// Import VT323 from Google Fonts
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=VT323&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

const App = () => {
  return (
    <>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 2rem',
        backgroundColor: '#000',
        borderBottom: '1px solid #333',
        color: 'white',
        fontFamily: '"VT323", monospace'
      }}>
        {/* Logo Only */}
        <div>
          <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <a href="#" style={linkStyle}>Projects</a>
          <a href="#" style={linkStyle}>About</a>
          <a href="#" style={linkStyle}>Contact</a>
        </nav>
      </header>

      {/* Main is now empty and ready for new content */}
      <main style={{
        padding: '4rem',
        backgroundColor: '#111',
        minHeight: '100vh'
      }}>
      </main>
    </>
  );
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1.25rem',
  fontFamily: '"VT323", monospace'
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);