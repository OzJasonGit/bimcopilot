// Skeleton Loader Component
const SkeletonLoader = () => (
    // <div style={{ padding: "20px" }}>
    //   {[...Array(6)].map((_, index) => (
    //     <div
    //       key={index}
    //       style={{
    //         backgroundColor: "#e0e0e0",
    //         height: "150px",
    //         marginBottom: "20px",
    //         borderRadius: "8px",
    //       }}
    //     ></div>
    //   ))}
    // </div>
    <div style={{ padding: "20px" }}>
    <div style={{ backgroundColor: "#e0e0e0", height: "80px", marginBottom: "20px", borderRadius: "8px" }}></div>
    <div style={{ display: "flex", marginBottom: "20px" }}>
      <div style={{ backgroundColor: "#e0e0e0", height: "600px", width: "20%", borderRadius: "8px", marginRight: "20px" }}></div>
      <div style={{ backgroundColor: "#e0e0e0", height: "600px", width: "75%", borderRadius: "8px" }}></div>
    </div>
    <div style={{ backgroundColor: "#e0e0e0", height: "100px", borderRadius: "8px" }}></div>
  </div>
  );

  export default  SkeletonLoader;