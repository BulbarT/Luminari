import { useState } from 'react'

const HomeTab = ({ user, onLogout }) => {
  return (
    <div className="fade-in" style={{ padding: '30px 20px', paddingBottom: '100px', overflowY: 'auto', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#2a3a5c' }}></div>
          <h2 style={{ fontSize: '22px', fontWeight: '600' }}>Cześć, {user.name}!</h2>
        </div>
        <div onClick={onLogout} style={{ cursor: 'pointer', opacity: 0.7 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </div>
      </div>

      {/* Progress Section */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Progres</h3>
        <div style={{ height: '6px', background: 'var(--bg-glass)', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
          <div style={{ width: '44%', height: '100%', background: 'var(--primary-cyan)', borderRadius: '10px' }}></div>
        </div>
        <button className="btn-primary" style={{ padding: '12px 24px', width: 'auto', display: 'inline-block', borderRadius: '20px' }}>
          Kontynuuj naukę
        </button>
      </div>

      {/* Stats Blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
        <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img src="/FireStreak.svg" alt="streak" style={{ width: '28px', height: '28px', flexShrink: 0 }} />
          <span style={{ fontSize: '18px', fontWeight: '600' }}>10 <span style={{ fontSize: '14px', fontWeight: '400', color: 'var(--text-muted)' }}>dni z rzędu</span></span>
        </div>
        <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img src="/Stars.svg" alt="stars" style={{ width: '28px', height: '28px', flexShrink: 0 }} />
          <span style={{ fontSize: '18px', fontWeight: '600' }}>15 <span style={{ fontSize: '14px', fontWeight: '400', color: 'var(--text-muted)' }}>tematów ukończono</span></span>
        </div>
      </div>

      {/* Recently Viewed */}
      <div>
        <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>Ostatnio przeglądane:</h3>
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' }}>
          <div className="glass-panel" style={{ padding: '20px', minWidth: '200px', flexShrink: 0 }}>
            <h4 style={{ fontSize: '18px', marginBottom: '4px' }}>Granica funkcji</h4>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>границя функції</p>
            <div style={{ marginTop: '40px' }}></div>
          </div>
          <div className="glass-panel" style={{ padding: '20px', minWidth: '100px', flexShrink: 0, opacity: 0.5 }}>
          </div>
        </div>
        <button className="btn-primary" style={{ marginTop: '10px', padding: '12px 24px', width: 'auto', display: 'inline-block', borderRadius: '20px', background: '#0088ff' }}>
          Zobacz wszystko
        </button>
      </div>
    </div>
  )
}

const DictionaryTab = () => (
  <div className="fade-in" style={{ padding: '30px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    <img src="/Notes.svg" alt="dictionary" style={{ width: '60px', height: '60px', marginBottom: '20px', opacity: 0.7 }} />
    <h2 style={{ marginBottom: '10px' }}>Słownik</h2>
    <p style={{ color: 'var(--text-muted)' }}>(Словарь в разработке)</p>
  </div>
)

export default function MainScreen({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      
      <div style={{ height: '100%' }}>
        {activeTab === 'home' && <HomeTab user={user} onLogout={onLogout} />}
        {activeTab === 'dictionary' && <DictionaryTab />}
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '80px',
        background: 'rgba(15, 22, 36, 0.95)',
        backdropFilter: 'blur(15px)',
        borderTop: '1px solid var(--border-glass)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0 20px',
        borderBottomLeftRadius: '40px',
        borderBottomRightRadius: '40px'
      }}>
        <button
          onClick={() => setActiveTab('home')}
          style={{
            background: 'transparent',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            opacity: activeTab === 'home' ? 1 : 0.4,
            transition: 'opacity 0.2s ease'
          }}
        >
          <img src="/House.svg" alt="home" style={{ width: '28px', height: '28px', filter: activeTab === 'home' ? 'invert(60%) sepia(90%) saturate(500%) hue-rotate(160deg)' : 'invert(1)' }} />
        </button>

        <button
          onClick={() => setActiveTab('dictionary')}
          style={{
            background: 'transparent',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            opacity: activeTab === 'dictionary' ? 1 : 0.4,
            transition: 'opacity 0.2s ease'
          }}
        >
          <img src="/Notes.svg" alt="dictionary" style={{ width: '28px', height: '28px', filter: activeTab === 'dictionary' ? 'invert(60%) sepia(90%) saturate(500%) hue-rotate(160deg)' : 'invert(1)' }} />
        </button>

        <button
          onClick={() => setActiveTab('lectures')}
          style={{
            background: 'transparent',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            opacity: activeTab === 'lectures' ? 1 : 0.4,
            transition: 'opacity 0.2s ease'
          }}
        >
          <img src="/Lectures.svg" alt="lectures" style={{ width: '28px', height: '28px', filter: activeTab === 'lectures' ? 'invert(60%) sepia(90%) saturate(500%) hue-rotate(160deg)' : 'invert(1)' }} />
        </button>
      </div>
    </div>
  )
}
