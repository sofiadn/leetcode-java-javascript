import { useState, useEffect, useRef } from 'react'
import { PROBLEMS } from './data/problems'
import ProblemList from './components/ProblemList'
import ProblemPanel from './components/ProblemPanel'
import CodeEditor from './components/CodeEditor'
import CheatsheetView from './components/CheatsheetView'

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback }
  catch { return fallback }
}

const fmt = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

export default function App() {
  const [tab, setTab] = useState('practice')
  const [filter, setFilter] = useState('All')
  const [selectedId, setSelectedId] = useState(PROBLEMS[0].id)
  const [done, setDone] = useState(() => load('prep_done', {}))
  const [codes, setCodes] = useState(() => load('prep_codes', {}))
  const [approaches, setApproaches] = useState(() => load('prep_approaches', {}))
  const [grades, setGrades] = useState(() => load('prep_grades', {}))
  const [showHint, setShowHint] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const timerRef = useRef(null)

  const selected = PROBLEMS.find(p => p.id === selectedId)
  const code = codes[selectedId] ?? selected.starter
  const approach = approaches[selectedId] ?? ''
  const doneCount = Object.values(done).filter(Boolean).length
  const progress = Math.round((doneCount / PROBLEMS.length) * 100)

  useEffect(() => { localStorage.setItem('prep_done',      JSON.stringify(done))      }, [done])
  useEffect(() => { localStorage.setItem('prep_codes',     JSON.stringify(codes))     }, [codes])
  useEffect(() => { localStorage.setItem('prep_approaches',JSON.stringify(approaches)) }, [approaches])
  useEffect(() => { localStorage.setItem('prep_grades',    JSON.stringify(grades))    }, [grades])

  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [timerActive])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'i' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'INPUT') {
        setShowSolution(true)
        setTimerActive(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const selectProblem = (p) => {
    setSelectedId(p.id)
    setShowHint(false)
    setSubmitted(false)
    setShowSolution(false)
    setSeconds(0)
    setTimerActive(false)
  }

  const handleSubmit = () => {
    setSubmitted(true)
    setShowSolution(true)
    setTimerActive(false)
  }

  const handleGrade = (grade) => {
    setGrades(prev => ({ ...prev, [selectedId]: grade }))
    // auto mark done on any grade
    setDone(prev => ({ ...prev, [selectedId]: true }))
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100vh',
      fontFamily: "'JetBrains Mono','Fira Code',monospace",
      background: '#0a0a0a', color: '#e0e0e0', fontSize: 13,
    }}>
      {/* Top progress bar */}
      <div style={{ height: 2, background: '#141414' }}>
        <div style={{
          height: '100%', width: `${progress}%`,
          background: '#3B6D11', transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Nav */}
      <header style={{
        display: 'flex', alignItems: 'center',
        borderBottom: '1px solid #1a1a1a', background: '#080808',
        padding: '0 20px', gap: 0,
      }}>
        <span style={{ fontSize: 11, color: '#333', letterSpacing: 2, marginRight: 20, padding: '12px 0' }}>
          PREP
        </span>
        {['practice', 'cheatsheets'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '12px 16px', border: 'none',
            borderBottom: tab === t ? '1px solid #555' : '1px solid transparent',
            background: 'transparent', color: tab === t ? '#e0e0e0' : '#444',
            cursor: 'pointer', fontSize: 11, fontFamily: 'inherit',
            letterSpacing: 1, textTransform: 'uppercase',
          }}>{t}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, color: '#333' }}>{doneCount}/{PROBLEMS.length}</span>
          <div style={{ width: 60, height: 3, background: '#1a1a1a', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${progress}%`,
              background: '#3B6D11', transition: 'width 0.4s ease',
            }} />
          </div>
        </div>
      </header>

      {tab === 'cheatsheets' ? (
        <CheatsheetView />
      ) : (
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <ProblemList
            selected={selected}
            done={done}
            grades={grades}
            filter={filter}
            onSelect={selectProblem}
            onFilterChange={setFilter}
          />

          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Problem header bar */}
            <div style={{
              padding: '10px 20px', borderBottom: '1px solid #1a1a1a',
              display: 'flex', alignItems: 'center', gap: 10, background: '#0e0e0e',
            }}>
              <span style={{ fontSize: 13, color: '#ddd' }}>{selected.title}</span>
              <span style={{
                fontSize: 10, padding: '2px 9px', borderRadius: 20,
                background: '#161616', color: '#555', border: '1px solid #1e1e1e',
              }}>{selected.pattern}</span>

              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontSize: 12, color: timerActive ? '#5DCAA5' : '#2a2a2a',
                  minWidth: 46, fontVariantNumeric: 'tabular-nums',
                }}>
                  {fmt(seconds)}
                </span>
                <button onClick={() => setTimerActive(t => !t)} style={{
                  padding: '4px 11px', borderRadius: 4,
                  border: '1px solid #222', background: '#141414',
                  color: timerActive ? '#5DCAA5' : '#555',
                  cursor: 'pointer', fontSize: 11, fontFamily: 'inherit',
                }}>
                  {timerActive ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={() => setDone(d => ({ ...d, [selectedId]: !d[selectedId] }))}
                  style={{
                    padding: '4px 11px', borderRadius: 4,
                    border: `1px solid ${done[selectedId] ? '#2a4a2a' : '#222'}`,
                    background: done[selectedId] ? '#0f1a0f' : '#141414',
                    color: done[selectedId] ? '#97C459' : '#555',
                    cursor: 'pointer', fontSize: 11, fontFamily: 'inherit',
                  }}
                >
                  {done[selectedId] ? '✓ Done' : 'Mark done'}
                </button>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              <ProblemPanel
                problem={selected}
                code={code}
                approach={approach}
                onApproachChange={val => setApproaches(prev => ({ ...prev, [selectedId]: val }))}
                showHint={showHint}
                onShowHint={() => setShowHint(true)}
                showSolution={showSolution}
                grade={grades[selectedId]}
                onGrade={handleGrade}
              />
              <CodeEditor
                code={code}
                onChange={val => setCodes(prev => ({ ...prev, [selectedId]: val }))}
                onSubmit={handleSubmit}
                onReset={() => setCodes(prev => ({ ...prev, [selectedId]: selected.starter }))}
                submitted={submitted}
                showSolution={showSolution}
              />
            </div>
          </main>
        </div>
      )}
    </div>
  )
}
