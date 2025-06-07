import React from 'react';

const StackedImagesSection = ({ images, maxWidth = '1200px', imageProps = {} }) => (
  <section
    style={{
      width: '100%',
      maxWidth,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      alignItems: 'center',
      padding: 0
    }}
  >
    {images.map((img, i) =>
      typeof img === 'string' ? (
        <img
          key={i}
          src={img}
          alt={`Section image ${i + 1}`}
          style={{
            width: '100%',
            maxWidth: '100%',
            height: 'auto',
            borderRadius: 0,
            boxShadow: 'none',
            display: 'block',
            ...imageProps
          }}
        />
      ) : (
        // If you want to pass a custom object for special images
        <img
          key={i}
          src={img.src}
          alt={img.alt || `Section image ${i + 1}`}
          style={{
            width: '100%',
            maxWidth: '100%',
            height: 'auto',
            borderRadius: 0,
            boxShadow: 'none',
            display: 'block',
            ...(img.style || {}),
            ...imageProps
          }}
        />
      )
    )}
  </section>
);

export default StackedImagesSection;