const stylet: React.CSSProperties = {
    position: "absolute",
    top: "55%",
    left: "51%",
    transform: "translate(-50%, -50%)",
    width: 200,
    height:40,
    backgroundColor: "#fff",  // צבע רקע רגיל
    
  }
  
  const Home = () => {
    return (
      <>
   <div style={stylet}><h1>Home</h1></div>
          
       
      </>
    );
  };
  
  export default Home;
  