  import { useState } from 'react'
  import axios from 'axios'
  import { useNavigate } from 'react-router-dom'
  import { Form, Button, Alert, Card } from 'react-bootstrap'

  export default function ForgotPassword() {
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState(null)
    const [variant, setVariant] = useState('info')
    const navigate = useNavigate()

    const handleSubmit = async e => {
      e.preventDefault()
      try {
        const res = await axios.post(
          'https://crypto-backend-production-56d2.up.railway.app/forgot-password',
          { username }
        )
        setVariant('success')
        setMessage('✅ Se enviaron instrucciones al correo registrado.')
        setTimeout(() => {
          navigate('/verify-code-reset', { state: { username } })

        }, 1500)
      } catch (err) {
        setVariant('danger')
        setMessage('❌ ' + (err.response?.data?.error || 'Error al enviar instrucciones'))
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
              style={{ width: '60px', marginBottom: '0.75rem' }}
            />
            <h2 className="fw-bold text-white" style={{ fontSize: '1.3rem' }}>
              Recuperar contraseña
            </h2>
            <p style={{ fontSize: '0.9rem' }}>Ingresa tu nombre de usuario</p>
          </div>

          {message && <Alert variant={variant}>{message}</Alert>}

          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Tu nombre de usuario"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete="off"
                size="sm"
                className="bg-transparent border-light text-white"
              />
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" variant="light" className="fw-bold text-dark">
                Enviar instrucciones
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    )
  }
