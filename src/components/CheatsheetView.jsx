import { useState } from "react";
import { CHEATSHEETS } from "../data/cheatsheets";
import { CATEGORY_COLORS } from "../data/constants";
import CodeBlock from "./CodeBlock";
import DiagramsView from "./DiagramsView";

const DIAGRAMS_ID = "diagrams";

export default function CheatsheetView() {
  const [active, setActive] = useState(CHEATSHEETS[0].id);
  const sheet = CHEATSHEETS.find(s => s.id === active);

  return (
    <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
      <nav style={{
        width: 200,
        borderRight: "1px solid #1e1e1e",
        overflowY: "auto",
        background: "#0f0f0f",
        flexShrink: 0,
      }}>
        {CHEATSHEETS.map(s => {
          const col = CATEGORY_COLORS[s.category];
          const isActive = active === s.id;
          return (
            <div
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                padding: "10px 14px",
                cursor: "pointer",
                borderBottom: "1px solid #181818",
                borderLeft: isActive ? "2px solid #555" : "2px solid transparent",
                background: isActive ? "#1a1a1a" : "transparent",
              }}
            >
              <div style={{ marginBottom: 4 }}>
                <span style={{
                  fontSize: 10, padding: "1px 7px", borderRadius: 20,
                  background: col.bg, color: col.text, border: `1px solid ${col.border}`,
                }}>{s.category}</span>
              </div>
              <div style={{ fontSize: 12, color: isActive ? "#e0e0e0" : "#666" }}>{s.title}</div>
            </div>
          );
        })}

        {/* Diagrams entry */}
        <div
          onClick={() => setActive(DIAGRAMS_ID)}
          style={{
            padding: "10px 14px",
            cursor: "pointer",
            borderBottom: "1px solid #181818",
            borderLeft: active === DIAGRAMS_ID ? "2px solid #555" : "2px solid transparent",
            background: active === DIAGRAMS_ID ? "#1a1a1a" : "transparent",
          }}
        >
          <div style={{ marginBottom: 4 }}>
            <span style={{
              fontSize: 10, padding: "1px 7px", borderRadius: 20,
              background: "#1a1a2e", color: "#AFA9EC", border: "1px solid #3a3a6a",
            }}>Visual</span>
          </div>
          <div style={{ fontSize: 12, color: active === DIAGRAMS_ID ? "#e0e0e0" : "#666" }}>Diagrams</div>
        </div>
      </nav>

      {active === DIAGRAMS_ID ? (
        <DiagramsView />
      ) : (
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          <div style={{ fontSize: 10, color: "#444", letterSpacing: 2, textTransform: "uppercase", marginBottom: 24 }}>
            {sheet.title}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {sheet.content.map((block, i) => (
              <div key={i}>
                <div style={{ fontSize: 11, color: "#555", marginBottom: 8, letterSpacing: 0.5 }}>
                  {block.heading}
                </div>
                <CodeBlock code={block.code} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
