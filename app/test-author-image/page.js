"use client";

import { getAuthorImage } from "@/app/helpers/authorImages";
import Image from "next/image";

export default function TestAuthorImage() {
  const testAuthors = ["Oz Jason", "oz", "jason", "Unknown Author"];
  
  return (
    <div style={{ padding: "20px", backgroundColor: "#171717", color: "white", minHeight: "100vh" }}>
      <h1>Author Image Test Page</h1>
      
      <div style={{ marginTop: "20px" }}>
        <h2>Testing Author Images:</h2>
        
        {testAuthors.map((author, index) => {
          const imageUrl = getAuthorImage(author);
          return (
            <div key={index} style={{ margin: "20px 0", padding: "20px", border: "1px solid #333" }}>
              <h3>Author: "{author}"</h3>
              <p>Image URL: {imageUrl}</p>
              
              <div style={{ 
                width: "110px", 
                height: "110px", 
                borderRadius: "50%", 
                overflow: "hidden", 
                backgroundColor: "#333",
                margin: "10px 0"
              }}>
                <Image
                  src={imageUrl}
                  alt={`${author} - Author`}
                  width={110}
                  height={110}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                  onLoad={() => console.log(`✅ Image loaded successfully for: ${author}`)}
                  onError={(e) => console.error(`❌ Image failed to load for: ${author}`, e)}
                />
              </div>
              
              <p>Status: {imageUrl ? "✅ URL Generated" : "❌ No URL"}</p>
            </div>
          );
        })}
      </div>
      
      <div style={{ marginTop: "40px" }}>
        <h2>Debug Information:</h2>
        <p>Check the browser console (F12) for detailed logs.</p>
        <button 
          onClick={() => {
            console.log("=== AUTHOR IMAGE DEBUG ===");
            testAuthors.forEach(author => {
              console.log(`Testing author: "${author}"`);
              const url = getAuthorImage(author);
              console.log(`Result: ${url}`);
            });
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
          Run Debug Test
        </button>
      </div>
    </div>
  );
} 