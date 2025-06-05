import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import StackedImagesSection from './components/StackedImagesSection';

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

const projectImgStyle = {
  width: '100%',
  height: 'auto',
  maxWidth: '100%',
  borderRadius: '12px',
  boxShadow: '0 2px 12px #0007',
  background: '#222',
  display: 'block',
};

const projectRoutes = [
  '/projects/project1',
  '/projects/project2',
  '/projects/project3',
  '/projects/project4',
  // Add more here as you add projects
];

function getProjectNavLinks(currentPath) {
  const idx = projectRoutes.indexOf(currentPath);
  if (idx === -1) return { prev: null, next: null };
  const prevIdx = (idx - 1 + projectRoutes.length) % projectRoutes.length;
  const nextIdx = (idx + 1) % projectRoutes.length;
  return {
    prev: projectRoutes[prevIdx],
    next: projectRoutes[nextIdx],
  };
}

const App = () => {
  const [showContact, setShowContact] = useState(false);
  const [showContactFooter, setShowContactFooter] = useState(false);
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
          @media (max-width: 1033px) {
            .project-grid-container {
              padding: 0 1rem !important;
              max-width: 100vw !important;
            }
            .project-grid {
              grid-template-columns: 1fr !important;
              grid-template-rows: none !important;
            }
            .footer-flex {
              flex-direction: column !important;
              align-items: center !important;
              justify-content: center !important;
              gap: 1.5rem !important;
            }
          }
          @media (max-width: 500px) {
            .project-grid-container {
              padding: 0 !important;
              max-width: 100vw !important;
            }
          }
          .footer-link {
            border-bottom: 2px dotted #fff;
            transition: border-bottom 0.2s, color 0.2s;
          }
          .footer-link:hover, .footer-link:focus {
            border-bottom: 2px solid #fff;
            color: #FFCD00;
          }
          /* Frost effect for project images */
          .frost-link {
            display: block;
            width: 100%;
            border-radius: 6px;
            overflow: hidden;
          }
          .frost-link img {
            transition: filter 0.3s, opacity 0.3s;
            will-change: filter, opacity;
          }
          .frost-link:hover img,
          .frost-link:focus img {
            filter: blur(2px) brightness(0.8);
            opacity: 0.85;
            cursor: pointer;
          }
          /* Header nav link underline animation */
          .header-link {
            position: relative;
            color: white;
            text-decoration: none;
            font-size: 1.25rem;
            font-family: "VT323", monospace;
            padding-bottom: 2px;
          }
          .header-link::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -2px;
            width: 100%;
            height: 2px;
            background: #FFCD00;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.25s cubic-bezier(.4,0,.2,1);
          }
          .header-link:hover::after,
          .header-link:focus::after {
            transform: scaleX(1);
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
      <a href="/#projects" className="header-link" style={linkStyle}>Projects</a>
      <a href="/about" className="header-link" style={linkStyle}>About</a>
      <a
        href="#"
        className="header-link"
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
    backgroundColor: '#000', // Always black background
    color: '#fff',           // Always white text
    minHeight: '100vh',
    paddingBottom: '6rem'
  }}
>
  {/* Remove the About heading and 'Other' */}
  {window.location.pathname === '/projects' && <h1>Projects</h1>}

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
          width: '100%'
        }}
      >
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%',
            }}
          >
            <a href={`/projects/project${num}`} className="frost-link" style={{ width: '100%' }}>
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
                  background: '#222',
                  // Remove minHeight/maxHeight for all images
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
              {num === 1 ? (
                <>
                  <span style={{
      fontSize: '1.1rem',
      padding: '2px 8px',
      border: '1px solid #FFCD00',
      borderRadius: '10px',
      background: '#181818',
      color: '#ccc',
      marginRight: '0.25rem',
      fontFamily: 'VT323'
    }}>
      Branding
    </span>
    <span style={{
      fontSize: '1.1rem',
      padding: '2px 8px',
      border: '1px solid #FFCD00',
      borderRadius: '10px',
      background: '#181818',
      color: '#ccc',
      fontFamily: 'VT323'
    }}>
      Design
    </span>
                </>
              ) : num === 2 ? (
                <>
                  <span style={{
      fontSize: '1.1rem',
      padding: '2px 8px',
      border: '1px solid #FFCD00',
      borderRadius: '10px',
      background: '#181818',
      color: '#ccc',
      marginRight: '0.25rem',
      fontFamily: 'VT323'
    }}>
      Marketing Campaign
    </span>
    <span style={{
      fontSize: '1.1rem',
      padding: '2px 8px',
      border: '1px solid #FFCD00',
      borderRadius: '10px',
      background: '#181818',
      color: '#ccc',
      fontFamily: 'VT323'
    }}>
      Branding
    </span>
                </>
              ) : num === 3 ? (
                <>
                  <span style={{
      fontSize: '1.1rem',
      padding: '2px 8px',
      border: '1px solid #FFCD00',
      borderRadius: '10px',
      background: '#181818',
      color: '#ccc',
      marginRight: '0.25rem',
      fontFamily: 'VT323'
    }}>
      UX Design
    </span>
    <span style={{
      fontSize: '1.1rem',
      padding: '2px 8px',
      border: '1px solid #FFCD00',
      borderRadius: '10px',
      background: '#181818',
      color: '#ccc',
      fontFamily: 'VT323'
    }}>
      Web build
    </span>
                </>
              ) : (
                <>
                  <span style={{
      fontSize: '1.1rem',
      padding: '2px 8px',
      border: '1px solid #FFCD00',
      borderRadius: '10px',
      background: '#181818',
      color: '#ccc',
      marginRight: '0.25rem',
      fontFamily: 'VT323'
    }}>
      Storytelling
    </span>
    <span style={{
      fontSize: '1.1rem',
      padding: '2px 8px',
      border: '1px solid #FFCD00',
      borderRadius: '10px',
      background: '#181818',
      color: '#ccc',
      fontFamily: 'VT323'
    }}>
      Writing
    </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )}

  {/* Show stacked images on the About page */}
  {window.location.pathname === '/about' && (
    <section
    style={{
      width: '100vw',
      position: 'relative',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      background: '#000',
      padding: 0,
      overflow: 'hidden',
    }}
  >
    <img
      src="/about/1_1st.webp"
      alt="About Hero"
      style={{
        width: '100vw',
        maxWidth: '100vw',
        display: 'block',
        objectFit: 'cover',
        height: 'auto',
        margin: 0,
        borderRadius: 0,
      }}
    />
    <div style={{
      maxWidth: windowWidth < 900 ? '100%' : '1200px',
      margin: '0 auto',
    }}>
      <StackedImagesSection
        images={[
          '/about/2_intro wording.webp',
          '/about/3_UX design.webp',
          '/about/4_mockup real.webp',
          '/about/5_2nd explination.webp',
          '/about/6_colour.webp'
        ]}
        maxWidth={windowWidth < 900 ? '100%' : '1200px'}
      />
    </div>
  </section>
  )}

  {/* Project 1: Alldis Atlantic imagery */}
  {window.location.pathname === '/projects/project1' && (
    <section
      style={{
        maxWidth: 900,
        margin: '4rem auto 0 auto',
        padding: 0,
        background: 'none',
        border: 'none',
      }}
    >
      {/*
        { src, alt } pairs for each image
      */}
      { [
        { src: "/alldis-atlantic/project images/1_Hero.webp", alt: "Alldis Atlantic Hero" },
        { src: "/alldis-atlantic/project images/2_1st explination.webp", alt: "1st Explanation" },
        { src: "/alldis-atlantic/project images/3_billboard b&w.webp", alt: "Billboard Black and White" },
        { src: "/alldis-atlantic/project images/4_2nd explination.webp", alt: "2nd Explanation" },
        { src: "/alldis-atlantic/project images/5_grid systm.webp", alt: "Grid System" },
        { src: "/alldis-atlantic/project images/6_3rd.webp", alt: "3rd" },
        { src: "/alldis-atlantic/project images/7_moodboard.webp", alt: "Moodboard" },
        { src: "/alldis-atlantic/project images/8_4th.webp", alt: "4th" },
        { src: "/alldis-atlantic/project images/9_website.webp", alt: "Website" },
        { src: "/alldis-atlantic/project images/10_socials.webp", alt: "Socials" },
        { src: "/alldis-atlantic/project images/11_envelope and app.webp", alt: "Envelope and App" },
        { src: "/alldis-atlantic/project images/12_poster.webp", alt: "Poster" },
        { src: "/alldis-atlantic/project images/13_lanyard and paper.webp", alt: "Lanyard and Paper" },
        { src: "/alldis-atlantic/project images/14_tube.webp", alt: "Tube" },
      ].map(img => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            marginBottom: '4px', // Small gap between images
            borderRadius: 0,
            boxShadow: 'none',
            background: 'none',
          }}
        />
      )) }
    </section>
  )}

  {/* Project navigation links for Project 1 */}
  {window.location.pathname === '/projects/project1' && (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 900,
        margin: '3rem auto 0 auto',
        padding: '0 0.5rem',
      }}
    >
      <a
        href={getProjectNavLinks('/projects/project1').prev}
        style={{
          background: '#181818',
          color: '#FFCD00',
          border: '1px solid #FFCD00',
          borderRadius: 8,
          padding: '0.75rem 2rem',
          fontFamily: '"VT323", monospace',
          fontSize: '1.2rem',
          textDecoration: 'none',
          fontWeight: 700,
          transition: 'background 0.2s, color 0.2s',
        }}
      >
        ← Previous Project
      </a>
      <a
        href={getProjectNavLinks('/projects/project1').next}
        style={{
          background: '#181818',
          color: '#FFCD00',
          border: '1px solid #FFCD00',
          borderRadius: 8,
          padding: '0.75rem 2rem',
          fontFamily: '"VT323", monospace',
          fontSize: '1.2rem',
          textDecoration: 'none',
          fontWeight: 700,
          transition: 'background 0.2s, color 0.2s',
        }}
      >
        Next Project →
      </a>
    </div>
  )}

  {/* Project 2 imagery - Pacha Studios */}
  {window.location.pathname === '/projects/project2' && (
    <section
      style={{
        maxWidth: 900,
        margin: '4rem auto 0 auto',
        padding: 0,
        background: 'none',
        border: 'none',
      }}
    >
      { [
        { src: "/pacha/project images/1-01.webp", alt: "Pacha Project Image 1" },
        { src: "/pacha/project images/2-02.webp", alt: "Pacha Project Image 2" },
        { src: "/pacha/project images/3-03.webp", alt: "Pacha Project Image 3" },
        { src: "/pacha/project images/4-04.webp", alt: "Pacha Project Image 4" },
        { src: "/pacha/project images/5-05.webp", alt: "Pacha Project Image 5" },
        { src: "/pacha/project images/6-06.webp", alt: "Pacha Project Image 6" },
        { src: "/pacha/project images/7-07.webp", alt: "Pacha Project Image 7" },
        { src: "/pacha/project images/8-08.webp", alt: "Pacha Project Image 8" },
        { src: "/pacha/project images/9-09.webp", alt: "Pacha Project Image 9" },
        { src: "/pacha/project images/10-10.webp", alt: "Pacha Project Image 10" },
        { src: "/pacha/project images/11-11.webp", alt: "Pacha Project Image 11" },
        { src: "/pacha/project images/12-12.webp", alt: "Pacha Project Image 12" },
        { src: "/pacha/project images/13-13.webp", alt: "Pacha Project Image 13" },
        { src: "/pacha/project images/14-14.webp", alt: "Pacha Project Image 14" },
        { src: "/pacha/project images/15-15.webp", alt: "Pacha Project Image 15" },
        { src: "/pacha/project images/16-16.webp", alt: "Pacha Project Image 16" },
        { src: "/pacha/project images/17-17.webp", alt: "Pacha Project Image 17" },
      ].map(img => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            marginBottom: 0, // No gap between images
            borderRadius: 0,
            boxShadow: 'none',
            background: 'none',
          }}
        />
      )) }
    </section>
  )}

  {/* Project navigation links for Project 2 */}
  {window.location.pathname === '/projects/project2' && (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 900,
        margin: '3rem auto 0 auto',
        padding: '0 0.5rem',
      }}
    >
      <a
        href={getProjectNavLinks('/projects/project2').prev}
        style={{
          background: '#181818',
          color: '#FFCD00',
          border: '1px solid #FFCD00',
          borderRadius: 8,
          padding: '0.75rem 2rem',
          fontFamily: '"VT323", monospace',
          fontSize: '1.2rem',
          textDecoration: 'none',
          fontWeight: 700,
          transition: 'background 0.2s, color 0.2s',
        }}
      >
        ← Previous Project
      </a>
      <a
        href={getProjectNavLinks('/projects/project2').next}
        style={{
          background: '#181818',
          color: '#FFCD00',
          border: '1px solid #FFCD00',
          borderRadius: 8,
          padding: '0.75rem 2rem',
          fontFamily: '"VT323", monospace',
          fontSize: '1.2rem',
          textDecoration: 'none',
          fontWeight: 700,
          transition: 'background 0.2s, color 0.2s',
        }}
      >
        Next Project →
      </a>
    </div>
  )}

  {/* Project 3 imagery - Egan Plant Services */}
  {window.location.pathname === '/projects/project3' && (
    <section
      style={{
        maxWidth: 900,
        margin: '4rem auto 0 auto',
        padding: 0,
        background: 'none',
        border: 'none',
      }}
    >
      { [
        { src: "/Egan/project images/1_1st.webp", alt: "Egan Project Image 1" },
        { src: "/Egan/project images/2_intro wording.webp", alt: "Egan Project Image 2" },
        { src: "/Egan/project images/3_UX design_UX design.webp", alt: "Egan Project Image 3" },
        { src: "/Egan/project images/4_mockup real_mockup real.webp", alt: "Egan Project Image 4" },
        { src: "/Egan/project images/5_2nd explination.webp", alt: "Egan Project Image 5" },
        { src: "/Egan/project images/6_colour.webp", alt: "Egan Project Image 6" },
        { src: "/Egan/project images/7_socials_socials.webp", alt: "Egan Project Image 7" },
        { src: "/Egan/project images/8_devices_devices.webp", alt: "Egan Project Image 8" },
        { src: "/Egan/project images/9_final.webp", alt: "Egan Project Image 9" },
      ].map(img => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            marginBottom: 0, // No gap between images
            borderRadius: 0,
            boxShadow: 'none',
            background: 'none',
          }}
        />
      )) }
    </section>
  )}

  {/* Project navigation links for Project 3 */}
  {window.location.pathname === '/projects/project3' && (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 900,
        margin: '3rem auto 0 auto',
        padding: '0 0.5rem',
      }}
    >
      <a
        href={getProjectNavLinks('/projects/project3').prev}
        style={{
          background: '#181818',
          color: '#FFCD00',
          border: '1px solid #FFCD00',
          borderRadius: 8,
          padding: '0.75rem 2rem',
          fontFamily: '"VT323", monospace',
          fontSize: '1.2rem',
          textDecoration: 'none',
          fontWeight: 700,
          transition: 'background 0.2s, color 0.2s',
        }}
      >
        ← Previous Project
      </a>
      <a
        href={getProjectNavLinks('/projects/project3').next}
        style={{
          background: '#181818',
          color: '#FFCD00',
          border: '1px solid #FFCD00',
          borderRadius: 8,
          padding: '0.75rem 2rem',
          fontFamily: '"VT323", monospace',
          fontSize: '1.2rem',
          textDecoration: 'none',
          fontWeight: 700,
          transition: 'background 0.2s, color 0.2s',
        }}
      >
        Next Project →
      </a>
    </div>
  )}

  {/* Project 4 description section */}
  {window.location.pathname === '/projects/project4' && (
    <>
      <section
        style={{
          maxWidth: 700,
          margin: '4rem auto 2rem auto',
          textAlign: 'center',
          fontFamily: '"VT323", monospace',
          fontSize: '1.5rem',
          color: '#fff', // White text for dark background
          fontStyle: 'italic',
          letterSpacing: '0.01em'
        }}
      >
        In the age of clicks and fame, one young journalist lands the scoop of a lifetime—only to discover they were never in control of the story at all.
      </section>
      {/* Screenplay snippet as images */}
      <section
        style={{
          maxWidth: 900,
          margin: '2rem auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          alignItems: 'center',
          background: '#000', // Black background
          padding: '2rem 0',
          borderRadius: 12
        }}
      >
        {/*
          '/inmediasres/Snippet for website-1.webp',
          '/inmediasres/Snippet for website-2.webp',
          '/inmediasres/Snippet for website-3.webp',
          '/inmediasres/Snippet for website-4.webp',
          '/inmediasres/Snippet for website-5.webp',
          '/inmediasres/Snippet for website-6.webp',
          '/inmediasres/Snippet for website-7.webp',
          '/inmediasres/Snippet for website-8.webp'
        */}
        {Array.from({ length: 8 }, (_, i) => (
          <img
            key={i}
            src={`/inmediasres/Snippet for website-${i + 1}.webp`}
            alt={`Screenplay page ${i + 1}`}
            style={{
              width: '100%',
              maxWidth: '100%',
              display: 'block',
              borderRadius: 0,
              boxShadow: '0 4px 24px #000a',
              marginBottom: '1.5rem',
              background: '#111'
            }}
          />
        ))}
      </section>
      {/* CTA Section */}
      <section
        style={{
          maxWidth: 600,
          margin: '3rem auto 0 auto',
          background: 'linear-gradient(90deg, #23272f 60%, #181a1f 100%)',
          border: '2px solid #ffcd00',
          borderRadius: 16,
          padding: '2.5rem 2rem',
          color: '#fff',
          textAlign: 'center',
          boxShadow: '0 4px 32px #0003'
        }}
      >
        <div style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: '"VT323", monospace' }}>
          📝 Like what you see?
        </div>
        <p style={{ fontSize: '1.15rem', marginBottom: '2rem', color: '#ffe', fontFamily: '"VT323", monospace' }}>
          “In Medias Res” is part of a larger story — and I’d love to share more with collaborators, producers, or curious minds.
        </p>
        <button
          type="button"
          onClick={() => setShowContact(true)}
          style={{
            background: 'linear-gradient(90deg, #ffcd00 60%, #fffbe6 100%)',
            color: '#181a1f',
            border: 'none',
            borderRadius: '8px',
            padding: '0.9rem 2.5rem',
            fontSize: '1.15rem',
            fontWeight: 700,
            fontFamily: '"VT323", monospace',
            cursor: 'pointer',
            boxShadow: '0 2px 8px #0004',
            transition: 'background 0.2s'
          }}
        >
          Drop me a message
        </button>
        {showContact && (
          <form
            action="https://formspree.io/f/mkgbwejg"
            method="POST"
            ref={contactRef}
            style={{
              marginTop: '2rem',
              background: '#181818',
              border: '1px solid #888',
              borderRadius: '8px',
              padding: '1rem',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              minWidth: '250px',
              maxWidth: 400,
              marginLeft: 'auto',
              marginRight: 'auto'
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
      </section>

      {/* Storyboard Images Only, 2x2 grid, no box or title */}
      <section
        style={{
          maxWidth: 1400,
          margin: '4rem auto 0 auto',
          padding: 0,
          background: 'none',
          border: 'none',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2.5rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {Array.from({ length: 4 }, (_, i) => (
            <img
              key={i}
              src={`/inmediasres/Storyboards/${i + 1}.webp`}
              alt={`Storyboard ${i + 1}`}
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '100%',
                borderRadius: '12px',
                boxShadow: '0 2px 12px #0007',
                background: '#222',
                display: 'block',
              }}
            />
          ))}
        </div>
        {/* Fifth image full width below */}
        <div style={{ marginTop: '2.5rem' }}>
          <img
            src="/inmediasres/Storyboards/5.webp"
            alt="Storyboard 5"
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '100%',
              borderRadius: '12px',
              boxShadow: '0 2px 12px #0007',
              background: '#222',
              display: 'block',
            }}
          />
        </div>
      </section>

  {/* Project navigation links for all project pages */}
  {projectRoutes.includes(window.location.pathname) && (() => {
    const { prev, next } = getProjectNavLinks(window.location.pathname);
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 900,
          margin: '3rem auto 0 auto',
          padding: '0 0.5rem',
        }}
      >
        <a
          href={prev}
          style={{
            background: '#181818',
            color: '#FFCD00',
            border: '1px solid #FFCD00',
            borderRadius: 8,
            padding: '0.75rem 2rem',
            fontFamily: '"VT323", monospace',
            fontSize: '1.2rem',
            textDecoration: 'none',
            fontWeight: 700,
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          ← Previous Project
        </a>
        <a
          href={next}
          style={{
            background: '#181818',
            color: '#FFCD00',
            border: '1px solid #FFCD00',
            borderRadius: 8,
            padding: '0.75rem 2rem',
            fontFamily: '"VT323", monospace',
            fontSize: '1.2rem',
            textDecoration: 'none',
            fontWeight: 700,
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          Next Project →
        </a>
      </div>
    );
  })()}
    </>
  )}
</main>
<footer
  style={{
    width: '100%',
    background: '#222',
    color: '#fff',
    fontFamily: 'VT323',
    fontSize: '1.25rem',
    padding: '4rem 0',
    textAlign: 'center',
    zIndex: 100,
    boxShadow: '0 -2px 10px rgba(0,0,0,0.5)'
  }}
>
  <div
    className="footer-flex"
    style={{
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '1.5rem 2.5rem',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: windowWidth <= 1033 ? 'column' : 'row',
      alignItems: windowWidth <= 1033 ? 'center' : 'flex-start',
      justifyContent: windowWidth <= 1033 ? 'center' : 'space-between',
      gap: windowWidth <= 1033 ? '1.5rem' : '2rem'
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
      alignItems: windowWidth <= 1033 ? 'center' : 'flex-start', // changed from 900 to 1033
      gap: '0.25rem',
      width: windowWidth <= 900 ? 'fit-content' : 'auto',
      marginLeft: windowWidth <= 1033 ? 'auto' : '20rem', // changed from 900 to 1033
      marginRight: windowWidth <= 1033 ? 'auto' : 0      // changed from 900 to 1033
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
      justifyContent: windowWidth <= 529 ? 'center' : 'flex-end',
      position: 'relative'
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
          marginRight: '0.5em',
          cursor: 'pointer'
        }}
        onClick={() => setShowContactFooter((prev) => !prev)}
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setShowContactFooter((prev) => !prev); }}
        aria-label="Open contact form"
      >
        Let's make something memorable
        <sup style={{
          color: '#FFCD00',
          fontSize: '0.85em',
          fontFamily: 'inherit',
          position: 'absolute',
          top: '-0.8em',
          right: '-0.8em'
        }}>6</sup>
      </span>
      {showContactFooter && (
        <form
          action="https://formspree.io/f/mkgbwejg"
          method="POST"
          style={{
            position: 'absolute',
            bottom: '2.5rem',
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
          onClick={e => e.stopPropagation()}
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
