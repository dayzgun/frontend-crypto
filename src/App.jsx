import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './components/Register'
import VerifyCode from './components/VerifyCode'
import VerifyCodeReset from './pages/VerifyCodeReset'
import Dashboard from './pages/Dashboard'
import CuriosityPage from './pages/CuriosityPage'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/verify-code-reset" element={<VerifyCodeReset />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/curiosidad/:id" element={<CuriosityPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}
