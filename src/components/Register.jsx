// src/components/Register.jsx

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'      // ← importamos useNavigate
import axios from 'axios'
import SHA256 from 'crypto-js/sha256'
import {
  Form,
  Button,
  Alert,
  Card,
  Row,
  Col,
  InputGroup
} from 'react-bootstrap'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const SPECIAL_CHARS = '!@#$%^&*(),.?":{}|<>'

export default function Register() {
  const navigate = useNavigate()                   // ← inicializamos navigate

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [message, setMessage] = useState(null)
  const [variant, setVariant] = useState('info')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const pw = form.password

    // 1) longitud mínima
    if (pw.length < 10) {
      setVariant('danger')
      setMessage('❌ La contraseña debe tener al menos 10 caracteres')
      return
    }
    // 2) mayúscula
    if (!/[A-Z]/.test(pw)) {
      setVariant('danger')
      setMessage('❌ Debe incluir al menos una letra mayúscula')
      return
    }
    // 3) minúscula
    if (!/[a-z]/.test(pw)) {
      setVariant('danger')
      setMessage('❌ Debe incluir al menos una letra minúscula')
      return
    }
    // 4) número
    if (!/[0-9]/.test(pw)) {
      setVariant('danger')
      setMessage('❌ Debe incluir al menos un número')
      return
    }
    // 5) carácter especial
    const esc = SPECIAL_CHARS.replace(/[\]\-\\]/g, '\\$&')
    if (!(new RegExp(`[${esc}]`)).test(pw)) {
      setVariant('danger')
      setMessage(`❌ Debe incluir uno de estos: ${SPECIAL_CHARS}`)
      return
    }
    // 6) no más de 2 iguales consecutivos
    if (/(.)\1\1/.test(pw)) {
      setVariant('danger')
      setMessage('❌ No puede haber 3 caracteres iguales seguidos')
      return
    }
    // 7) confirmar igualdad
    if (pw !== form.confirm) {
      setVariant('danger')
      setMessage('❌ Las contraseñas no coinciden')
      return
    }

    try {
      // 1️⃣ Generar el hash SHA256 de la contraseña
      const hashedPassword = SHA256(pw).toString()

      // 2️⃣ Enviar AL BACKEND sólo el hash (no la contraseña en claro)
      const res = await axios.post(
        'https://crypto-backend-production-56d2.up.railway.app/register',
        {
          name: form.name,
          username: form.username,
          email: form.email,
          password_hash: hashedPassword
        }
      )

      setVariant('success')
      setMessage('✅ ' + res.data.msg)

      // 3️⃣ Redirigir a la pantalla de verificación, pasando el username
      navigate('/verify-code', { state: { username: form.username } })

    } catch (err) {
      setVariant('danger')
      setMessage('❌ ' + (err.response?.data?.error || 'Error al registrar'))
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
          maxWidth: '400px',
          width: '90%',
          borderRadius: '1.5rem',
          backgroundColor: '#1e1e2f',
        }}
      >
        <div className="text-center mb-3">
          <img
            src="/logo.png"
            alt="Crypto Logo"
            style={{ width: '80px', marginBottom: '0.75rem' }}
          />
          <h2 className="fw-bold text-white" style={{ fontSize: '1.5rem' }}>
            Crear cuenta
          </h2>
        </div>

        {message && <Alert variant={variant}>{message}</Alert>}

        <Form onSubmit={handleSubmit} autoComplete="off">
          <Form.Group className="mb-2">
            <Form.Label className="text-white">Nombre</Form.Label>
            <Form.Control
              name="name"
              placeholder="Nombre"
              onChange={handleChange}
              required
              size="sm"
              autoComplete="off"
              className="bg-transparent border-light text-white"
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="text-white">Usuario</Form.Label>
            <Form.Control
              name="username"
              placeholder="Nombre de usuario único"
              onChange={handleChange}
              required
              size="sm"
              autoComplete="off"
              className="bg-transparent border-light text-white"
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="text-white">Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="ejemplo@email.com"
              onChange={handleChange}
              required
              size="sm"
              autoComplete="off"
              className="bg-transparent border-light text-white"
            />
          </Form.Group>

          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-2">
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
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-2">
                <Form.Label className="text-white">Confirmar</Form.Label>
                <InputGroup size="sm">
                  <Form.Control
                    type={showConfirm ? 'text' : 'password'}
                    name="confirm"
                    placeholder="Repite contraseña"
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    className="bg-transparent border-light text-white"
                  />
                  <InputGroup.Text
                    onClick={() => setShowConfirm(v => !v)}
                    style={{ cursor: 'pointer' }}
                    className="bg-transparent border-light text-white"
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-grid mt-3">
            <Button type="submit" variant="light" className="fw-bold text-dark">
              Registrarse
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}
