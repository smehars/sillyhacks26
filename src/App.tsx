import { useEffect, useMemo, useState } from 'react'

export default function App() {
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 })
  const [progress, setProgress] = useState(20)
  const [maybeText, setMaybeText] = useState('Maybe Later (you won’t)')
  const [maybeCount, setMaybeCount] = useState(1)
  const [maybeOffset, setMaybeOffset] = useState({ x: 0, y: 0 })
  const [maybeDrift, setMaybeDrift] = useState({ x: 0, y: 0 })

  const [glitchText, setGlitchText] = useState('Software Engineering')

  // progress bar chaos
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const change = Math.random() * 30 - 10
        let next = p + change
        if (next < 0) next = 5
        if (next > 100) next = 80
        return next
      })
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  // glitch title
  useEffect(() => {
    const texts = ['Software Engineering', 'Software Guessing', 'Bug Creator', 'Stack Overflow Specialist']
    const interval = setInterval(() => {
      setGlitchText(texts[Math.floor(Math.random() * texts.length)])
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // drifting maybe buttons
  useEffect(() => {
    const id = setInterval(() => {
      setMaybeDrift({
        x: Math.random() * 220 - 110,
        y: Math.random() * 120 - 60,
      })
    }, 900)
    return () => clearInterval(id)
  }, [])

  // role snapshot physics
  const initialCards = useMemo(() => ([
    { id: 0, x: 0, y: 0, vx: 0.8, vy: 0.6 },
    { id: 1, x: 20, y: 10, vx: -0.6, vy: 0.9 },
    { id: 2, x: -10, y: 20, vx: 0.7, vy: -0.5 },
    { id: 3, x: 10, y: -10, vx: -0.5, vy: 0.7 },
  ]), [])

  const [cards, setCards] = useState(initialCards)

  useEffect(() => {
    const id = setInterval(() => {
      setCards((prev) =>
        prev.map((c) => {
          let nx = c.x + c.vx * 10
          let ny = c.y + c.vy * 10
          let vx = c.vx
          let vy = c.vy + 0.08

          if (nx > 200 || nx < -200) vx = -vx
          if (ny > 120 || ny < -120) vy = -vy

          nx += Math.random() * 10 - 5
          ny += Math.random() * 10 - 5

          return { ...c, x: nx, y: ny, vx, vy }
        })
      )
    }, 100)

    return () => clearInterval(id)
  }, [])

  const handleMaybeLater = () => {
    const phrases = [
      'ok fine…',
      'wait come back',
      'you sure?',
      'this is your last chance',
      'bro just apply 😭'
    ]

    setMaybeText(phrases[Math.floor(Math.random() * phrases.length)])
    setMaybeOffset({
      x: Math.random() * 60 - 30,
      y: Math.random() * 30 - 15
    })

    if (maybeCount < 5) setMaybeCount(maybeCount + 1)
    else alert('we are too lazy… just close the website 😭')
  }

  const moveButton = () => {
    const x = Math.random() * 500 - 250
    const y = Math.random() * 250 - 125
    setBtnPos({ x, y })
  }

  const content = [
    ['What you’ll do', 'Build features, fix bugs, and question your life choices.'],
    ['What we value', 'Clean code, clear thinking, and vibes.'],
    ['Unofficial title', 'Stack Overflow Speedrunner.'],
    ['Fun fact', 'This card rearranges itself when you get comfortable.']
  ]

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="fixed top-0 left-0 h-1 bg-slate-900" style={{ width: `${progress}%` }} />

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-12 md:px-10">

        {/* HEADER */}
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-slate-400">
            Job ID 6767
          </p>

          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Senior Associate Junior Principal Staff Software Engineer of Distributed Systems, Button Optimization, and Vibe Alignment
          </h1>

          <div className="mt-10 relative h-28">
            {Array.from({ length: maybeCount }).map((_, i) => (
              <button
                key={i}
                onClick={handleMaybeLater}
                style={{
                  position: 'absolute',
                  left: i * 6,
                  top: 10,
                  zIndex: 1,
                  transform: `translate(${maybeOffset.x + maybeDrift.x}px, ${maybeOffset.y + maybeDrift.y}px)`
                }}
                className="rounded-xl border border-slate-300 px-7 py-4 text-base font-semibold text-slate-700 bg-white"
              >
                {maybeText}
              </button>
            ))}

            <button
              onMouseEnter={moveButton}
              style={{
                position: 'absolute',
                left: 200,
                top: 10,
                zIndex: 3,
                transform: `translate(${btnPos.x}px, ${btnPos.y}px)`
              }}
              className="rounded-xl bg-slate-900 px-7 py-4 text-base font-semibold text-white shadow"
            >
              Apply Now (good luck)
            </button>
          </div>
        </div>

        {/* ROLE SNAPSHOT NOW BELOW + BIGGER */}
        <div className="mt-20">
          <div className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm h-[400px] overflow-hidden w-full">

            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Role snapshot
              </p>
              <p className="text-2xl font-bold">{glitchText}</p>
            </div>

            <div className="relative h-full">
              {cards.map((c) => (
                <div
                  key={c.id}
                  className="absolute w-[40%] rounded-lg bg-slate-50 border border-slate-200 p-4 shadow"
                  style={{
                    transform: `translate(${c.x}px, ${c.y}px) rotate(${(c.id % 2 ? 1 : -1) * 4}deg)`,
                    left: `${20 + c.id * 12}%`,
                    top: `${20 + c.id * 6}%`,
                    zIndex: 1 + c.id
                  }}
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {content[c.id][0]}
                  </p>
                  <p className="mt-2 text-sm leading-5 text-slate-600">
                    {content[c.id][1]}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
