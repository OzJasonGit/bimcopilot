"use client";

import Image from 'next/image';

const AuthorImageTest = ({ authorName }) => {
  const imageUrl = 'https://res.cloudinary.com/dbj8h56jj/image/upload/v1753899322/Authors/Oz%20Jason/Oz_Jason_Trimmed_ftxf1x.png';
  
  return (
    <div style={{ 
      width: "110px", 
      height: "110px", 
      borderRadius: "50%", 
      overflow: "hidden",
      backgroundColor: "#333",
      position: "absolute",
      top: "0",
      left: "0",
      zIndex: "10"
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
        onLoad={() => console.log('✅ Test image loaded successfully')}
        onError={(e) => {
          console.error('❌ Test image failed to load:', e);
          e.target.style.display = 'none';
        }}
      />
    </div>
  );
};

export default AuthorImageTest; 