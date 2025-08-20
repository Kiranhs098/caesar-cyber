import React, { useState } from "react";
import { motion } from "framer-motion";
import Particles from "react-particles";
import "./App.css";

// Caesar Cipher logic
function caesarCipher(text, shift, encrypt = true) {
  if (!encrypt) shift = (26 - shift) % 26;
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
  });
}

export default function App() {
  const [input, setInput] = useState("");
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState("");
  const [info, setInfo] = useState(false);

  // Download result handler
  const handleDownload = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cipher-result.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      {/* Particles Background */}
      <Particles
        options={{
          background: { color: { value: "#121212" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" }
            }
          },
          particles: {
            color: { value: "#39FF14" },
            links: { color: "#00ffff", distance: 150, enable: true, opacity: 0.4, width: 2 },
            move: { enable: true, speed: 2 },
            number: { value: 60 },
            opacity: { value: 0.4 },
            shape: { type: "circle" },
            size: { value: 3 }
          }
        }}
        style={{ position: "absolute" }}
      />

      <motion.main
        className="cyber-main"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.h1 className="neon-text" initial={{ scale: 1.1 }} animate={{ scale: 1 }}>
          Caesar Cipher Cyber Demo
        </motion.h1>
        <motion.p className="desc">
          Enter message, pick shift, encrypt or decrypt. Hacker vibes included!
        </motion.p>
        {/* Input Area */}
        <motion.div className="cyber-box" whileHover={{ scale: 1.02 }}>
          <input
            className="input-neon"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your secret message"
          />
          <div className="shift-row">
            <input
              className="slider"
              type="range"
              min="1"
              max="25"
              value={shift}
              onChange={e => setShift(Number(e.target.value))}
            />
            <span className="shift-val">SHIFT: {shift}</span>
          </div>
        </motion.div>
        <div className="btn-row">
          <motion.button className="cyber-btn" whileHover={{ scale: 1.1 }}
            onClick={() => setResult(caesarCipher(input, shift, true))}
          >Encrypt</motion.button>
          <motion.button className="cyber-btn blue" whileHover={{ scale: 1.1 }}
            onClick={() => setResult(caesarCipher(input, shift, false))}
          >Decrypt</motion.button>
        </div>
        {/* Animated Result */}
        <motion.div
          className="result-box"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: result !== "" ? 1 : 0, y: 0 }}
        >
          <span>{result}</span>
        </motion.div>
        <div className="actions">
          <button className="download-btn" onClick={handleDownload}>Download Result</button>
          <button className="info-btn" onClick={() => setInfo(p => !p)}>
            What is Caesar Cipher?
          </button>
        </div>
        {info &&
          <motion.div
            className="info-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <strong>About Caesar Cipher:</strong>
            <p>
              The Caesar Cipher is one of the simplest encryption techniques. Each letter is shifted by a fixed number—so with a shift of 3, A becomes D, B becomes E, and so on. It was famously used in ancient Rome, but today, it's a classic example in beginner cryptography.
            </p>
          </motion.div>
        }
      </motion.main>
    </div>
  );
}
