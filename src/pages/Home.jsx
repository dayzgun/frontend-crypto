// src/pages/Home.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import SHA256 from 'crypto-js/sha256'
import {
  Form,
  Button,
  Alert,
  Card,
  InputGroup,
} from 'react-bootstrap'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function Home() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [message, setMessage] = useState(null)
  const [variant, setVariant] = useState('info')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!form.username || !form.password) {
      setVariant('danger')
      setMessage('❌ Debes ingresar usuario y contraseña')
      return
    }

    try {
      const hashed = SHA256(form.password).toString()

      const res = await axios.post(
        'https://crypto-backend-production-56d2.up.railway.app/login',
        {
          username: form.username,
          password_hash: hashed,
        }
      )

      setVariant('success')
      setMessage('✅ Inicio de sesión exitoso')
      setTimeout(() => navigate('/dashboard'), 500) // Redirige al dashboard
    } catch (err) {
      setVariant('danger')
      setMessage(
        '❌ ' +
          (err.response?.data?.error || 'Error al iniciar sesión')
      )
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vw-100 min-vh-100 text-white"
      style={{ backgroundColor: '#121212' }}
    >
      <Card
        className="p-4 shadow-lg"
        style={{
          maxWidth: '360px',
          width: '90%',
          borderRadius: '1.5rem',
          backgroundColor: '#1e1e2f',
        }}
      >
        <div className="text-center mb-3">
          <img
            src="/logo.png"
            alt="Crypto Logo"
            style={{ width: '80px', marginBottom: '0.5rem' }}
          />
          <h2 className="fw-bold text-white" style={{ fontSize: '1.5rem' }}>
            Iniciar sesión
          </h2>
        </div>

        {message && <Alert variant={variant}>{message}</Alert>}

        <Form onSubmit={handleSubmit} autoComplete="off">
          <Form.Group className="mb-2">
            <Form.Label className="text-white">Usuario</Form.Label>
            <Form.Control
              name="username"
              placeholder="Tu usuario"
              onChange={handleChange}
              required
              size="sm"
              autoComplete="off"
              className="bg-transparent border-light text-white"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Contraseña</Form.Label>
            <InputGroup size="sm">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="bg-transparent border-light text-white"
              />
              <InputGroup.Text
                onClick={() => setShowPassword(v => !v)}
                style={{ cursor: 'pointer' }}
                className="bg-transparent border-light text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <div className="d-grid mb-2">
            <Button
              type="submit"
              variant="light"
              className="fw-bold text-dark"
            >
              Entrar
            </Button>
          </div>

          <div className="text-center">
            <span className="text-white me-1">¿No tienes cuenta?</span>
            <Link to="/register" className="fw-bold" style={{ color: '#646cff' }}>
              Regístrate
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  )
}
