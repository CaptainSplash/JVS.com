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
          {window.location.pathname === '/projects' && 'Projects'}
          {window.location.pathname === '/about' && 'About'}
          {window.location.pathname !== '/' && window.location.pathname !== '/projects' && window.location.pathname !== '/about' && 'Other'}
        </h1>

        {/* Show the grid ONLY on the homepage */}
        {window.location.pathname === '/' && (
          <section style={{
            maxWidth: '1440px',
            margin: '3rem auto 0 auto',
            padding: '0 2.5rem',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr',
              gap: '2rem',
            }}>
              {[1, 2, 3, 4].map((num) => (
                <div key={num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <a href={`/projects/project${num}`}>
                    <img
                      src={
                        num === 1
                          ? "/alldis-atlantic/heronowording_Hero.webp"
                          : num === 2
                          ? "/pacha/logoworld-04-03.webp"
                          : num === 3
                          ? "/Egan/devices_devices.webp"
                          : num === 4
                          ? "/inmediasres/70b18d0a-420e-4e03-93eb-0f6b2f043d8a.png"
                          : ""
                      }
                      alt={`Project ${num}`}
                      style={{
                        width: '100%',
                        maxWidth: '700px',
                        aspectRatio: '16/9',
                        borderRadius: '6px',
                        border: '1px solid #333',
                        objectFit: 'cover',
                        background: '#222'
                      }}
                    />
                  </a>
                  <div style={{
                    marginTop: '0.5rem',
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      fontSize: '0.8rem',
                      padding: '2px 8px',
                      border: '1px solid #888',
                      borderRadius: '10px',
                      background: '#181818',
                      color: '#ccc',
                      marginRight: '0.25rem'
                    }}>
                      Tag 1
                    </span>
                    <span style={{
                      fontSize: '0.8rem',
                      padding: '2px 8px',
                      border: '1px solid #888',
                      borderRadius: '10px',
                      background: '#181818',
                      color: '#ccc'
                    }}>
                      Tag 2
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
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