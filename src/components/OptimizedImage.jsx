import React, { useState, useRef } from "react";

const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+",
  ...props 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef(null);

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = () => {
    setImageError(true);
  };

  return (
    <div className={`optimized-image-container ${className}`}>
      {!imageLoaded && !imageError && (
        <img
          src={placeholder}
          alt=""
          className="image-placeholder"
          style={{ filter: "blur(5px)" }}
        />
      )}
      
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`optimized-image ${imageLoaded ? "loaded" : ""}`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
      
      {imageError && (
        <div className="image-error">
          <div className="error-icon">📷</div>
          <div className="error-text">Ошибка загрузки изображения</div>
        </div>
      )}
      
      <style jsx>{`
        .optimized-image-container {
          position: relative;
          overflow: hidden;
          display: inline-block;
        }
        
        .image-placeholder,
        .optimized-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.3s ease;
        }
        
        .image-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }
        
        .optimized-image {
          opacity: 0;
          z-index: 2;
        }
        
        .optimized-image.loaded {
          opacity: 1;
        }
        
        .image-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background: #f8f9fa;
          color: #6c757d;
          font-size: 0.9rem;
          text-align: center;
          padding: 1rem;
        }
        
        .error-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default OptimizedImage;
