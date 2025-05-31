import React from 'react';
import ReactDOM from 'react-dom/client';

// Import VT323 from Google Fonts
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=VT323&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

const pageColors = {
  '/': '#111',
  '/projects': '#1a2634',
  '/about': '#34261a',
};

const getPageColor = () => {
  return pageColors[window.location.pathname] || '#222';
};

const App = () => {
  return (
    <>
      <header style={{
  backgroundColor: '#000',
  borderBottom: '1px solid #333',
  color: 'white',
  fontFamily: '"VT323", monospace',
  width: '100%'
}}>
  <div style={{
    maxWidth: '1440px',
    margin: '0 auto',
    padding: '1.5rem 2.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box'
}}>
    {/* Logo Only */}
    <div>
      <a href="/">
        <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
      </a>
    </div>
    {/* Navigation */}
    <nav style={{ display: 'flex', gap: '2rem' }}>
      <a href="/projects" style={linkStyle}>Projects</a>
      <a href="/about" style={linkStyle}>About</a>
      <a href="#" style={linkStyle}>Contact</a>
    </nav>
  </div>
</header>

      {/* Main is now empty and ready for new content */}
      <main style={{
        padding: '4rem',
        backgroundColor: getPageColor(),
        minHeight: '100vh'
      }}>
        <h1>
          {window.location.pathname === '/' && 'Home'}
          {window.location.pathname === '/projects' && 'Projects'}
          {window.location.pathname === '/about' && 'About'}
          {window.location.pathname !== '/' && window.location.pathname !== '/projects' && window.location.pathname !== '/about' && 'Other'}
        </h1>
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