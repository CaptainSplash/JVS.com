import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';

const pageColors = {
  '/': '#111',
  '/projects': '#1a2634',
  '/about': '#34261a',
  '/projects/project1': '#0f0',    // Green for Alldis Atlantic
  '/projects/project2': '#c00',    // Red for Pacha Studios
  '/projects/project3': '#fff',    // White for Egan Plant Services
  '/projects/project4': '#888',    // Gray for In Medias Res
};

const getPageColor = () => pageColors[window.location.pathname] || '#222';

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1.25rem',
  fontFamily: '"VT323", monospace'
};

const App = () => {
  const [showContact, setShowContact] = useState(false);
  const contactRef = useRef(null);

  const handleContactClick = (e) => {
    e.preventDefault();
    setShowContact((prev) => !prev);
    setTimeout(() => {
      if (contactRef.current) contactRef.current.querySelector('input')?.focus();
    }, 0);
  };

  return (
    <>
      {/* Responsive grid styles */}
      <style>
        {`
          @media (max-width: 900px) {
            .project-grid {
              grid-template-columns: 1fr !important;
              grid-template-rows: none !important;
            }
          }
        `}
      </style>
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
    <nav style={{ display: 'flex', gap: '2rem', position: 'relative' }}>
      <a href="/#projects" style={linkStyle}>Projects</a>
      <a href="/about" style={linkStyle}>About</a>
      <a
        href="#"
        style={linkStyle}
        onClick={handleContactClick}
      >
        Contact
      </a>
      {showContact && (
        <form
          action="https://formspree.io/f/mkgbwejg"
          method="POST"
          ref={contactRef}
          style={{
            position: 'absolute',
            top: '2.5rem',
            right: 0,
            background: '#181818',
            border: '1px solid #888',
            borderRadius: '8px',
            padding: '1rem',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            minWidth: '250px'
          }}
        >
          <input
            name="email"
            type="email"
            placeholder="Your email"
            required
            style={{
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #333',
              fontFamily: '"VT323", monospace'
            }}
          />
          <textarea
            name="message"
            placeholder="Your message"
            required
            rows={3}
            style={{
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #333',
              fontFamily: '"VT323", monospace',
              resize: 'vertical'
            }}
          />
          <button
            type="submit"
            style={{
              background: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '0.5rem',
              fontFamily: '"VT323", monospace',
              cursor: 'pointer'
            }}
          >
            Send
          </button>
        </form>
      )}
    </nav>
  </div>
</header>

      {/* Main is now empty and ready for new content */}
      <main
        style={{
          padding: '4rem',
          backgroundColor: getPageColor(),
          minHeight: '100vh',
          paddingBottom: '6rem'
        }}
      >
        <h1>
          {window.location.pathname === '/projects' && 'Projects'}
          {window.location.pathname === '/about' && 'About'}
          {window.location.pathname !== '/' && window.location.pathname !== '/projects' && window.location.pathname !== '/about' && 'Other'}
        </h1>

        {/* Show the grid ONLY on the homepage */}
        {window.location.pathname === '/' && (
          <section
            id="projects"
            style={{
              maxWidth: '1440px',
              margin: '3rem auto 0 auto',
              padding: '0 2.5rem',
            }}>
            <div
              className="project-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr 1fr',
                gap: '2rem',
              }}
            >
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start', // <-- changed from 'center' to 'flex-start'
                    width: '100%'
                  }}
                >
                  <a href={`/projects/project${num}`} style={{ width: '100%' }}>
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
                        objectFit: 'cover',
                        background: '#222'
                      }}
                    />
                  </a>
                  <div
                    style={{
                      marginTop: '0.5rem',
                      display: 'flex',
                      gap: '0.5rem',
                      flexWrap: 'wrap'
                    }}
                  >
                    <span style={{
  fontSize: '1.1rem',
  padding: '2px 8px',
  border: '1px solid #FFCD00', // <-- changed color here
  borderRadius: '10px',
  background: '#181818',
  color: '#ccc',
  marginRight: '0.25rem',
  fontFamily: 'VT323'
}}>
  Tag 1
</span>
<span style={{
  fontSize: '1.1rem',
  padding: '2px 8px',
  border: '1px solid #FFCD00', // <-- changed color here
  borderRadius: '10px',
  background: '#181818',
  color: '#ccc',
  fontFamily: 'VT323'
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
      <footer
  style={{
    width: '100%',
    background: '#222',         // Grayish color
    color: '#fff',
    fontFamily: 'VT323',
    fontSize: '2rem',
    padding: '10rem 0',         // Much taller: increased vertical padding
    textAlign: 'center',
    zIndex: 100,
    boxShadow: '0 -2px 10px rgba(0,0,0,0.5)'
  }}
>
  &copy; {new Date().getFullYear()} JVS.com &mdash; All rights reserved.
</footer>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);