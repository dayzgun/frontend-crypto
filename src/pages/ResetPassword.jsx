// src/components/ResetPassword.jsx
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import SHA256 from 'crypto-js/sha256'
import { Form, Button, Alert, Card, Row, Col, InputGroup } from 'react-bootstrap'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const SPECIAL_CHARS = '!@#$%^&*(),.?":{}|<>'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState(null)
  const [variant, setVariant] = useState('info')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const username = location.state?.username  // ← se pasó desde VerifyCodeReset

  const handleSubmit = async e => {
    e.preventDefault()

    if (password.length < 10) {
      setVariant('danger')
      setMessage('❌ La contraseña debe tener al menos 10 caracteres')
      return
    }
    if (!/[A-Z]/.test(password)) {
      setVariant('danger')
      setMessage('❌ Debe incluir una letra mayúscula')
      return
    }
    if (!/[a-z]/.test(password)) {
      setVariant('danger')
      setMessage('❌ Debe incluir una letra minúscula')
      return
    }
    if (!/[0-9]/.test(password)) {
      setVariant('danger')
      setMessage('❌ Debe incluir un número')
      return
    }
    const esc = SPECIAL_CHARS.replace(/[\]\-\\]/g, '\\$&')
    if (!(new RegExp(`[${esc}]`)).test(password)) {
      setVariant('danger')
      setMessage(`❌ Debe incluir uno de estos: ${SPECIAL_CHARS}`)
      return
    }
    if (/(.)\1\1/.test(password)) {
      setVariant('danger')
      setMessage('❌ No puede haber 3 caracteres iguales seguidos')
      return
    }
    if (password !== confirm) {
      setVariant('danger')
      setMessage('❌ Las contraseñas no coinciden')
      return
    }

    try {
      const hash = SHA256(password).toString()

      const res = await axios.post(
        'https://crypto-backend-production-56d2.up.railway.app/reset-password',
        { username, password_hash: hash }
      )

      setVariant('success')
      setMessage('✅ ' + res.data.msg)
      setTimeout(() => navigate('/'), 1000)
    } catch (err) {
      setVariant('danger')
      setMessage('❌ ' + (err.response?.data?.error || 'Error al restablecer contraseña'))
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vw-100 min-vh-100 text-white" style={{ backgroundColor: '#121212' }}>
      <Card className="p-4 shadow-lg" style={{ maxWidth: '400px', width: '90%', borderRadius: '1.5rem', backgroundColor: '#1e1e2f' }}>
        <div className="text-center mb-3">
          <img src="/logo.png" alt="Crypto Logo" style={{ width: '60px', marginBottom: '0.75rem' }} />
          <h2 className="fw-bold text-white" style={{ fontSize: '1.3rem' }}>
            Nueva contraseña
          </h2>
          <p style={{ fontSize: '0.9rem' }}>Establece tu nueva contraseña segura</p>
        </div>

        {message && <Alert variant={variant}>{message}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Contraseña</Form.Label>
                <InputGroup size="sm">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="new-password"
                    className="bg-transparent border-light text-white"
                  />
                  <InputGroup.Text
                    onClick={() => setShowPassword(v => !v)}
                    className="bg-transparent border-light text-white"
                    style={{ cursor: 'pointer' }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Confirmar</Form.Label>
                <InputGroup size="sm">
                  <Form.Control
                    type={showConfirm ? 'text' : 'password'}
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    placeholder="Repite la contraseña"
                    required
                    autoComplete="new-password"
                    className="bg-transparent border-light text-white"
                  />
                  <InputGroup.Text
                    onClick={() => setShowConfirm(v => !v)}
                    className="bg-transparent border-light text-white"
                    style={{ cursor: 'pointer' }}
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-grid">
            <Button type="submit" variant="light" className="fw-bold text-dark">
              Cambiar contraseña
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}
