const ParallaxBG = ({ url, children = "TweetBuddy" }) => {
  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: "url( " + url + " )",
        backgroundAttachment: "fixed",
        padding: "65px 0px 60px 0px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        display: "block",
      }}
    >
      <h1
        style={{ color: "white" }}
        className="display-1 font-weight-bold text-center"
      >
        {children}
      </h1>
    </div>
  );
};

export default ParallaxBG;
