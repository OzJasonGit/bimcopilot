"use client";

export default function SimpleAuthorTest() {
  const imageUrl = 'https://res.cloudinary.com/dbj8h56jj/image/upload/v1753899322/Authors/Oz%20Jason/Oz_Jason_Trimmed_ftxf1x.png';
  
  return (
    <div style={{ padding: "20px", backgroundColor: "#171717", color: "white", minHeight: "100vh" }}>
      <h1>Simple Author Image Test</h1>
      <p>Testing with regular img tag (no Next.js Image optimization)</p>
      
      <div style={{ margin: "20px 0" }}>
        <h2>Regular img tag test:</h2>
        <div style={{ 
          width: "110px", 
          height: "110px", 
          borderRadius: "50%", 
          overflow: "hidden",
          backgroundColor: "#333",
          margin: "10px 0"
        }}>
          <img
            src={imageUrl}
            alt="Oz Jason - Author"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
            onLoad={() => console.log('✅ Regular img tag loaded successfully')}
            onError={(e) => {
              console.error('❌ Regular img tag failed to load:', e);
              e.target.style.display = 'none';
            }}
          />
        </div>
        
        <p>Image URL: {imageUrl}</p>
        <p>Check browser console for load/error messages</p>
      </div>
      
      <div style={{ margin: "20px 0" }}>
        <h2>Direct link test:</h2>
        <a href={imageUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#007bff" }}>
          Click here to open image directly
        </a>
      </div>
      
      <div style={{ margin: "20px 0" }}>
        <h2>Network test:</h2>
        <button 
          onClick={async () => {
            try {
              const response = await fetch(imageUrl, { method: 'HEAD' });
              console.log('Network test result:', response.status, response.statusText);
              alert(`Network test: ${response.status} ${response.statusText}`);
            } catch (error) {
              console.error('Network test failed:', error);
              alert(`Network test failed: ${error.message}`);
            }
          }}
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Test Network Access
        </button>
      </div>
    </div>
  );
} 