import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeroPage from './pages/HeroPage'
import ChatbotPage from './pages/ChatbotPage'
import AuthPage from './pages/AuthPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/chat" element={<ChatbotPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  )
}
