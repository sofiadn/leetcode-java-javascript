import { PROBLEMS } from "../data/problems";
import { CATEGORY_COLORS, DIFF_COLORS } from "../data/constants";

const CATEGORIES = ["All", "Java", "JS"];

const GRADE_COLORS = {
  clean:  '#5DCAA5',
  close:  '#EF9F27',
  needed: '#C46060',
};

export default function ProblemList({ selected, done, grades, filter, onSelect, onFilterChange }) {
  const filtered = filter === "All" ? PROBLEMS : PROBLEMS.filter(p => p.category === filter);

  return (
    <aside style={{
      width: 240,
      borderRight: "1px solid #1e1e1e",
      display: "flex",
      flexDirection: "column",
      background: "#111",
      flexShrink: 0,
    }}>
      <div style={{ padding: "10px 14px 8px", borderBottom: "1px solid #1e1e1e" }}>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => onFilterChange(c)}
              style={{
                padding: "3px 10px",
                borderRadius: 20,
                border: "1px solid",
                borderColor: filter === c ? "#444" : "#222",
                background: filter === c ? "#222" : "transparent",
                color: filter === c ? "#e0e0e0" : "#555",
                cursor: "pointer",
                fontSize: 11,
                fontFamily: "inherit",
              }}
            >{c}</button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {filtered.map(p => {
          const col = CATEGORY_COLORS[p.category];
          const isActive = selected.id === p.id;
          const grade = grades?.[p.id];
          return (
            <div
              key={p.id}
              onClick={() => onSelect(p)}
              style={{
                padding: "10px 14px",
                cursor: "pointer",
                borderBottom: "1px solid #181818",
                borderLeft: isActive ? "2px solid #555" : "2px solid transparent",
                background: isActive ? "#1a1a1a" : "transparent",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{
                  fontSize: 10, padding: "1px 7px", borderRadius: 20,
                  background: col.bg, color: col.text, border: `1px solid ${col.border}`,
                }}>{p.category}</span>
                {done[p.id] && !grade && (
                  <span style={{ fontSize: 10, color: "#3B6D11" }}>✓</span>
                )}
                {grade && (
                  <span style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: GRADE_COLORS[grade],
                    display: "inline-block", flexShrink: 0,
                  }} />
                )}
              </div>
              <div style={{ fontSize: 12, color: isActive ? "#e0e0e0" : "#888", lineHeight: 1.4 }}>{p.title}</div>
              <div style={{ fontSize: 10, color: DIFF_COLORS[p.difficulty].text, marginTop: 3 }}>{p.difficulty}</div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
