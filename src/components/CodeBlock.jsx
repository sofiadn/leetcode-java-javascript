import { useState } from "react";
import { CODE_STYLE } from "../data/constants";

export default function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <pre style={CODE_STYLE}>{code}</pre>
      <button
        onClick={copy}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          padding: "3px 9px",
          borderRadius: 4,
          border: "1px solid #252540",
          background: "#0d0d1f",
          color: copied ? "#5DCAA5" : "#444",
          cursor: "pointer",
          fontSize: 10,
          fontFamily: "inherit",
          transition: "color 0.15s",
        }}
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}
