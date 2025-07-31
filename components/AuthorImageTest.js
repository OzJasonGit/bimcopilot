"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const AuthorImageTest = ({ authorName }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const testImageUrl = 'https://res.cloudinary.com/dbj8h56jj/image/upload/v1753899322/Authors/Oz%20Jason/Oz_Jason_Trimmed_ftxf1x.png';
    setImageUrl(testImageUrl);
    
    // Test if the image is accessible
    const img = new window.Image();
    img.onload = () => {
      console.log('✅ Image is accessible:', testImageUrl);
      setIsLoading(false);
      setHasError(false);
    };
    img.onerror = () => {
      console.error('❌ Image is not accessible:', testImageUrl);
      setIsLoading(false);
      setHasError(true);
    };
    img.src = testImageUrl;
  }, []);

  if (isLoading) {
    return (
      <div style={{ 
        width: "110px", 
        height: "110px", 
        borderRadius: "50%", 
        backgroundColor: "#333",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "12px"
      }}>
        Loading...
      </div>
    );
  }

  if (hasError) {
    return (
      <div style={{ 
        width: "110px", 
        height: "110px", 
        borderRadius: "50%", 
        backgroundColor: "#ff4444",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "12px",
        textAlign: "center"
      }}>
        Image Error
      </div>
    );
  }

  return (
    <div style={{ 
      width: "110px", 
      height: "110px", 
      borderRadius: "50%", 
      overflow: "hidden",
      backgroundColor: "#333"
    }}>
      <Image
        src={imageUrl}
        alt={`${authorName || 'Author'} - Test`}
        width={110}
        height={110}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
        onLoad={() => console.log('✅ Image loaded successfully in component')}
        onError={(e) => console.error('❌ Image failed to load in component:', e)}
      />
    </div>
  );
};

export default AuthorImageTest; 