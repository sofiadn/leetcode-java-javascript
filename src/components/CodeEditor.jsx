export default function CodeEditor({ code, onChange, onSubmit, onReset, submitted, showSolution }) {
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const next = code.substring(0, start) + "    " + code.substring(end);
      onChange(next);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const submitLabel = showSolution ? "Solution unlocked ✓" : "Submit";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{
        padding: "8px 16px",
        borderBottom: "1px solid #1e1e1e",
        fontSize: 10,
        color: "#333",
        letterSpacing: 1.5,
        textTransform: "uppercase",
        background: "#080808",
      }}>
        Editor
      </div>

      <textarea
        value={code}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        style={{
          flex: 1,
          background: "#0a0a0a",
          border: "none",
          color: "#e0e0e0",
          padding: "18px 20px",
          fontSize: 13,
          fontFamily: "'JetBrains Mono','Fira Code',monospace",
          resize: "none",
          outline: "none",
          lineHeight: 1.8,
          tabSize: 4,
        }}
      />

      <div style={{
        padding: "10px 16px",
        borderTop: "1px solid #1e1e1e",
        display: "flex",
        gap: 8,
        background: "#080808",
        alignItems: "center",
      }}>
        <button
          onClick={onReset}
          style={{
            padding: "6px 14px",
            borderRadius: 6,
            border: "1px solid #1e1e1e",
            background: "#111",
            color: "#555",
            cursor: "pointer",
            fontSize: 11,
            fontFamily: "inherit",
          }}
        >Reset</button>

        <span style={{
          fontSize: 10,
          color: '#252525',
          fontFamily: "inherit",
          letterSpacing: 0.5,
        }}>
          i — reveal solution
        </span>

        <button
          onClick={onSubmit}
          disabled={showSolution}
          style={{
            padding: "6px 20px",
            borderRadius: 6,
            border: `1px solid ${showSolution ? "#162010" : "#2a4a2a"}`,
            background: showSolution ? "#0a140a" : "#111",
            color: showSolution ? "#3B6D11" : "#5a8a5a",
            cursor: showSolution ? "default" : "pointer",
            fontSize: 11,
            fontFamily: "inherit",
            marginLeft: "auto",
          }}
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}
