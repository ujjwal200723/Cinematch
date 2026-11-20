import React, { useEffect, useRef, useState } from 'react'

const ASSETS = {
  doors: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261117_063048_97fd9a70-adbe-46bd-bfce-ec1004f6c7d8.png&w=2000&q=85',
  aerial: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261117_063055_ee1debcd-d200-484f-b94f-fad6dcffd4eb.png&w=2000&q=85',
  back: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261117_063251_24fbd7cc-00df-49ec-8fbf-d8a0349b1e98.png&w=2000&q=85',
  mid: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261117_063252_b9f2fecf-9be0-485f-842f-3aa6bbc251f2.png&w=2000&q=85',
  front: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261117_063151_7804d758-a2eb-4499-9b56-8f493edbb206.png&w=2000&q=85',
  tiltVideo: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261117_063355_a600befc-45d6-4a32-9db6-9d6565a89609.mp4',
  rainVideo: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261117_063703_04e54df7-2236-4dff-b95b-a9a34c1f78ec.mp4',
}

const LETTERS = ['S', 'u', 'm', 'm', 'i', 't']

export default function HarborluxHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLVideoElement>(null)
  const rainARef = useRef<HTMLVideoElement>(null)
  const rainBRef = useRef<HTMLVideoElement>(null)
  const [introClass, setIntroClass] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const animationsRef = useRef<Animation[]>([])
  const startTimeRef = useRef(0)
  const rafRef = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setIntroClass(false)
      return
    }

    const hero = heroRef.current
    if (!hero) return

    let started = false
    const start = () => {
      if (started) return
      started = true
      setTimeout(() => {
        startTimeRef.current = performance.now()
        animationsRef.current.forEach(a => a.play())
        const tick = () => {
          const elapsed = performance.now() - startTimeRef.current
          animationsRef.current.forEach(a => { a.currentTime = elapsed })
          if (elapsed < 7400) {
            rafRef.current = requestAnimationFrame(tick)
          } else {
            setIntroClass(false)
          }
        }
        rafRef.current = requestAnimationFrame(tick)
      }, 120)
    }

    const failsafe = setTimeout(start, 5000)

    const imgs = hero.querySelectorAll<HTMLImageElement>('img[data-preload]')
    let loaded = 0
    const total = imgs.length + 1
    const check = () => { loaded++; if (loaded >= total) start() }
    imgs.forEach(img => {
      if (img.complete) check()
      else { img.onload = check; img.onerror = check }
    })
    const tilt = tiltRef.current
    if (tilt) {
      if (tilt.readyState >= 4) check()
      else tilt.addEventListener('canplaythrough', check, { once: true })
    } else check()

    return () => {
      clearTimeout(failsafe)
      cancelAnimationFrame(rafRef.current)
    }
  }, [reducedMotion])

  // Rain loop
  useEffect(() => {
    if (reducedMotion) return
    const a = rainARef.current
    const b = rainBRef.current
    if (!a || !b) return

    let activeVideo = a
    let standbyVideo = b
    const MAX_TIME = 3.6
    const FADE = 0.75
    const CROSSFADE_POINT = MAX_TIME - FADE

    const onTimeUpdate = () => {
      if (activeVideo.currentTime >= CROSSFADE_POINT) {
        standbyVideo.currentTime = 0
        standbyVideo.play().catch(() => {})
        standbyVideo.style.opacity = '1'
        activeVideo.style.opacity = '0'

        const old = activeVideo
        setTimeout(() => old.pause(), 800)

        const temp = activeVideo
        activeVideo = standbyVideo
        standbyVideo = temp
      }
    }

    a.addEventListener('timeupdate', onTimeUpdate)
    b.addEventListener('timeupdate', onTimeUpdate)

    const startRain = setTimeout(() => {
      a.currentTime = 0
      a.play().catch(() => {})
      a.style.opacity = '1'
    }, 2400)

    return () => {
      clearTimeout(startRain)
      a.removeEventListener('timeupdate', onTimeUpdate)
      b.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    const hero = heroRef.current
    if (!hero) return

    const duration = 7400
    const els = {
      leftDoor: hero.querySelector<HTMLElement>('[data-door="left"]'),
      rightDoor: hero.querySelector<HTMLElement>('[data-door="right"]'),
      tiltVideo: hero.querySelector<HTMLElement>('[data-tilt-video]'),
      opening: hero.querySelector<HTMLElement>('[data-opening]'),
      nav: hero.querySelector<HTMLElement>('[data-nav]'),
      kicker: hero.querySelector<HTMLElement>('[data-kicker]'),
      shade: hero.querySelector<HTMLElement>('[data-shade]'),
      backLayer: hero.querySelector<HTMLElement>('[data-back-layer]'),
      midLayer: hero.querySelector<HTMLElement>('[data-mid-layer]'),
      headline: hero.querySelector<HTMLElement>('[data-headline]'),
      frontLayer: hero.querySelector<HTMLElement>('[data-front-layer]'),
    }
    const letters = hero.querySelectorAll<HTMLElement>('[data-letter]')

    const animations: Animation[] = []
    const opts: KeyframeAnimationOptions = { duration, fill: 'both' }
    const t = (s: number) => s / 7.4

    if (els.leftDoor) {
      animations.push(els.leftDoor.animate([
        { offset: 0, transform: 'translateX(0)' },
        { offset: t(0.02), transform: 'translateX(0)' },
        { offset: t(1.13), transform: 'translateX(-101%)', easing: 'cubic-bezier(.1,.2,.8,1)' },
        { offset: 1, transform: 'translateX(-101%)' },
      ], opts))
    }
    if (els.rightDoor) {
      animations.push(els.rightDoor.animate([
        { offset: 0, transform: 'translateX(0)' },
        { offset: t(0.02), transform: 'translateX(0)' },
        { offset: t(1.24), transform: 'translateX(101%)', easing: 'cubic-bezier(.4,.6,.9,1)' },
        { offset: 1, transform: 'translateX(101%)' },
      ], opts))
    }

    if (els.tiltVideo) {
      animations.push(els.tiltVideo.animate([
        { offset: 0, opacity: 0 },
        { offset: t(1.19), opacity: 0 },
        { offset: t(1.47), opacity: 1, easing: 'ease-in-out' },
        { offset: 1, opacity: 1 },
      ], opts))
    }

    if (els.opening) {
      animations.push(els.opening.animate([
        { offset: 0, opacity: 1 },
        { offset: t(2.45), opacity: 1 },
        { offset: t(2.95), opacity: 0, easing: 'cubic-bezier(.45,0,.55,1)' },
        { offset: 1, opacity: 0 },
      ], opts))
    }

    if (els.nav) {
      animations.push(els.nav.animate([
        { offset: 0, opacity: 0, transform: 'translateY(-6px)' },
        { offset: t(2.45), opacity: 0, transform: 'translateY(-6px)' },
        { offset: t(2.75), opacity: 1, transform: 'translateY(0)', easing: 'ease-out' },
        { offset: 1, opacity: 1, transform: 'translateY(0)' },
      ], opts))
    }

    if (els.kicker) {
      animations.push(els.kicker.animate([
        { offset: 0, opacity: 0, transform: 'translateY(0.5em)' },
        { offset: t(2.45), opacity: 0, transform: 'translateY(0.5em)' },
        { offset: t(3.10), opacity: 1, transform: 'translateY(0)', easing: 'cubic-bezier(.2,.65,.3,1)' },
        { offset: 1, opacity: 1, transform: 'translateY(0)' },
      ], opts))
    }

    letters.forEach((el, i) => {
      const start = 2.45 + i * 0.054
      const end = start + 0.70
      animations.push(el.animate([
        { offset: 0, opacity: 0, transform: 'translateY(0.14em)' },
        { offset: t(start), opacity: 0, transform: 'translateY(0.14em)' },
        { offset: t(end), opacity: 1, transform: 'translateY(0)', easing: 'cubic-bezier(.2,.65,.3,1)' },
        { offset: 1, opacity: 1, transform: 'translateY(0)' },
      ], opts))
    })

    if (els.shade) {
      animations.push(els.shade.animate([
        { offset: 0, opacity: 0 },
        { offset: t(2.90), opacity: 0 },
        { offset: t(3.70), opacity: 1, easing: 'ease-in-out' },
        { offset: 1, opacity: 1 },
      ], opts))
    }

    if (els.backLayer) {
      animations.push(els.backLayer.animate([
        { offset: 0, transform: 'translateY(0)' },
        { offset: t(2.90), transform: 'translateY(0)' },
        { offset: t(4.30), transform: 'translateY(-1.5%)', easing: 'cubic-bezier(.45,0,.35,1)' },
        { offset: 1, transform: 'translateY(-1.5%)' },
      ], opts))
    }

    if (els.midLayer) {
      animations.push(els.midLayer.animate([
        { offset: 0, transform: 'translateY(0)' },
        { offset: t(2.90), transform: 'translateY(0)' },
        { offset: t(4.30), transform: 'translateY(-4%)', easing: 'cubic-bezier(.45,0,.3,1)' },
        { offset: t(4.60), transform: 'translateY(-4%)' },
        { offset: t(6.90), transform: 'translateY(0)', easing: 'cubic-bezier(.45,0,.55,1)' },
        { offset: 1, transform: 'translateY(0)' },
      ], opts))
    }

    if (els.headline) {
      animations.push(els.headline.animate([
        { offset: 0, transform: 'translateY(6%)' },
        { offset: t(3.00), transform: 'translateY(6%)' },
        { offset: t(4.80), transform: 'translateY(0)', easing: 'cubic-bezier(.3,0,.4,1)' },
        { offset: 1, transform: 'translateY(0)' },
      ], opts))
    }

    if (els.frontLayer) {
      animations.push(els.frontLayer.animate([
        { offset: 0, transform: 'translateY(66%)' },
        { offset: t(3.35), transform: 'translateY(66%)' },
        { offset: t(6.00), transform: 'translateY(-2.5%)', easing: 'cubic-bezier(.2,.5,.2,1)' },
        { offset: t(7.30), transform: 'translateY(0)', easing: 'cubic-bezier(.45,0,.55,1)' },
        { offset: 1, transform: 'translateY(0)' },
      ], opts))
    }

    animations.forEach(a => a.pause())
    animationsRef.current = animations

    const tilt = tiltRef.current
    if (tilt) {
      let tiltStarted = false
      const checkTilt = () => {
        const elapsed = (performance.now() - startTimeRef.current) / 1000
        if (elapsed >= 1.25 && !tiltStarted) {
          tiltStarted = true
          tilt.playbackRate = 3.13
          tilt.play().catch(() => {})
        }
        if (elapsed >= 2.85 && tiltStarted) {
          tilt.pause()
          return
        }
        if (elapsed < 2.85) requestAnimationFrame(checkTilt)
      }
      setTimeout(() => requestAnimationFrame(checkTilt), 0)
    }

    return () => {
      animations.forEach(a => a.cancel())
    }
  }, [reducedMotion])

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .hero {
          position: relative;
          width: 100%;
          height: 100svh;
          min-height: 520px;
          overflow: hidden;
          background: #0D0A22;
          font-family: 'Inter', sans-serif;
          isolation: isolate;
        }
        .stage {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: max(100vw, 100vh * 16 / 9);
          height: calc(max(100vw, 100vh * 16 / 9) * 9 / 16);
        }
        .stage > * { position: absolute; inset: 0; }
        .layer-img { width: 100%; height: 100%; object-fit: cover; }

        .back-layer { transform-origin: 50% 40%; z-index: 1; }
        .top-shade {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(13,8,40,.45) 0%, transparent 45%);
          z-index: 2; pointer-events: none;
        }

        .headline-block {
          position: absolute; z-index: 3;
          width: 100vw;
          left: 50%; transform: translateX(-50%);
          text-align: center;
          top: 43%;
          pointer-events: none;
        }
        @media (max-aspect-ratio: 5/6) {
          .headline-block { top: 36.2%; }
        }
        .kicker {
          color: #fff; font-weight: 300;
          letter-spacing: -0.01em;
          transform: translateX(-0.1em);
        }
        .giant-word {
          color: #fff; font-weight: 700;
          letter-spacing: -0.045em;
          line-height: 1;
          font-size: clamp(80px, min(62.5cqw, 92vw), 400px);
        }
        .giant-word span { display: inline-block; }

        .mid-layer { transform-origin: 50% 45%; z-index: 4; }

        .front-layer { transform-origin: 50% 100%; z-index: 5; }
        .glass-tint {
          position: absolute;
          left: 5.2%; right: 4.1%;
          top: 57.9%; height: 25.4%;
          background: linear-gradient(to bottom,
            rgba(190,200,255,.10) 0%,
            rgba(150,160,230,.05) 60%,
            rgba(120,130,210,.08) 100%
          );
          backdrop-filter: blur(1.2px) saturate(1.05);
          border-top: 1px solid rgba(255,255,255,.18);
          z-index: 1;
        }

        .opening { z-index: 6; }
        .doors { z-index: 7; display: flex; }
        .door {
          width: 50%; height: 100%;
          background-image: url('${ASSETS.doors}');
          background-size: 200% 100%;
        }
        .door-left { background-position: 0 50%; }
        .door-right { background-position: 100% 50%; }

        .hero-nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 10;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 calc(125 * min(100vw / 1440, 100vh / 900));
          height: calc(48 * min(100vw / 1440, 100vh / 900));
          margin-top: calc(52 * min(100vw / 1440, 100vh / 900));
          font-size: calc(15 * min(100vw / 1440, 100vh / 900));
        }
        .wordmark {
          color: #fff; font-weight: 600;
          font-size: calc(17 * min(100vw / 1440, 100vh / 900));
          letter-spacing: 0.28em;
          text-decoration: none;
        }
        .pill-bar {
          position: absolute; left: 50%; transform: translateX(-50%);
          display: flex; gap: calc(6 * min(100vw / 1440, 100vh / 900));
          padding: calc(5 * min(100vw / 1440, 100vh / 900));
          border-radius: 999px;
          background: rgba(255,255,255,.14);
          backdrop-filter: blur(12px);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.12);
        }
        .pill-link {
          height: calc(38 * min(100vw / 1440, 100vh / 900));
          padding: 0 calc(22 * min(100vw / 1440, 100vh / 900));
          border-radius: 999px;
          display: flex; align-items: center;
          color: rgba(255,255,255,.88);
          text-decoration: none;
          font-weight: 400;
          transition: background .25s;
        }
        .pill-link:hover { background: rgba(255,255,255,.14); }
        .pill-link.active {
          background: #fff; color: #180F3C; font-weight: 600;
        }
        .nav-right {
          display: flex; align-items: center;
          gap: calc(30 * min(100vw / 1440, 100vh / 900));
        }
        .lang {
          display: flex; align-items: center;
          gap: calc(9 * min(100vw / 1440, 100vh / 900));
          color: rgba(255,255,255,.9);
        }
        .lang svg { stroke: currentColor; fill: none; }
        .enquire-btn {
          height: calc(44 * min(100vw / 1440, 100vh / 900));
          padding: 0 calc(27 * min(100vw / 1440, 100vh / 900));
          border-radius: 999px;
          background: #F2B8C0; color: #180F3C;
          font-weight: 600; border: none; cursor: pointer;
          font-family: inherit; font-size: inherit;
          transition: background .2s, transform .2s;
        }
        .enquire-btn:hover { background: #F7C9D0; transform: translateY(-1px); }

        .rain-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
          opacity: 0; transition: opacity 0.7s linear;
        }

        .hero.intro .hero-nav { opacity: 0; }
        .hero.intro [data-kicker] { opacity: 0; }
        .hero.intro [data-letter] { opacity: 0; }
        .hero.intro [data-front-layer] { transform: translateY(66%); }

        @media (max-width: 819px) {
          .hero-nav {
            flex-wrap: wrap;
            padding: 16px 18px;
            margin-top: 0; height: auto;
            font-size: 13px; gap: 12px;
          }
          .wordmark { font-size: 14px !important; letter-spacing: 0.22em; }
          .pill-bar {
            position: relative; left: auto; transform: none;
            width: 100%; order: 3;
            height: 40px; padding: 4px;
          }
          .pill-link {
            height: 32px !important;
            padding: 0 10px !important;
            font-size: 12px; flex: 1;
            justify-content: center;
          }
          .enquire-btn {
            height: 36px !important;
            padding: 0 16px !important;
            font-size: 13px;
          }
          .nav-right { gap: 12px; }
        }
        @media (max-width: 360px) {
          .pill-link { font-size: 11px; padding: 0 6px !important; }
        }
        @media (max-height: 500px) and (orientation: landscape) {
          .hero-nav {
            flex-wrap: nowrap;
            margin-top: 12px; height: 34px;
            padding: 0 24px; font-size: 12px;
          }
          .wordmark { font-size: 13px !important; }
          .pill-bar { height: 34px; }
          .pill-link { height: 28px !important; }
          .enquire-btn { height: 32px !important; }
        }
      `}</style>

      <div ref={heroRef} className={`hero ${introClass ? 'intro' : ''}`}>
        <div className="stage">
          {/* Back layer */}
          <div className="back-layer" data-back-layer>
            <img src={ASSETS.back} className="layer-img" alt="" data-preload />
            <video ref={rainARef} className="rain-video" src={ASSETS.rainVideo} muted playsInline preload="auto" />
            <video ref={rainBRef} className="rain-video" src={ASSETS.rainVideo} muted playsInline preload="auto" />
            <div className="top-shade" data-shade />
          </div>

          {/* Headline block */}
          <div className="headline-block" data-headline>
            <div className="kicker" data-kicker style={{ fontSize: 'calc(clamp(80px, min(62.5cqw, 92vw), 400px) * 0.118)' }}>
              Claim Your
            </div>
            <h1 className="giant-word" aria-label="Claim Your Summit">
              {LETTERS.map((letter, i) => (
                <span key={i} data-letter>{letter}</span>
              ))}
            </h1>
          </div>

          {/* Mid layer */}
          <div className="mid-layer" data-mid-layer>
            <img src={ASSETS.mid} className="layer-img" alt="" data-preload />
          </div>

          {/* Front layer */}
          <div className="front-layer" data-front-layer>
            <div className="glass-tint" />
            <img src={ASSETS.front} className="layer-img" alt="" data-preload style={{ position: 'relative', zIndex: 2 }} />
          </div>
        </div>

        {/* Opening Box */}
        <div className="opening" data-opening style={{ position: 'absolute', inset: 0, zIndex: 6 }}>
          <img src={ASSETS.aerial} className="layer-img" alt="" data-preload style={{ position: 'absolute', inset: 0 }} />
          <video
            ref={tiltRef}
            data-tilt-video
            src={ASSETS.tiltVideo}
            muted playsInline preload="auto"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0 }}
          />
        </div>

        {/* Doors Box */}
        <div className="doors" style={{ position: 'absolute', inset: 0, zIndex: 7, display: introClass ? 'flex' : 'none' }}>
          <div className="door door-left" data-door="left" />
          <div className="door door-right" data-door="right" />
        </div>

        {/* Nav */}
        <nav className="hero-nav" data-nav>
          <a href="/" className="wordmark">CINEMATCH</a>
          <div className="pill-bar">
            <a href="/" className="pill-link active">Home</a>
            <a href="/chat" className="pill-link">AI Chat</a>
            <a href="/chat" className="pill-link">Discover</a>
            <a href="/auth" className="pill-link">Account</a>
          </div>
          <div className="nav-right">
            <span className="lang">
              <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
              </svg>
              Eng
            </span>
            <a href="/auth"><button className="enquire-btn">Sign In</button></a>
          </div>
        </nav>
      </div>
    </>
  )
}
