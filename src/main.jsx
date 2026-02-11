import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import StackedImagesSection from './components/StackedImagesSection';

// Shared Project Navigation Button Component
const ProjectNavButton = ({ href, isNext = false }) => (
  <a
    href={href}
    style={{
      margin: isNext ? '0 0 0 1rem' : '0 1rem 0 0',
      padding: '0.5rem 1rem',
      background: '#333',
      color: '#fff',
      textDecoration: 'none',
      borderRadius: '4px',
      transition: 'background-color 0.3s, transform 0.2s',
      display: 'inline-block',
      fontFamily: "'VT323', monospace",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.backgroundColor = '#555';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = '#333';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    {isNext ? 'Next Project' : 'Previous Project'}
  </a>
);

const pageColors = {
  '/': '#111',
  '/projects': '#1a2634',
  '/about': '#34261a',
  '/projects/project1': '#0f0',    // Green for Alldis Atlantic
  '/projects/project2': '#c00',    // Red for Pacha Studios
  '/projects/project3': '#fff',    // White for Egan Plant Services
  '/projects/project4': '#888',    // Gray for In Medias Res
  '/projects/project5': '#f08c00', // Orange for Rebs & Milo's super 8mm
};

const getPageColor = () => pageColors[window.location.pathname] || '#222';

// Add this utility function to create consistent form submit buttons
const FormSubmitButton = ({ formStatus }) => (
  <button
    type="submit"
    disabled={formStatus === 'sending'}
    style={{
      background: formStatus === 'success' ? '#2d7d46' : 
                 formStatus === 'error' ? '#d62828' : '#333',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      padding: '0.5rem',
      fontFamily: "'VT323', monospace",
      cursor: formStatus === 'sending' ? 'wait' : 'pointer',
      transition: 'background-color 0.3s'
    }}
  >
    {formStatus === 'idle' && 'Send Message'}
    {formStatus === 'sending' && 'Sending...'}
    {formStatus === 'success' && '✓ Message Sent!'}
    {formStatus === 'error' && 'Error! Try Again'}
  </button>
);

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
  '/project5.html',
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
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'sending', 'success', 'error'
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Check if honeypot field is filled (bot detection)
    if (formData.get('bot-field')) {
      // It's a bot! Silently fail
      e.target.reset();
      return;
    }
    
    try {
      setFormStatus('sending');
      const response = await fetch("https://formspree.io/f/mkgbwejg", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        // Reset form
        e.target.reset();
        setFormStatus('success');
        // Reset success message after 3 seconds
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      // Handle errors
      setFormStatus('error');
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      {/* Responsive grid styles */}
      <style>
        {`          @media (max-width: 1033px) {
            .project-grid-container {
              padding: 0 1rem !important;
              max-width: 100vw !important;
            }
            .project-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              grid-template-rows: auto !important;
            }
          }
          @media (max-width: 768px) {
            .project-grid {
              grid-template-columns: 1fr !important;
              grid-template-rows: auto !important;
            }
          }
          @media (max-width: 500px) {
            .project-grid-container {
              padding: 0 !important;
              max-width: 100vw !important;
            }
          }
          /* Footer styles removed */
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
          onSubmit={handleSubmit}
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
          {/* Honeypot field to catch bots */}
          <div style={{ opacity: 0, position: 'absolute', top: 0, left: 0, height: 0, width: 0, zIndex: -1 }}>
            <label htmlFor="bot-field">Don't fill this out if you're human:</label>
            <input name="bot-field" id="bot-field" />
          </div>
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
          <FormSubmitButton formStatus={formStatus} />
        </form>
      )}
    </nav>
  </div>
</header>

      {/* Main is now empty and ready for new content */}
      <main
  style={{
    padding: '4rem',
    backgroundColor: '#000',
    color: '#fff',
    minHeight: '100vh',
    paddingBottom: window.location.pathname === '/about' ? '2rem' : '6rem' // Reduce bottom padding on About page
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
      }}>      <div        className="project-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'auto auto auto',
          gap: '2rem',
          width: '100%'
        }}
      >        {[1, 2, 3, 4, 5].map((num) => (
          <div
            key={num}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%',
            }}
          >            <a              href={
                num === 5 
                  ? "/project5.html" 
                  : `/projects/project${num}`
              } 
              className="frost-link" 
              style={{ width: '100%' }}
            >
              <img                src={
                  num === 1
                    ? "/alldis-atlantic/heronowording_Hero.webp"
                    : num === 2
                    ? "/pacha/logoworld-04-03.webp"
                    : num === 3
                    ? "/Egan/devices_devices.webp"
                    : num === 4
                    ? "/inmediasres/70b18d0a-420e-4e03-93eb-0f6b2f043d8a.png"
                    : num === 5
                    ? "/rebs-milo/Hero image-01.webp"
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
              ) : num === 4 ? (
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
              ) : num === 5 ? (
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
      Film
    </span>
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
      Super 8mm
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
      Editing
    </span>
                </>              ) : (
                <></>
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
  >    <img
      src="/about/1_1st.webp"
      alt="About Hero"
      loading="lazy"
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
        textAlign: 'center',
        maxWidth: 900,
        margin: '2rem auto 0 auto',
        padding: '0 0.5rem',
      }}
    >
      <ProjectNavButton href={getProjectNavLinks('/projects/project1').prev} />
      <ProjectNavButton href={getProjectNavLinks('/projects/project1').next} isNext />
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
        { src: "/pacha/project images/1_1.webp", alt: "Pacha Project Image 1" },
        { src: "/pacha/project images/2_2.webp", alt: "Pacha Project Image 2" },
        { src: "/pacha/project images/3_3.webp", alt: "Pacha Project Image 3" },
        { src: "/pacha/project images/4_4.webp", alt: "Pacha Project Image 4" },
        { src: "/pacha/project images/5_5.webp", alt: "Pacha Project Image 5" },
        { src: "/pacha/project images/6_6.webp", alt: "Pacha Project Image 6" },
        { src: "/pacha/project images/7_7.webp", alt: "Pacha Project Image 7" },
        { src: "/pacha/project images/8_8.webp", alt: "Pacha Project Image 8" },
        { src: "/pacha/project images/9_9.webp", alt: "Pacha Project Image 9" },
        { src: "/pacha/project images/10_10.webp", alt: "Pacha Project Image 10" },
        { src: "/pacha/project images/11_11.webp", alt: "Pacha Project Image 11" },
        { src: "/pacha/project images/12_12.webp", alt: "Pacha Project Image 12" },
        { src: "/pacha/project images/13_13.webp", alt: "Pacha Project Image 13" },
        { src: "/pacha/project images/14_14.webp", alt: "Pacha Project Image 14" },
        { src: "/pacha/project images/15_15.webp", alt: "Pacha Project Image 15" },
        { src: "/pacha/project images/16_16.webp", alt: "Pacha Project Image 16" },
        { src: "/pacha/project images/17_17.webp", alt: "Pacha Project Image 17" },
      ].map(img => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            marginBottom: 0,
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
        textAlign: 'center',
        maxWidth: 900,
        margin: '2rem auto 0 auto',
        padding: '0 0.5rem',
      }}
    >
      <ProjectNavButton href={getProjectNavLinks('/projects/project2').prev} />
      <ProjectNavButton href={getProjectNavLinks('/projects/project2').next} isNext />
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
        textAlign: 'center',
        maxWidth: 900,
        margin: '2rem auto 0 auto',
        padding: '0 0.5rem',
      }}
    >
      <ProjectNavButton href={getProjectNavLinks('/projects/project3').prev} />
      <ProjectNavButton href={getProjectNavLinks('/projects/project3').next} isNext />
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
        {showContact && (          <form
            onSubmit={handleSubmit}
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
            {/* Honeypot field to catch bots */}
            <div style={{ opacity: 0, position: 'absolute', top: 0, left: 0, height: 0, width: 0, zIndex: -1 }}>
              <label htmlFor="bot-field-2">Don't fill this out if you're human:</label>
              <input name="bot-field" id="bot-field-2" />
            </div>
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
            <FormSubmitButton formStatus={formStatus} />
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
      </section>  {/* Project 5 - Rebs & Milo's super 8mm - SIMPLIFIED */}
  {window.location.pathname === '/projects/project5' && (
    <div style={{ 
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f08c00',
      color: 'black', 
      borderRadius: '10px',
      margin: '20px auto',
      maxWidth: '800px'
    }}>
      <h1>Project 5: Rebs & Milo Super 8mm</h1>
      <p>This is a TEST notification. If you can see this, the project5 route is working!</p>
      
      <div style={{ margin: '20px 0' }}>
        <video
          controls
          width="100%"
          height="auto"
          poster="/rebs-milo/Hero image-01.webp"
        >
          <source src="/rebs-milo/project-images/Rebs-Milo Compressed 50.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div      style={{ 
        textAlign: 'center', 
        maxWidth: '400px', 
        margin: '2rem auto' 
      }}>
        <a href="/projects/project4" style={{ 
          marginRight: '1rem',
          padding: '0.5rem 1rem',
          background: '#333',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '4px',
          transition: 'background-color 0.3s, transform 0.2s',
          display: 'inline-block',
          fontFamily: "'VT323', monospace",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#555';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#333';
          e.currentTarget.style.transform = 'translateY(0)';
        }}>
          Previous Project
        </a>
        <a href="/projects/project1" style={{ 
          marginLeft: '1rem',
          padding: '0.5rem 1rem',
          background: '#333',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '4px',
          transition: 'background-color 0.3s, transform 0.2s',
          display: 'inline-block',
          fontFamily: "'VT323', monospace",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#555';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#333';
          e.currentTarget.style.transform = 'translateY(0)';
        }}>
          Next Project
        </a>
      </div>
    </div>
  )}
  {/* Project navigation links for all project pages */}
  {projectRoutes.includes(window.location.pathname) && (() => {
    const { prev, next } = getProjectNavLinks(window.location.pathname);
    // Log navigation state for debugging
    console.log(`Current project page: ${window.location.pathname}`);
    console.log(`Navigation: prev=${prev}, next=${next}`);
    
    return (
      <div
        style={{
          textAlign: 'center',
          maxWidth: 900,
          margin: '2rem auto 0 auto',
          padding: '0 0.5rem',
        }}
      >
        <ProjectNavButton href={prev} />
        <ProjectNavButton href={next} isNext />
      </div>
    );
  })()}

    </>
  )}
</main>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
