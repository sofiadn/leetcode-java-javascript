import { useState, useEffect } from 'react'

const P = '#AFA9EC'
const T = '#5DCAA5'
const RED = '#C46060'
const REDBDR = '#7a2e2e'
const REDFILL = '#130808'
const DIM = '#888'
const DIMMER = '#555'
const BDR = '#252525'
const BG = '#111'
const FONT = "'JetBrains Mono','Fira Code',monospace"

function SvgDefs() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        <marker id="dg-arr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill={DIMMER} />
        </marker>
        <marker id="dg-arrt" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill={T} />
        </marker>
        <marker id="dg-arrp" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill={P} />
        </marker>
        <marker id="dg-arrr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill={REDBDR} />
        </marker>
      </defs>
    </svg>
  )
}

const R = ({ x, y, w, h, fill = BG, stroke = BDR, rx = 3, dash }) => (
  <rect x={x} y={y} width={w} height={h} fill={fill} stroke={stroke} strokeWidth={1} rx={rx} strokeDasharray={dash} />
)
const Tx = ({ x, y, c = DIM, size = 10, anchor = 'middle', bold, children, ...rest }) => (
  <text x={x} y={y} textAnchor={anchor} fill={c} fontSize={size} fontFamily={FONT}
    fontWeight={bold ? 'bold' : 'normal'} {...rest}>{children}</text>
)
const Ln = ({ x1, y1, x2, y2, col = DIMMER, dash, marker = 'url(#dg-arr)' }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={col} strokeWidth={1}
    strokeDasharray={dash} markerEnd={marker} />
)

/* ─── Java diagrams ─── */

function HashMapDiagram() {
  const keys = [['name', 38], ['age', 82], ['city', 126]]
  const buckets = [[0,20,''],[1,46,'"Sofia"'],[2,72,'30'],[3,98,'"NYC"'],[4,124,'']]
  return (
    <svg viewBox="0 0 310 160" width="100%" style={{ display: 'block' }}>
      {keys.map(([k, y]) => (
        <g key={k}>
          <R x={8} y={y - 14} w={60} h={22} stroke={BDR} />
          <Tx x={38} y={y} c={P}>{`"${k}"`}</Tx>
        </g>
      ))}
      <line x1={68} y1={24} x2={115} y2={64} stroke={DIMMER} strokeWidth={1} />
      <line x1={68} y1={68} x2={115} y2={82} stroke={DIMMER} strokeWidth={1} />
      <line x1={68} y1={112} x2={115} y2={98} stroke={DIMMER} strokeWidth={1} />
      <R x={115} y={55} w={64} h={54} stroke={BDR} rx={4} />
      <Tx x={147} y={78} c={DIMMER} size={9}>hash</Tx>
      <Tx x={147} y={91} c={DIMMER} size={9}>function</Tx>
      <Ln x1={179} y1={82} x2={198} y2={82} />
      {buckets.map(([idx, y, val]) => (
        <g key={idx}>
          <R x={200} y={y} w={26} h={22} stroke={BDR} />
          <Tx x={213} y={y + 15} c={DIMMER} size={9}>{idx}</Tx>
          {val
            ? <><Ln x1={226} y1={y+11} x2={238} y2={y+11} marker="" /><R x={238} y={y} w={62} h={22} stroke={P} fill="#0d0b1a" /><Tx x={269} y={y+15} c={P} size={9}>{val}</Tx></>
            : <Tx x={260} y={y+15} c={'#2a2a2a'} size={9}>──</Tx>
          }
        </g>
      ))}
      <Tx x={14} y={152} c={DIMMER} size={9} anchor="start">keys</Tx>
      <Tx x={213} y={152} c={DIMMER} size={9}>idx</Tx>
      <Tx x={269} y={152} c={DIMMER} size={9}>values</Tx>
    </svg>
  )
}

function ArrayListDiagram() {
  const items = [10, 20, 30, 40]
  return (
    <svg viewBox="0 0 310 100" width="100%" style={{ display: 'block' }}>
      <Tx x={10} y={14} c={DIMMER} size={9} anchor="start">ArrayList</Tx>
      {items.map((v, i) => (
        <g key={i}>
          <R x={10+i*52} y={24} w={48} h={36} stroke={P} fill="#0d0b1a" />
          <Tx x={34+i*52} y={47} c={P}>{v}</Tx>
          <Tx x={34+i*52} y={74} c={DIMMER} size={9}>[{i}]</Tx>
        </g>
      ))}
      {[4,5].map(i => (
        <g key={i}>
          <R x={10+i*52} y={24} w={48} h={36} stroke={BDR} dash="3 2" />
          <Tx x={34+i*52} y={74} c={'#333'} size={9}>[{i}]</Tx>
        </g>
      ))}
      <Ln x1={260} y1={42} x2={298} y2={42} col={T} marker="url(#dg-arrt)" />
      <Tx x={279} y={36} c={T} size={9}>add()</Tx>
      <Tx x={10} y={90} c={DIMMER} size={9} anchor="start">size = 4, capacity grows automatically</Tx>
    </svg>
  )
}

function ArrayDiagram() {
  const items = [10, 20, 30, 40, 50]
  return (
    <svg viewBox="0 0 310 95" width="100%" style={{ display: 'block' }}>
      <Tx x={10} y={14} c={DIMMER} size={9} anchor="start">int[] — fixed size</Tx>
      {items.map((v, i) => (
        <g key={i}>
          <R x={10+i*58} y={24} w={54} h={36} stroke={BDR} />
          <Tx x={37+i*58} y={47} c={DIM}>{v}</Tx>
          <Tx x={37+i*58} y={74} c={DIMMER} size={9}>[{i}]</Tx>
        </g>
      ))}
      <line x1={10} y1={83} x2={300} y2={83} stroke={BDR} strokeWidth={1} />
      <line x1={10} y1={78} x2={10} y2={83} stroke={BDR} strokeWidth={1} />
      <line x1={300} y1={78} x2={300} y2={83} stroke={BDR} strokeWidth={1} />
      <Tx x={155} y={95} c={DIMMER} size={9}>fixed — cannot grow or shrink</Tx>
    </svg>
  )
}

function HashSetDiagram() {
  const buckets = [[0,20,''],[1,46,'"banana"'],[2,72,'"apple"'],[3,98,''],[4,124,'"cherry"']]
  return (
    <svg viewBox="0 0 280 160" width="100%" style={{ display: 'block' }}>
      <Tx x={10} y={14} c={DIMMER} size={9} anchor="start">HashSet — values only, no keys</Tx>
      {buckets.map(([idx, y, val]) => (
        <g key={idx}>
          <R x={20} y={y} w={26} h={22} stroke={BDR} />
          <Tx x={33} y={y+15} c={DIMMER} size={9}>{idx}</Tx>
          {val
            ? <><Ln x1={46} y1={y+11} x2={58} y2={y+11} marker="" /><R x={58} y={y} w={80} h={22} stroke={T} fill="#061410" /><Tx x={98} y={y+15} c={T} size={9}>{val}</Tx></>
            : <Tx x={90} y={y+15} c={'#2a2a2a'} size={9}>──  (empty)</Tx>
          }
        </g>
      ))}
      <Tx x={20} y={154} c={DIMMER} size={9} anchor="start">add() hashes value → bucket</Tx>
    </svg>
  )
}

function StackDiagram() {
  const items = ['peek()', '"C"', '"B"', '"A"']
  const colors  = [T, P, DIM, DIM]
  const strokes = [T, P, BDR, BDR]
  const fills   = ['transparent', '#0d0b1a', BG, BG]
  return (
    <svg viewBox="0 0 200 190" width="100%" style={{ display: 'block' }}>
      <Ln x1={100} y1={16} x2={100} y2={34} col={T} marker="url(#dg-arrt)" />
      <Tx x={130} y={28} c={T} size={9} anchor="start">push()</Tx>
      {items.map((v, i) => (
        <g key={i}>
          <R x={40} y={38+i*32} w={120} h={28} stroke={strokes[i]} fill={fills[i]} dash={i===0?'3 2':undefined} />
          <Tx x={100} y={57+i*32} c={colors[i]} size={i===0?9:11}>{v}</Tx>
        </g>
      ))}
      <Ln x1={100} y1={34} x2={100} y2={16} col={DIMMER} marker="url(#dg-arr)" />
      <Tx x={130} y={50} c={DIMMER} size={9} anchor="start">pop()</Tx>
      <line x1={40} y1={166} x2={160} y2={166} stroke={BDR} strokeWidth={1} />
      <Tx x={100} y={180} c={DIMMER} size={9}>bottom (LIFO)</Tx>
    </svg>
  )
}

function QueueDiagram() {
  const items = ['"C"', '"B"', '"A"']
  return (
    <svg viewBox="0 0 310 110" width="100%" style={{ display: 'block' }}>
      <Tx x={100} y={14} c={DIMMER} size={9} anchor="start">Queue — FIFO</Tx>
      <Ln x1={284} y1={58} x2={264} y2={58} col={T} marker="url(#dg-arrt)" />
      <Tx x={292} y={54} c={T} size={9} anchor="start">offer()</Tx>
      <Tx x={292} y={66} c={DIMMER} size={8} anchor="start">back</Tx>
      {items.map((v, i) => (
        <g key={i}>
          <R x={180-i*56} y={40} w={52} h={36} stroke={i===0?P:BDR} fill={i===0?'#0d0b1a':BG} />
          <Tx x={206-i*56} y={63} c={i===0?P:DIM}>{v}</Tx>
        </g>
      ))}
      <Ln x1={68} y1={58} x2={48} y2={58} col={DIMMER} marker="url(#dg-arr)" />
      <Tx x={10} y={54} c={DIMMER} size={9} anchor="start">poll()</Tx>
      <Tx x={10} y={66} c={DIMMER} size={8} anchor="start">front</Tx>
      <Tx x={155} y={95} c={DIMMER} size={9}>first in = first out</Tx>
    </svg>
  )
}

function PriorityQueueDiagram() {
  const nodes = [
    { v:1,  x:140, y:28,  col:T,   stroke:T,   fill:'#061410' },
    { v:3,  x:90,  y:76,  col:DIM, stroke:BDR, fill:BG },
    { v:5,  x:190, y:76,  col:DIM, stroke:BDR, fill:BG },
    { v:7,  x:60,  y:124, col:DIM, stroke:BDR, fill:BG },
    { v:4,  x:118, y:124, col:DIM, stroke:BDR, fill:BG },
    { v:8,  x:162, y:124, col:DIM, stroke:BDR, fill:BG },
    { v:6,  x:218, y:124, col:DIM, stroke:BDR, fill:BG },
  ]
  const edges = [[140,44,90,68],[140,44,190,68],[90,92,60,116],[90,92,118,116],[190,92,162,116],[190,92,218,116]]
  return (
    <svg viewBox="0 0 300 165" width="100%" style={{ display: 'block' }}>
      {edges.map(([x1,y1,x2,y2],i) => <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={BDR} strokeWidth={1} />)}
      {nodes.map(({ v,x,y,col,stroke,fill }) => (
        <g key={v}>
          <circle cx={x} cy={y+8} r={18} fill={fill} stroke={stroke} strokeWidth={1} />
          <Tx x={x} y={y+13} c={col} size={11}>{v}</Tx>
        </g>
      ))}
      <Ln x1={140} y1={8} x2={140} y2={22} col={T} marker="url(#dg-arrt)" />
      <Tx x={165} y={16} c={T} size={9} anchor="start">poll() → min</Tx>
      <Tx x={140} y={158} c={DIMMER} size={9}>root always = minimum element</Tx>
    </svg>
  )
}

function DequeDiagram() {
  const items = ['"A"', '"B"', '"C"', '"D"']
  return (
    <svg viewBox="0 0 310 115" width="100%" style={{ display: 'block' }}>
      <Tx x={155} y={14} c={DIMMER} size={9}>Deque — double-ended</Tx>
      {items.map((v, i) => (
        <g key={i}>
          <R x={36+i*58} y={28} w={54} h={36} stroke={BDR} />
          <Tx x={63+i*58} y={51} c={DIM}>{v}</Tx>
        </g>
      ))}
      <Ln x1={36} y1={38} x2={14} y2={38} col={T} marker="url(#dg-arrt)" />
      <Ln x1={14} y1={52} x2={36} y2={52} col={P} marker="url(#dg-arrp)" />
      <Tx x={10} y={75} c={T} size={8} anchor="middle">pollFirst</Tx>
      <Tx x={10} y={85} c={P} size={8} anchor="middle">addFirst</Tx>
      <Ln x1={270} y1={38} x2={292} y2={38} col={P} marker="url(#dg-arrp)" />
      <Ln x1={292} y1={52} x2={270} y2={52} col={T} marker="url(#dg-arrt)" />
      <Tx x={295} y={75} c={P} size={8} anchor="middle">addLast</Tx>
      <Tx x={295} y={85} c={T} size={8} anchor="middle">pollLast</Tx>
      <Tx x={155} y={108} c={DIMMER} size={9}>add/remove from either end in O(1)</Tx>
    </svg>
  )
}

/* ─── JS diagrams ─── */

function ClosureDiagram() {
  return (
    <svg viewBox="0 0 310 190" width="100%" style={{ display: 'block' }}>
      <R x={10} y={16} w={290} h={140} stroke={BDR} rx={5} />
      <Tx x={22} y={32} c={DIMMER} size={9} anchor="start">outer()</Tx>
      <R x={24} y={40} w={100} h={24} stroke={P} fill="#0d0b1a" />
      <Tx x={74} y={57} c={P} size={9}>let count = 0</Tx>
      <R x={24} y={80} w={262} h={64} stroke={BDR} rx={4} />
      <Tx x={36} y={95} c={DIMMER} size={9} anchor="start">inner()  ← returned</Tx>
      <Tx x={36} y={115} c={DIM} size={10} anchor="start">count++</Tx>
      <path d="M90,112 C90,90 74,80 74,64" fill="none" stroke={T} strokeWidth={1} markerEnd="url(#dg-arrt)" />
      <Tx x={106} y={102} c={T} size={9} anchor="start">accesses</Tx>
      <Tx x={106} y={113} c={T} size={9} anchor="start">outer scope</Tx>
      <Ln x1={155} y1={156} x2={155} y2={174} col={DIMMER} marker="url(#dg-arr)" />
      <Tx x={155} y={188} c={DIMMER} size={9}>inner() retains count even after outer() exits</Tx>
    </svg>
  )
}

function PromisesDiagram() {
  // viewBox: 320 x 200
  // Pending: center-left
  // Fulfilled: top-right (teal)
  // Rejected: bottom-right (red)
  // .finally(): shared footer
  return (
    <svg viewBox="0 0 320 200" width="100%" style={{ display: 'block' }}>
      {/* ── Pending box ── */}
      <R x={10} y={78} w={96} h={36} stroke={BDR} rx={5} />
      <Tx x={58} y={101} c={DIM} size={11}>Pending</Tx>

      {/* ── Fulfilled box ── */}
      <R x={196} y={24} w={112} h={36} stroke={T} fill="#061410" rx={5} />
      <Tx x={252} y={40} c={T} size={9}>Fulfilled  ✓</Tx>
      <Tx x={252} y={53} c={T} size={8}>.then(cb)</Tx>

      {/* ── Rejected box ── */}
      <R x={196} y={132} w={112} h={36} stroke={REDBDR} fill={REDFILL} rx={5} />
      <Tx x={252} y={148} c={RED} size={9}>Rejected  ✗</Tx>
      <Tx x={252} y={161} c={RED} size={8}>.catch(cb)</Tx>

      {/* resolve arrow: Pending → Fulfilled */}
      <path d="M106,88 C148,88 162,42 196,42" fill="none" stroke={T} strokeWidth={1} markerEnd="url(#dg-arrt)" />
      <Tx x={148} y={72} c={T} size={9}>resolve(value)</Tx>

      {/* reject arrow: Pending → Rejected */}
      <path d="M106,106 C148,106 162,150 196,150" fill="none" stroke={REDBDR} strokeWidth={1} markerEnd="url(#dg-arrr)" />
      <Tx x={148} y={127} c={RED} size={9}>reject(reason)</Tx>

      {/* .finally() shared footer */}
      <line x1={252} y1={60} x2={252} y2={76} stroke={DIMMER} strokeWidth={1} strokeDasharray="3 2" />
      <line x1={252} y1={132} x2={252} y2={116} stroke={DIMMER} strokeWidth={1} strokeDasharray="3 2" />
      <line x1={252} y1={76} x2={252} y2={116} stroke={DIMMER} strokeWidth={1} strokeDasharray="3 2" />
      <Ln x1={252} y1={96} x2={290} y2={96} col={DIMMER} marker="url(#dg-arr)" />
      <R x={290} y={82} w={24} h={28} stroke={BDR} rx={3} />
      <Tx x={302} y={97} c={DIMMER} size={8}>.fin</Tx>
      <Tx x={302} y={107} c={DIMMER} size={8}>ally</Tx>

      {/* immutability note */}
      <Tx x={160} y={190} c={DIMMER} size={9}>state is final — once settled it never changes</Tx>
    </svg>
  )
}

function EventLoopDiagram() {
  return (
    <svg viewBox="0 0 310 175" width="100%" style={{ display: 'block' }}>
      <R x={8} y={20} w={88} h={100} stroke={P} fill="#0d0b1a" rx={4} />
      <Tx x={52} y={38} c={P} size={9}>Call Stack</Tx>
      <R x={14} y={44} w={76} h={20} stroke={P} fill="#191030" rx={2} />
      <Tx x={52} y={59} c={P} size={9}>fn()</Tx>
      <R x={14} y={67} w={76} h={20} stroke={BDR} rx={2} />
      <Tx x={52} y={82} c={DIM} size={9}>main()</Tx>
      <R x={112} y={20} w={88} h={100} stroke={BDR} rx={4} />
      <Tx x={156} y={38} c={DIMMER} size={9}>Web APIs</Tx>
      <Tx x={156} y={58} c={DIM} size={9}>setTimeout</Tx>
      <Tx x={156} y={74} c={DIM} size={9}>fetch</Tx>
      <Tx x={156} y={90} c={DIM} size={9}>DOM events</Tx>
      <R x={216} y={20} w={88} h={100} stroke={T} fill="#061410" rx={4} />
      <Tx x={260} y={38} c={T} size={9}>Callback</Tx>
      <Tx x={260} y={50} c={T} size={9}>Queue</Tx>
      <R x={222} y={56} w={76} h={20} stroke={T} fill="#0a1f14" rx={2} />
      <Tx x={260} y={71} c={T} size={9}>cb1</Tx>
      <R x={222} y={80} w={76} h={20} stroke={BDR} rx={2} />
      <Tx x={260} y={95} c={DIM} size={9}>cb2</Tx>
      <Ln x1={200} y1={65} x2={215} y2={65} col={DIMMER} />
      <path d="M260,120 C260,150 52,150 52,120" fill="none" stroke={T} strokeWidth={1} markerEnd="url(#dg-arrt)" />
      <Tx x={156} y={162} c={T} size={9}>event loop — moves cb to stack when stack is empty</Tx>
      <Tx x={8}   y={133} c={DIMMER} size={8} anchor="start">your code</Tx>
      <Tx x={112} y={133} c={DIMMER} size={8} anchor="start">browser</Tx>
      <Tx x={216} y={133} c={DIMMER} size={8} anchor="start">waiting cbs</Tx>
    </svg>
  )
}

function DebounceThrottleDiagram() {
  const calls = [20, 50, 80, 120, 170, 220, 260]
  const W = 300
  return (
    <svg viewBox="0 0 310 175" width="100%" style={{ display: 'block' }}>
      <Tx x={8} y={18} c={DIMMER} size={9} anchor="start">Calls:</Tx>
      <line x1={8} y1={30} x2={W} y2={30} stroke={BDR} strokeWidth={1} />
      <Ln x1={W} y1={30} x2={W+8} y2={30} marker="url(#dg-arr)" />
      {calls.map(x => <line key={x} x1={x} y1={24} x2={x} y2={36} stroke={DIMMER} strokeWidth={1} />)}
      <Tx x={8} y={62} c={P} size={9} anchor="start">Debounce:</Tx>
      <line x1={8} y1={72} x2={W} y2={72} stroke={BDR} strokeWidth={1} />
      <line x1={280} y1={66} x2={280} y2={78} stroke={P} strokeWidth={2} />
      <Tx x={280} y={90} c={P} size={8}>fire</Tx>
      <path d="M261,72 Q270,55 279,72" fill="none" stroke={P} strokeWidth={1} strokeDasharray="3 2" />
      <Tx x={270} y={53} c={P} size={8}>delay</Tx>
      <Tx x={8} y={118} c={T} size={9} anchor="start">Throttle:</Tx>
      <line x1={8} y1={128} x2={W} y2={128} stroke={BDR} strokeWidth={1} />
      {[20,120,220].map(x => (
        <g key={x}>
          <line x1={x} y1={122} x2={x} y2={134} stroke={T} strokeWidth={2} />
          <Tx x={x} y={146} c={T} size={8}>fire</Tx>
        </g>
      ))}
      <line x1={20} y1={154} x2={120} y2={154} stroke={T} strokeWidth={1} />
      <line x1={20} y1={150} x2={20}  y2={154} stroke={T} strokeWidth={1} />
      <line x1={120} y1={150} x2={120} y2={154} stroke={T} strokeWidth={1} />
      <Tx x={70} y={166} c={T} size={8}>interval t</Tx>
      <Tx x={155} y={178} c={DIMMER} size={9}>debounce: fire after silence · throttle: fire at most once per t ms</Tx>
    </svg>
  )
}

/* ─── data ─── */

const javaDiagrams = [
  {
    title: 'HashMap',
    svg: <HashMapDiagram />,
    caption: 'Keys are hashed to bucket indices; values hang off the bucket.',
    info: [
      'get / put / containsKey are all O(1) average',
      'hash collision → multiple entries in the same bucket (chaining)',
      'resizes when load factor exceeds 0.75 (default)',
      'use getOrDefault(key, 0) to avoid null checks',
      'computeIfAbsent(key, k -> new ArrayList<>()) is the cleanest grouping pattern',
    ],
  },
  {
    title: 'ArrayList',
    svg: <ArrayListDiagram />,
    caption: 'Indexed, ordered, dynamic — backed by a resizable array.',
    info: [
      'get(i) / set(i) are O(1) — direct index access',
      'add() at end is amortized O(1); add(i, val) at middle is O(n)',
      'remove(int i) removes by index; remove(Object o) removes by value',
      'Collections.sort(list) sorts in-place in O(n log n)',
      'list.size() has parens; array.length does not',
    ],
  },
  {
    title: 'int[] array',
    svg: <ArrayDiagram />,
    caption: 'Fixed size set at creation; use when length is known.',
    info: [
      'int[] arr = new int[n] — all zeros by default',
      'arr.length has no parens (unlike String.length())',
      'Arrays.sort(arr) sorts in-place — O(n log n)',
      'Arrays.fill(arr, 0) resets every element',
      'Use when you need a fixed-size frequency counter (e.g. int[26] for a–z)',
    ],
  },
  {
    title: 'HashSet',
    svg: <HashSetDiagram />,
    caption: 'Like HashMap but stores only values; O(1) contains().',
    info: [
      'add(x) returns false if x already exists — useful for duplicate detection',
      'contains() is O(1) — use instead of list.contains() which is O(n)',
      'if (!seen.add(n)) return true; — classic contains-duplicate trick',
      'no guaranteed iteration order',
      'backed by a HashMap internally',
    ],
  },
  {
    title: 'Stack (ArrayDeque)',
    svg: <StackDiagram />,
    caption: 'LIFO — push and pop happen at the same end.',
    info: [
      'Prefer ArrayDeque over Stack class (Stack is synchronized, slower)',
      'push(x) adds to front; pop() removes from front; peek() reads front',
      'use for: balanced parentheses, DFS, undo history, monotonic stack',
      'stack.isEmpty() before pop() / peek() to avoid EmptyDequeException',
      'Deque<Integer> stack = new ArrayDeque<>();',
    ],
  },
  {
    title: 'Queue (ArrayDeque)',
    svg: <QueueDiagram />,
    caption: 'FIFO — offer at back, poll from front; use for BFS.',
    info: [
      'offer(x) adds to back — never throws, returns false if full',
      'poll() removes from front — returns null if empty (safe)',
      'peek() reads front without removing',
      'Queue<Integer> q = new ArrayDeque<>();',
      'the go-to structure for BFS — level-order traversal',
    ],
  },
  {
    title: 'PriorityQueue (min-heap)',
    svg: <PriorityQueueDiagram />,
    caption: 'poll() always removes the smallest element in O(log n).',
    info: [
      'PriorityQueue<Integer> pq = new PriorityQueue<>();  // min-heap',
      'PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());  // max-heap',
      'offer(x) inserts in O(log n); poll() removes min in O(log n)',
      'peek() reads the min in O(1) without removing',
      'use for Top-K problems: keep a min-heap of size k, evict when oversized',
    ],
  },
  {
    title: 'Deque',
    svg: <DequeDiagram />,
    caption: 'Double-ended queue — O(1) add/remove at either end.',
    info: [
      'Deque<Integer> dq = new ArrayDeque<>();',
      'addFirst / pollFirst — operate on front (stack behaviour)',
      'addLast / pollLast — operate on back (queue behaviour)',
      'use for: sliding window maximum (monotonic deque), palindrome check',
      'peekFirst / peekLast read without removing',
    ],
  },
]

const jsDiagrams = [
  {
    title: 'Closure',
    svg: <ClosureDiagram />,
    caption: 'Inner function retains a live reference to outer scope variables.',
    info: [
      'a closure is created every time a function is defined inside another function',
      'the inner function holds a live reference — not a copy — of the outer variable',
      'classic use: debounce, throttle, memoize, factory functions, private state',
      'var in loops captures the same binding; use let or IIFE to fix it',
      'closures are why returned inner functions still "work" after the outer fn exits',
    ],
  },
  {
    title: 'Promise states',
    svg: <PromisesDiagram />,
    caption: 'A promise transitions once — pending → fulfilled or rejected.',
    info: [
      'three states: pending → fulfilled (resolve) or rejected (reject)',
      'once settled the state is frozen — it can never change again',
      '.then(onFulfilled, onRejected) handles both in one call',
      '.catch(cb) is shorthand for .then(undefined, cb)',
      '.finally(cb) runs regardless of outcome — use for cleanup',
      'Promise.all([p1,p2]) waits for all, fails fast on first rejection',
      'Promise.race([p1,p2]) resolves/rejects as soon as one settles',
      'Promise.allSettled([p1,p2]) waits for all, never rejects',
    ],
  },
  {
    title: 'Event loop',
    svg: <EventLoopDiagram />,
    caption: 'Callbacks move from queue to call stack only when stack is empty.',
    info: [
      'JS is single-threaded — only one thing runs at a time on the call stack',
      'async work (setTimeout, fetch) is handled by the browser/Node Web APIs',
      'when async work finishes, its callback is queued in the callback queue',
      'the event loop checks: if call stack is empty → move next cb from queue to stack',
      'microtask queue (Promises) drains fully before the next macrotask (setTimeout)',
      'this is why setTimeout(..., 0) still runs after .then() callbacks',
    ],
  },
  {
    title: 'Debounce vs Throttle',
    svg: <DebounceThrottleDiagram />,
    caption: 'Debounce waits for silence; throttle limits to one call per interval.',
    info: [
      'debounce: fires fn only after t ms of silence — resets on every new call',
      'throttle: fires fn at most once per t ms regardless of how many calls come in',
      'debounce use cases: search-as-you-type, window resize handler, form autosave',
      'throttle use cases: scroll handler, mousemove, rate-limiting button clicks',
      'both use closures to hold state (timer ID or cooldown flag) between calls',
      'debounce implementation: clearTimeout + setTimeout on every call',
      'throttle implementation: boolean flag reset after t ms via setTimeout',
    ],
  },
]

/* ─── expand modal ─── */

function DiagramModal({ item, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.82)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '32px 24px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0d0d0d',
          border: '1px solid #252525',
          borderRadius: 10,
          padding: '28px 32px',
          width: '100%',
          maxWidth: 720,
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {/* close hint */}
        <div style={{ position: 'absolute', top: 14, right: 18, fontSize: 10, color: '#333', fontFamily: FONT }}>
          esc or click outside to close
        </div>

        {/* title */}
        <div style={{ fontSize: 13, color: '#e0e0e0', marginBottom: 4, fontFamily: FONT }}>
          {item.title}
        </div>
        <div style={{ fontSize: 10, color: '#444', marginBottom: 24, fontFamily: FONT }}>
          {item.caption}
        </div>

        {/* large diagram */}
        <div style={{ background: '#080808', border: '1px solid #1a1a1a', borderRadius: 8, padding: '20px 24px', marginBottom: 28 }}>
          {item.svg}
        </div>

        {/* info points */}
        <div style={{ fontSize: 10, color: '#444', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14, fontFamily: FONT }}>
          Key insights
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {item.info.map((point, i) => (
            <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ color: '#2e2e2e', fontFamily: FONT, fontSize: 11, flexShrink: 0, marginTop: 1 }}>–</span>
              <span style={{ fontSize: 12, color: '#777', fontFamily: FONT, lineHeight: 1.7 }}>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ─── layout ─── */

export default function DiagramsView() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
      <SvgDefs />

      {[{ label: 'Java Data Structures', items: javaDiagrams }, { label: 'JS Concepts', items: jsDiagrams }].map(({ label, items }) => (
        <div key={label} style={{ marginBottom: 44 }}>
          <div style={{ fontSize: 10, color: '#444', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>
            {label}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
            {items.map((item) => (
              <div
                key={item.title}
                onClick={() => setExpanded(item)}
                style={{
                  background: '#0d0d0d',
                  border: '1px solid #1e1e1e',
                  borderRadius: 8,
                  padding: '14px 16px',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#333'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#1e1e1e'}
              >
                <div style={{ fontSize: 11, color: '#555', marginBottom: 12, letterSpacing: 0.5, fontFamily: FONT }}>
                  {item.title}
                </div>
                {item.svg}
                <div style={{ fontSize: 10, color: '#2e2e2e', marginTop: 10, lineHeight: 1.6, fontFamily: FONT }}>
                  {item.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {expanded && <DiagramModal item={expanded} onClose={() => setExpanded(null)} />}
    </div>
  )
}
