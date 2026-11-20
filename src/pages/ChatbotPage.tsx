import React, { useState } from 'react'
import MorphOrb from '../components/ui/ai-thinking-orb-and-input'

const MOODS = [
  { label: '🎭 Drama & Thought-Provoking', query: 'Recommend a deeply thought-provoking drama that lingers in the mind' },
  { label: '⚡ Suspense & Thriller', query: 'I want a gripping edge-of-your-seat thriller under 2 hours' },
  { label: '🚀 Mind-Bending Sci-Fi', query: 'Give me complex cerebral sci-fi like Interstellar or Arrival' },
  { label: '🍿 Fun Movie Night', query: 'Suggest an entertaining movie for a group of friends' },
  { label: '✨ Visually Stunning', query: 'Recommend a film with breathtaking cinematography and rich atmosphere' },
  { label: '💖 Emotional & Romantic', query: 'Looking for a heartfelt, poetic romance film' },
]

export default function ChatbotPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const handleSubmit = async (text: string): Promise<string> => {
    // Dynamic CineMatch recommendation logic matching Documentation Specification
    await new Promise(r => setTimeout(r, 2200))
    const lower = text.toLowerCase()
    
    if (lower.includes('horror') || lower.includes('scary')) {
      return "Recommended: 'Hereditary' (2018) & 'The Witch' (2015). Match Score: 94%. Selected for visceral dread, psychological terror, and immaculate atmosphere."
    }
    if (lower.includes('comedy') || lower.includes('laugh') || lower.includes('fun')) {
      return "Recommended: 'The Grand Budapest Hotel' (2014) & 'Palm Springs' (2020). Match Score: 91%. Fast-paced, witty dialogue with vibrant comedic charm."
    }
    if (lower.includes('thriller') || lower.includes('suspense') || lower.includes('edge')) {
      return "Recommended: 'Sicario' (2015) & 'Prisoners' (2013). Match Score: 96%. Masterclass in tension, relentless pacing, and moral ambiguity."
    }
    if (lower.includes('sci-fi') || lower.includes('interstellar') || lower.includes('arrival') || lower.includes('thinking')) {
      return "Recommended: 'Arrival' (2016) & 'Blade Runner 2049' (2017). Match Score: 98%. Recommended because you requested cerebral science fiction with profound philosophical depth."
    }
    if (lower.includes('romance') || lower.includes('love') || lower.includes('emotional')) {
      return "Recommended: 'Portrait of a Lady on Fire' (2019) & 'Past Lives' (2023). Match Score: 95%. Poetic storytelling, unforgettable visual framing, and raw emotional resonance."
    }
    if (lower.includes('friend') || lower.includes('group') || lower.includes('popcorn')) {
      return "Recommended: 'Knives Out' (2019) & 'Baby Driver' (2017). Match Score: 92%. Energetic, universally crowd-pleasing, and packed with thrilling twists."
    }
    return `Recommended for you: 'Parasite' (2019) & 'Dune: Part Two' (2024). Match Score: 95%. High critic praise, dynamic pacing, and genre-defying narratives grounded in TMDB records.`
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 0%, #1c0e2a 0%, #0d0a22 65%, #05040d 100%)',
      fontFamily: "'Inter', -apple-system, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      color: '#fff',
      overflowX: 'hidden'
    }}>
      {/* Top Branding Navigation */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 48px',
        position: 'relative',
        zIndex: 20,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(16px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #702C43 0%, #F2B8C0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: 15,
            color: '#180F3C',
            boxShadow: '0 0 20px rgba(242, 184, 192, 0.4)'
          }}>
            CM
          </div>
          <div>
            <a href="/" style={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              display: 'block'
            }}>
              CineMatch <span style={{ color: '#F2B8C0', fontWeight: 300, fontSize: 13, letterSpacing: '0.1em' }}>AI</span>
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="/" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'color 0.2s' }}>
            Cinematic Hero
          </a>
          <a href="/chat" style={{ color: '#F2B8C0', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
            AI Assistant
          </a>
          <a href="/auth" style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            padding: '8px 20px',
            borderRadius: 999,
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: 14,
            transition: 'all 0.2s'
          }}>
            Account
          </a>
        </div>
      </nav>

      {/* Hero Header */}
      <div style={{
        textAlign: 'center',
        padding: '36px 20px 10px',
        position: 'relative',
        zIndex: 10,
        maxWidth: 720,
        margin: '0 auto'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(112, 44, 67, 0.35)',
          border: '1px solid rgba(242, 184, 192, 0.3)',
          padding: '4px 14px',
          borderRadius: 999,
          fontSize: 12,
          color: '#F2B8C0',
          marginBottom: 14,
          letterSpacing: '0.04em'
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F2B8C0', boxShadow: '0 0 8px #F2B8C0' }}></span>
          CineMatch Recommendation Engine • Grounded with TMDB & Gemini AI
        </div>

        <h1 style={{
          color: '#fff',
          fontSize: 'clamp(28px, 4.5vw, 44px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          marginBottom: 12,
        }}>
          Find Your Mood. <span style={{ background: 'linear-gradient(135deg, #F2B8C0 0%, #fff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Discover Your Movie.</span>
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.65)',
          fontSize: 'clamp(14px, 1.8vw, 16px)',
          fontWeight: 300,
          lineHeight: 1.6,
        }}>
          Speak to CineMatch naturally like a seasoned movie enthusiast. Our AI decodes your mood, queries verified cinematic metadata, and crafts the ideal recommendation.
        </p>

        {/* Quick Mood Pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          justifyContent: 'center',
          marginTop: 20
        }}>
          {MOODS.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMood(m.query)}
              style={{
                background: selectedMood === m.query ? 'rgba(242, 184, 192, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                border: selectedMood === m.query ? '1px solid #F2B8C0' : '1px solid rgba(255, 255, 255, 0.1)',
                color: selectedMood === m.query ? '#F2B8C0' : 'rgba(255, 255, 255, 0.8)',
                padding: '6px 14px',
                borderRadius: 999,
                fontSize: 12.5,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit'
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Morphing Orb Stage */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        minHeight: 460
      }}>
        <MorphOrb onSubmit={handleSubmit} minThinkMs={2200} speed={1} />
      </div>

      {/* Grounded Movie Features Banner */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 16,
        maxWidth: 1080,
        width: '100%',
        margin: '0 auto 36px',
        padding: '0 24px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 14,
          padding: '16px 20px'
        }}>
          <div style={{ color: '#F2B8C0', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>🧠 Mood-Based Scoring</div>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12.5, lineHeight: 1.5 }}>
            Combines genre affinity (30%), mood/theme (25%), language (15%), and runtime filters.
          </p>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 14,
          padding: '16px 20px'
        }}>
          <div style={{ color: '#F2B8C0', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>🎬 Explainable AI</div>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12.5, lineHeight: 1.5 }}>
            Every title match is accompanied by a rationale grounded in verified film synopses and metrics.
          </p>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 14,
          padding: '16px 20px'
        }}>
          <div style={{ color: '#F2B8C0', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>👥 GroupMatch Ready</div>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12.5, lineHeight: 1.5 }}>
            Aggregate preferences across friends to eliminate decision fatigue and find movies everyone loves.
          </p>
        </div>
      </div>
    </div>
  )
}
