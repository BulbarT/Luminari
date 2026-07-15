import { useState } from 'react'
import AuthScreen from './components/AuthScreen'
import MainScreen from './components/MainScreen'
import { translations, detectLanguage } from './AllLanguages'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({ name: '', nickname: '', role: '', profilePic: null })
  const [language, setLanguage] = useState(detectLanguage())
  const t = translations[language]

  const handleLogin = (name, nickname, role, profilePic = null) => {
    setUser({ name, nickname, role, profilePic })
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <div className="desktop-wrapper">
      <div className="phone-frame">
        <div className="phone-viewport">
          {!isAuthenticated ? (
            <AuthScreen onLogin={handleLogin} t={t} language={language} setLanguage={setLanguage} />
          ) : (
            <MainScreen user={user} onLogout={handleLogout} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
