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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const contactRef = useRef(null);

  // Add event listener for window resize
  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
            .project-grid-container {
              padding: 0 1rem !important;
              max-width: 100vw !important;
            }
            .project-grid {
              grid-template-columns: 1fr !important;
              grid-template-rows: none !important;
            }
          }
          @media (max-width: 500px) {
            .project-grid-container {
              padding: 0 !important;
              max-width: 100vw !important;
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
    flexDirection: windowWidth <= 529 ? 'column' : 'row',
    justifyContent: windowWidth <= 529 ? 'center' : 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    textAlign: windowWidth <= 529 ? 'center' : 'left'
}}>
    {/* Logo Only */}
    <div style={{
      marginBottom: windowWidth <= 529 ? '1rem' : '0',
      display: 'flex',
      justifyContent: windowWidth <= 529 ? 'center' : 'flex-start',
      width: windowWidth <= 529 ? '100%' : 'auto'
    }}>
      <a href="/">
        <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
      </a>
    </div>
    {/* Navigation */}
    <nav style={{ 
      display: 'flex', 
      gap: '2rem', 
      position: 'relative',
      justifyContent: windowWidth <= 529 ? 'center' : 'flex-start',
      width: windowWidth <= 529 ? '100%' : 'auto'
    }}>
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
            className="project-grid-container"
            style={{
              maxWidth: '1440px',
              margin: '3rem auto 0 auto',
              padding: '0 2.5rem',
              boxSizing: 'border-box'
            }}>
            <div
              className="project-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr 1fr',
                gap: '2rem',
                width: '100%' // Ensures grid fills the container
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
    background: '#222',
    color: '#fff',
    fontFamily: 'VT323',
    fontSize: '1.25rem', // Match header font size
    padding: '4rem 0',   // Reduced from '10rem 0' to '4rem 0'
    textAlign: 'center',
    zIndex: 100,
    boxShadow: '0 -2px 10px rgba(0,0,0,0.5)'
  }}
>
  <div
    style={{
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '1.5rem 2.5rem',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: windowWidth <= 900 ? 'column' : 'row', // Collapse to column at 900px or below
      alignItems: windowWidth <= 900 ? 'center' : 'flex-start',
      justifyContent: windowWidth <= 900 ? 'center' : 'space-between',
      gap: windowWidth <= 900 ? '1.5rem' : '2rem'
    }}
  >
    {/* Left: Short line of wording with grid only around "V.1.0." */}
<div
  style={{
    flex: windowWidth <= 529 ? '0 0 100%' : 2,
    textAlign: windowWidth <= 529 ? 'center' : 'left',
    width: windowWidth <= 529 ? '100%' : 'auto',
    display: 'inline-block',
    marginBottom: windowWidth <= 529 ? '1rem' : 0,
    fontFamily: 'VT323',
    color: '#ccc'
  }}
>
  <span
    style={{
      border: '1px solid #FFCD00',
      borderRadius: '10px',
      background: '#181818',
      padding: '2px 8px',
      marginRight: '0.5rem'
    }}
  >
    V.1.0.
  </span>
  Last updated 03/06/2025
</div>

    {/* Center: Social links stacked */}
    <div style={{ 
      flex: windowWidth <= 900 ? '0 0 100%' : 1, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: windowWidth <= 900 ? 'center' : 'flex-start',
      gap: '0.25rem',
      width: windowWidth <= 900 ? 'fit-content' : 'auto',
      marginLeft: windowWidth <= 900 ? 'auto' : '20rem',
      marginRight: windowWidth <= 900 ? 'auto' : 0
    }}>
      <style>
        {`
          .footer-link {
            border-bottom: 2px dotted #fff;
            transition: border-bottom 0.2s, color 0.2s;
          }
          .footer-link:hover, .footer-link:focus {
            border-bottom: 2px solid #fff;
            color: #FFCD00;
          }
        `}
      </style>
      <span style={{ display: 'inline-block', position: 'relative', paddingBottom: '0.05em' }}>
        <a
          href="https://www.linkedin.com/in/johnshields123/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
          style={{
            display: 'inline-block',
            paddingBottom: '0.05em',
            color: 'inherit',
            textDecoration: 'none'
          }}
        >
          LinkedIn
        </a>
        <sup style={{
          color: '#FFCD00',
          fontSize: '0.85em',
          marginLeft: '0.25em',
          fontFamily: 'inherit',
          position: 'relative',
          top: '-0.2em'
        }}>1</sup>
      </span>
      <span style={{ display: 'inline-block', position: 'relative', paddingBottom: '0.05em' }}>
        <a
          href="https://www.behance.net/johnshields5"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
          style={{
            display: 'inline-block',
            paddingBottom: '0.05em',
            color: 'inherit',
            textDecoration: 'none'
          }}
        >
          Behance
        </a>
        <sup style={{
          color: '#FFCD00',
          fontSize: '0.85em',
          marginLeft: '0.25em',
          fontFamily: 'inherit',
          position: 'relative',
          top: '-0.2em'
        }}>2</sup>
      </span>
      <span style={{ display: 'inline-block', position: 'relative', paddingBottom: '0.05em' }}>
        <a
          href="https://www.instagram.com/johnvinshields/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
          style={{
            display: 'inline-block',
            paddingBottom: '0.05em',
            color: 'inherit',
            textDecoration: 'none'
          }}
        >
          Instagram
        </a>
        <sup style={{
          color: '#FFCD00',
          fontSize: '0.85em',
          marginLeft: '0.25em',
          fontFamily: 'inherit',
          position: 'relative',
          top: '-0.2em'
        }}>4</sup>
      </span>
      <span style={{ display: 'inline-block', position: 'relative', paddingBottom: '0.05em' }}>
        <span
          className="footer-link"
          style={{
            display: 'inline-block',
            paddingBottom: '0.05em'
          }}
        >
          PDF
        </span>
        <sup style={{
          color: '#FFCD00',
          fontSize: '0.85em',
          marginLeft: '0.25em',
          fontFamily: 'inherit',
          position: 'relative',
          top: '-0.2em'
        }}>5</sup>
      </span>
    </div>

    {/* Right: Temporary wording with border, always on one line */}
    <div style={{ 
      flex: windowWidth <= 529 ? '0 0 100%' : 1, 
      textAlign: windowWidth <= 529 ? 'center' : 'right',
      width: windowWidth <= 529 ? '100%' : 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: windowWidth <= 529 ? 'center' : 'flex-end'
    }}>
      <span
        style={{
          border: '1px solid #FFCD00',
          borderRadius: '10px',
          background: '#181818',
          padding: '2px 8px',
          color: '#fff',
          fontFamily: 'VT323',
          whiteSpace: 'nowrap',
          display: 'inline-block',
          position: 'relative',
          marginRight: '0.5em'
        }}
      >
        Let's make something memorable
        <sup style={{
          color: '#FFCD00',
          fontSize: '0.85em',
          fontFamily: 'inherit',
          position: 'absolute',
          top: '-0.8em',
          right: '-0.8em' // Adjusted closer to the box
        }}>6</sup>
      </span>
    </div>
  </div>
</footer>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
