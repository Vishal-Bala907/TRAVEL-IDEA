import React from "react";

// Import your image
// import notFoundImage from "/img/general/not-found.png"; // Update the path based on where your image is

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Page Not Found</h1>
      <img
        src="/img/general/not-found.png"
        alt="Page Not Found"
        style={styles.image}
      />
      <p style={styles.message}>
        Sorry, the content you are looking for does not exist.
      </p>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "white",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: "36px",
    color: "#333",
    marginBottom: "20px",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    marginBottom: "20px",
  },
  message: {
    fontSize: "18px",
    color: "#555",
  },
};

export default NotFoundPage;
