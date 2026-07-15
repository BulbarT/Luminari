import { useState } from 'react'
import AuthScreen from './components/AuthScreen'
import MainScreen from './components/MainScreen'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({ name: '', role: '', profilePic: null })

  const handleLogin = (name, role, profilePic = null) => {
    setUser({ name, role, profilePic })
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
            <AuthScreen onLogin={handleLogin} />
          ) : (
            <MainScreen user={user} onLogout={handleLogout} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
