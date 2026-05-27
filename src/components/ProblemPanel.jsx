import { useEffect } from "react"
import CodeBlock from "./CodeBlock"

const GRADES = [
  { key: 'clean',  label: 'Solved it',  symbol: '✓', color: '#5DCAA5', dim: '#1a4a3a', bg: '#050f0a' },
  { key: 'close',  label: 'Right idea', symbol: '~', color: '#EF9F27', dim: '#5a3a10', bg: '#0f0a04' },
  { key: 'needed', label: 'Needed it',  symbol: '✗', color: '#C46060', dim: '#5a2020', bg: '#0f0505' },
]

// Strip comments, lowercase, keep only alphanumeric tokens
function tokenize(code) {
  return code
    .replace(/\/\/[^\n]*/g, ' ')       // line comments
    .replace(/\/\*[\s\S]*?\*\//g, ' ') // block comments
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 1)         // drop single chars (i, j, n …)
}

function jaccardSimilarity(a, b) {
  const sa = new Set(a)
  const sb = new Set(b)
  let inter = 0
  for (const t of sa) if (sb.has(t)) inter++
  const union = new Set([...sa, ...sb]).size
  return union === 0 ? 0 : inter / union
}

function evaluate(userCode, solution) {
  const userTokens   = tokenize(userCode)
  const solTokens    = tokenize(solution)
  const score        = jaccardSimilarity(userTokens, solTokens)

  // Also check if user code is basically empty / starter-only
  const meaningfulLines = userCode
    .split('\n')
    .filter(l => l.trim() && !l.trim().startsWith('//') && !l.trim().startsWith('*'))
    .length

  if (meaningfulLines < 3) return { grade: 'needed', score, reason: 'Similarity ' + pct(score) }

  if (score >= 0.60) return { grade: 'clean',  score, reason: 'Similarity ' + pct(score) }
  if (score >= 0.30) return { grade: 'close',  score, reason: 'Similarity ' + pct(score) }
  return               { grade: 'needed', score, reason: 'Similarity ' + pct(score) }
}

const pct = n => Math.round(n * 100) + '%'

export default function ProblemPanel({
  problem,
  code,
  approach,
  onApproachChange,
  showHint,
  onShowHint,
  showSolution,
  grade,
  onGrade,
}) {
  const gradeInfo = GRADES.find(g => g.key === grade)

  // Auto-grade the moment solution is revealed (skip if already graded)
  useEffect(() => {
    if (!showSolution || grade) return
    const result = evaluate(code, problem.solution)
    onGrade(result.grade)
  }, [showSolution, problem.id]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{
      width: "40%",
      borderRight: "1px solid #1e1e1e",
      overflowY: "auto",
      padding: "20px 22px",
      display: "flex",
      flexDirection: "column",
      gap: 20,
      flexShrink: 0,
    }}>
      <section>
        <Label>Problem</Label>
        <p style={{ fontSize: 12, color: "#aaa", lineHeight: 1.85, whiteSpace: "pre-wrap", margin: 0 }}>
          {problem.description}
        </p>
      </section>

      <section>
        <Label>Your approach</Label>
        <textarea
          value={approach}
          onChange={e => onApproachChange(e.target.value)}
          placeholder="Pattern? Data structure? Walk through an example first..."
          style={{
            width: "100%",
            minHeight: 90,
            background: "#080810",
            border: "1px solid #1e1e1e",
            borderRadius: 6,
            color: "#aaa",
            padding: "10px 12px",
            fontSize: 12,
            fontFamily: "inherit",
            resize: "vertical",
            lineHeight: 1.7,
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </section>

      {!showHint ? (
        <button
          onClick={onShowHint}
          style={{
            padding: "8px 14px",
            borderRadius: 6,
            border: "1px solid #1e1e1e",
            background: "#111",
            color: "#555",
            cursor: "pointer",
            fontSize: 11,
            fontFamily: "inherit",
            textAlign: "left",
          }}
        >Show hint →</button>
      ) : (
        <div style={{ background: "#060f09", border: "1px solid #162010", borderRadius: 6, padding: 14 }}>
          <Label color="#3B6D11">Hint</Label>
          <p style={{ fontSize: 12, color: "#7fb96a", lineHeight: 1.75, margin: 0 }}>{problem.hint}</p>
        </div>
      )}

      {showSolution && (
        <div style={{ background: "#06060f", border: "1px solid #18183a", borderRadius: 6, padding: 14 }}>
          <Label color="#534AB7">Solution</Label>
          <CodeBlock code={problem.solution} />
        </div>
      )}

      {showSolution && gradeInfo && (
        <div style={{
          border: `1px solid ${gradeInfo.dim}`,
          borderRadius: 6,
          padding: "12px 14px",
          background: gradeInfo.bg,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}>
          <span style={{ fontSize: 18, color: gradeInfo.color }}>{gradeInfo.symbol}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: gradeInfo.color }}>{gradeInfo.label}</div>
            <div style={{ fontSize: 10, color: "#444", marginTop: 2 }}>
              {evaluate(code, problem.solution).reason}
            </div>
          </div>
          <button
            onClick={() => {
              onGrade(null)
              // re-grade immediately
              const result = evaluate(code, problem.solution)
              onGrade(result.grade)
            }}
            style={{
              background: "none", border: "none", color: "#333",
              cursor: "pointer", fontSize: 10, fontFamily: "inherit", padding: 0,
            }}
          >re-run</button>
        </div>
      )}
    </div>
  )
}

function Label({ children, color = "#444" }) {
  return (
    <div style={{
      fontSize: 10,
      color,
      letterSpacing: 1.5,
      textTransform: "uppercase",
      marginBottom: 8,
    }}>
      {children}
    </div>
  )
}
