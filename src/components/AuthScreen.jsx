import { useState } from 'react'

const Logo = () => (
  <img src="/Logo.svg" alt="Luminari Logo" style={{ display: 'block', margin: '0 auto 20px', width: '80px', height: '80px' }} />
);

export default function AuthScreen({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(name, role)
  }

  return (
    <div style={{ padding: '60px 30px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px', position: 'relative' }}>
        <div onClick={() => onLogin('Тест', 'Студент')} style={{position: 'absolute', top: '-40px', right: '0', cursor: 'pointer', fontSize: '24px', opacity: 0.5}} title="Пропустить">➔</div>
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
        <form onSubmit={handleSubmit} style={{
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

        <form onSubmit={handleSubmit} style={{
          position: 'absolute',
          width: '100%',
          transition: 'all 0.4s ease',
          opacity: !isLogin ? 1 : 0,
          pointerEvents: !isLogin ? 'all' : 'none',
          transform: !isLogin ? 'translateX(0)' : 'translateX(20px)'
        }}>
          <div className="input-group">
            <label>Имя</label>
            <input type="text" className="input-glass" placeholder="Ваше имя" value={name} onChange={e => setName(e.target.value)} required={!isLogin} />
          </div>
          <div className="input-group">
            <label>Кто вы?</label>
            <div className="custom-select-wrapper">
              <select value={role} onChange={e => setRole(e.target.value)} required={!isLogin}>
                <option value="" disabled>Выберите роль</option>
                <option value="Ученик начальных классов">Ученик начальных классов</option>
                <option value="Ученик средней школы">Ученик средней школы</option>
                <option value="Студент">Студент</option>
                <option value="Просто подтянуть предмет">Просто подтянуть предмет</option>
              </select>
            </div>
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" className="input-glass" placeholder="example@mail.com" required={!isLogin} />
          </div>
          <div className="input-group">
            <label>Пароль</label>
            <input type="password" className="input-glass" placeholder="••••••••" required={!isLogin} />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '20px' }}>Создать аккаунт</button>
        </form>
      </div>
    </div>
  )
}
