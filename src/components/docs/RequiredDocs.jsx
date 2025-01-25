"use client";
import React, { useEffect, useState } from "react";
import { getDocumentList } from "../server/basic/basic";
import { motion } from "framer-motion";

const RequiredDocs = ({ name }) => {
  const [documentList, setDocumentList] = useState([]);
  useEffect(() => {
    getDocumentList(name)
      .then((data) => {
        setDocumentList(data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  return (
    <div style={styles.container}>
      <div className="flex justify-center gap-4">
        <img
          src="/img/general/online-survey.png"
          className="h-[32px]"
          alt="docs"
        />
        <h2 style={styles.title}>Required Documents</h2>
      </div>
      <div style={styles.grid}>
        {documentList.map((doc, index) => (
          <motion.div
            key={index}
            className="doc-card"
            style={styles.card}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <p style={styles.cardText}>{doc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    border: "1px solid black",
  },
  cardText: {
    fontSize: "16px",
    color: "#555",
    margin: "0",
  },
};

export default RequiredDocs;
