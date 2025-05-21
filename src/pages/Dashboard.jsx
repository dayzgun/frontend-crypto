// src/pages/Dashboard.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import curiosidades from '../utils/curiosidadesCrypto'
import { Button, Card, Container, Row, Col } from 'react-bootstrap'

export default function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Aquí podrías limpiar algún estado o token si lo implementas más adelante
    navigate('/')
  }

  return (
    <div className="vw-100 min-vh-100 text-white" style={{ backgroundColor: '#121212' }}>
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Curiosidades de Criptomonedas</h2>
        </div>

        <Row>
          {curiosidades.map(c => (
            <Col key={c.id} xs={12} md={6} lg={4} className="mb-4">
              <Card
                className="h-100 shadow-lg text-white"
                style={{ backgroundColor: '#1e1e2f', borderRadius: '1rem' }}
              >
                <Card.Body>
                  <Card.Title>{c.titulo}</Card.Title>
                  <Card.Text>{c.descripcion.slice(0, 100)}...</Card.Text>
                  <Button
                    variant="light"
                    className="fw-bold text-dark"
                    onClick={() => navigate(`/curiosidad/${c.id}`)}
                  >
                    Ver más
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}
