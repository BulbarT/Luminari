import { useState, useRef } from 'react'

const Logo = () => (
  <img src="/Logo.svg" alt="Luminari Logo" style={{ display: 'block', margin: '0 auto 20px', width: '80px', height: '80px' }} />
);

export default function AuthScreen({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true)

  // Registration steps: 0 = Auth, 1 = Transition, 2 = Role, 3 = Details
  const [regStep, setRegStep] = useState(0)

  // Form state
  const [role, setRole] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [nickname, setNickname] = useState('')
  const [profilePic, setProfilePic] = useState(null) // Can be a data URL or hex color

  // Photo selection menu state
  const [showPhotoMenu, setShowPhotoMenu] = useState(false)
  const fileInputRef = useRef(null)

  const handleInitialSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      // Direct login bypasses wizard
      onLogin('Пользователь', 'Ученик', null)
    } else {
      // Start registration wizard transition
      setRegStep(1)
      setTimeout(() => {
        setRegStep(2)
      }, 2000)
    }
  }

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole)
  }

  const handleRoleNext = () => {
    if (role) {
      setRegStep(3)
    }
  }

  const handleFinalSubmit = (e) => {
    e.preventDefault()
    onLogin(name || nickname, role, profilePic)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setProfilePic(url)
      setShowPhotoMenu(false)
    }
  }

  const predefinedColors = ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#3742fa', '#ff6348']

  // Render Transition
  if (regStep === 1) {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        background: 'var(--primary-blue)', zIndex: 1000, overflow: 'hidden',
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <style>{`
          @keyframes scrollText {
            0% { transform: translateY(-100px); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
        `}</style>
        {[...Array(15)].map((_, i) => (
          <h1 key={i} style={{
            fontSize: '36px', color: 'rgba(255,255,255,0.3)', margin: '15px 0',
            animation: `scrollText 3s linear ${i * 0.15}s infinite`
          }}>
            Добро пожаловать
          </h1>
        ))}
      </div>
    )
  }

  // Render Role Selection (Step 2)
  if (regStep === 2) {
    return (
      <div className="fade-in" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '30px', textAlign: 'center' }}>Кто вы?</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', flex: 1 }}>
          {['Ученик начальных классов', 'Ученик средней школы', 'Студент', 'Взрослый / Для себя'].map(r => (
            <div
              key={r}
              onClick={() => handleRoleSelect(r)}
              className="glass-panel"
              style={{
                padding: '20px', textAlign: 'center', cursor: 'pointer',
                border: role === r ? '2px solid var(--primary-cyan)' : '1px solid var(--border-glass)',
                background: role === r ? 'rgba(0, 229, 255, 0.1)' : 'var(--bg-glass)',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: '18px', fontWeight: '500' }}>{r}</span>
            </div>
          ))}
        </div>
        <button className="btn-primary" onClick={handleRoleNext} disabled={!role} style={{ marginTop: '20px', opacity: role ? 1 : 0.5, transition: 'opacity 0.3s' }}>
          Далее
        </button>
      </div>
    )
  }

  // Render Details & Photo Selection (Step 3)
  if (regStep === 3) {
    return (
      <div className="fade-in" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
        <h2 style={{ fontSize: '26px', marginBottom: '20px', textAlign: 'center' }}>Ваш профиль</h2>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <div
            onClick={() => setShowPhotoMenu(true)}
            style={{
              width: '100px', height: '100px', borderRadius: '50%', backgroundColor: profilePic && profilePic.startsWith('#') ? profilePic : '#2a3a5c',
              backgroundImage: profilePic && profilePic.startsWith('blob') ? `url(${profilePic})` : 'none',
              backgroundSize: 'cover', backgroundPosition: 'center',
              border: '2px dashed var(--primary-cyan)', display: 'flex', justifyContent: 'center', alignItems: 'center',
              cursor: 'pointer', position: 'relative', overflow: 'hidden'
            }}
          >
            {!profilePic && (
              <span style={{ fontSize: '36px', opacity: 0.5 }}>+</span>
            )}
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              background: 'rgba(0,0,0,0.5)', opacity: 0, transition: 'opacity 0.2s',
              display: 'flex', justifyContent: 'center', alignItems: 'center'
            }} onMouseOver={e => e.currentTarget.style.opacity = 1} onMouseOut={e => e.currentTarget.style.opacity = 0}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Изменить</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleFinalSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="input-group">
            <label>Имя</label>
            <input type="text" className="input-glass" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Фамилия</label>
            <input type="text" className="input-glass" value={surname} onChange={e => setSurname(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Никнейм</label>
            <input type="text" className="input-glass" value={nickname} onChange={e => setNickname(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: 'auto' }}>Завершить</button>
        </form>

        {/* Full-screen Photo Menu */}
        {showPhotoMenu && (
          <div className="fade-in" style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'var(--bg-dark)', zIndex: 100, padding: '40px 20px',
            display: 'flex', flexDirection: 'column'
          }}>
            <h3 style={{ fontSize: '22px', marginBottom: '30px', textAlign: 'center' }}>Выберите аватар</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
              {/* Native file upload button */}
              <div
                onClick={() => fileInputRef.current.click()}
                className="glass-panel"
                style={{ aspectRatio: '1/1', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', flexDirection: 'column' }}
              >
                <span style={{ fontSize: '32px', marginBottom: '5px' }}>+</span>
                <span style={{ fontSize: '12px', textAlign: 'center' }}>Галерея</span>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileSelect} style={{ display: 'none' }} />
              </div>

              {/* Predefined colors */}
              {predefinedColors.map(color => (
                <div
                  key={color}
                  onClick={() => { setProfilePic(color); setShowPhotoMenu(false) }}
                  style={{ aspectRatio: '1/1', backgroundColor: color, borderRadius: '16px', cursor: 'pointer', border: '2px solid rgba(255,255,255,0.2)' }}
                />
              ))}
            </div>

            <button className="btn-primary" onClick={() => setShowPhotoMenu(false)} style={{ marginTop: 'auto', background: 'rgba(255,255,255,0.1)' }}>
              Отмена
            </button>
          </div>
        )}
      </div>
    )
  }

  // Render Auth Form (Step 0)
  return (
    <div style={{ padding: '60px 30px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px', position: 'relative' }}>
        <div onClick={() => onLogin('Тест', 'Студент', null)} style={{ position: 'absolute', top: '-40px', right: '0', cursor: 'pointer', fontSize: '24px', opacity: 0.5 }} title="Пропустить">➔</div>
        <Logo />
        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Luminári</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Pomóżmy uczniom naprawdę zrozumieć!</p>
      </div>

      <div style={{
        display: 'flex',
        marginBottom: '30px',
        background: 'var(--bg-glass)',
        borderRadius: '12px',
        padding: '4px',
        border: '1px solid var(--border-glass)'
      }}>
        <button
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '10px',
            background: isLogin ? 'var(--gradient-btn)' : 'transparent',
            color: isLogin ? 'white' : 'var(--text-muted)'
          }}
          onClick={() => setIsLogin(true)}
        >
          Вход
        </button>
        <button
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '10px',
            background: !isLogin ? 'var(--gradient-btn)' : 'transparent',
            color: !isLogin ? 'white' : 'var(--text-muted)'
          }}
          onClick={() => setIsLogin(false)}
        >
          Регистрация
        </button>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <form onSubmit={handleInitialSubmit} style={{
          position: 'absolute',
          width: '100%',
          transition: 'all 0.4s ease',
          opacity: isLogin ? 1 : 0,
          pointerEvents: isLogin ? 'all' : 'none',
          transform: isLogin ? 'translateX(0)' : 'translateX(-20px)'
        }}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" className="input-glass" placeholder="example@mail.com" required={isLogin} />
          </div>
          <div className="input-group">
            <label>Пароль</label>
            <input type="password" className="input-glass" placeholder="••••••••" required={isLogin} />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '20px' }}>Войти</button>
        </form>

        <form onSubmit={handleInitialSubmit} style={{
          position: 'absolute',
          width: '100%',
          transition: 'all 0.4s ease',
          opacity: !isLogin ? 1 : 0,
          pointerEvents: !isLogin ? 'all' : 'none',
          transform: !isLogin ? 'translateX(0)' : 'translateX(20px)'
        }}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" className="input-glass" placeholder="example@mail.com" required={!isLogin} />
          </div>
          <div className="input-group">
            <label>Пароль</label>
            <input type="password" className="input-glass" placeholder="••••••••" required={!isLogin} />
          </div>
          <div className="input-group">
            <label>Повторите пароль</label>
            <input type="password" className="input-glass" placeholder="••••••••" required={!isLogin} />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '20px' }}>Создать аккаунт</button>
        </form>
      </div>
    </div>
  )
}
