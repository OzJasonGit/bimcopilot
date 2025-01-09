import React from 'react';

const SkeletonLoader2 = () => {
  return (
    <>
      <div style={{ padding: "20px" }}>
        {/* Shimmer Effect for the First Skeleton */}
        <div
          style={{
            backgroundColor: "#e0e0e0",
            height: "80px",
            marginBottom: "20px",
            borderRadius: "8px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, rgba(255,255,255,0) 25%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 75%)",
              animation: "shimmer 2s infinite",
            }}
          ></div>
        </div>

        {/* Shimmer Effect for the Second Skeleton */}
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <div
            style={{
              backgroundColor: "#e0e0e0",
              height: "600px",
              width: "20%",
              borderRadius: "8px",
              marginRight: "20px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "-100%",
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, rgba(255,255,255,0) 25%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 75%)",
                animation: "shimmer 2s infinite",
              }}
            ></div>
          </div>

          <div
            style={{
              backgroundColor: "#e0e0e0",
              height: "600px",
              width: "75%",
              borderRadius: "8px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "-100%",
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, rgba(255,255,255,0) 25%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 75%)",
                animation: "shimmer 2s infinite",
              }}
            ></div>
          </div>
        </div>

        {/* Shimmer Effect for the Third Skeleton */}
        <div
          style={{
            backgroundColor: "#e0e0e0",
            height: "100px",
            borderRadius: "8px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, rgba(255,255,255,0) 25%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 75%)",
              animation: "shimmer 2s infinite",
            }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            left: -100%;
          }
          50% {
            left: 100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default SkeletonLoader2;
