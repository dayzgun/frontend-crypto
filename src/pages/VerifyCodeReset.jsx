import { useState } from 'react'
import axios from 'axios'
import { Form, Button, Alert, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function VerifyCodeReset() {
  const [username, setUsername] = useState('')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState(null)
  const [variant, setVariant] = useState('info')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      // 📨 Enviamos usuario + código de verificación al backend
      const res = await axios.post(
        'https://crypto-backend-production-56d2.up.railway.app/verify-reset-code',
        { username, code }
      )

      // ✅ Éxito: redirigir al formulario para establecer nueva contraseña
      setVariant('success')
      setMessage('✅ Código válido. Redirigiendo...')
      setTimeout(() => {
        navigate('/reset-password', { state: { username } })
      }, 1000)
    } catch (err) {
      setVariant('danger')
      setMessage(
        '❌ ' + (err.response?.data?.error || 'Código inválido o expirado')
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
          maxWidth: '380px',
          width: '90%',
          borderRadius: '1.5rem',
          backgroundColor: '#1e1e2f',
        }}
      >
        <div className="text-center mb-3">
          <img
            src="/logo.png"
            alt="Crypto Logo"
            style={{ width: '60px', marginBottom: '0.75rem' }}
          />
          <h2 className="fw-bold text-white" style={{ fontSize: '1.3rem' }}>
            Verificar código
          </h2>
          <p style={{ fontSize: '0.9rem' }}>
            Ingresa tu usuario y el código que recibiste
          </p>
        </div>

        {/* 🟡 Mensaje de error o éxito */}
        {message && <Alert variant={variant}>{message}</Alert>}

        <Form onSubmit={handleSubmit} autoComplete="off">
          <Form.Group className="mb-2">
            <Form.Label className="text-white">Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tu usuario"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              size="sm"
              autoComplete="off"
              className="bg-transparent border-light text-white"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Código de verificación</Form.Label>
            <Form.Control
              type="text"
              placeholder="123456"
              value={code}
              onChange={e => setCode(e.target.value)}
              required
              size="sm"
              autoComplete="off"
              className="bg-transparent border-light text-white"
            />
          </Form.Group>

          <div className="d-grid">
            <Button
              type="submit"
              variant="light"
              className="fw-bold text-dark"
            >
              Verificar
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}
