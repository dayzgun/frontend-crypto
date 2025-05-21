// src/pages/CuriosityPage.jsx
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import curiosidades from '../utils/curiosidadesCrypto'
import { Button, Card } from 'react-bootstrap'
import jsPDF from 'jspdf'

// URL de un icono de “encriptación” (padlock + bits)
const logoUrl = 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png'

export default function CuriosityPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const curiosidad = curiosidades.find(c => c.id === parseInt(id))
  const slogan = 'Tu puerta al universo cripto'

  const exportarPDF = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 14

    // Fondo temático
    doc.setFillColor(30, 30, 47)
    doc.rect(0, 0, pageWidth, doc.internal.pageSize.getHeight(), 'F')

    // Cargar logo desde URL
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = logoUrl
    img.onload = () => {
      const imgWidth = 30
      const imgHeight = (img.height * imgWidth) / img.width
      doc.addImage(img, 'PNG', margin, margin, imgWidth, imgHeight)

      // Título centrado
      doc.setFontSize(22)
      doc.setTextColor(255, 255, 255)
      doc.text(curiosidad.titulo, pageWidth / 2, margin + 40, { align: 'center' })

      // Slogan
      doc.setFontSize(12)
      doc.setTextColor(200)
      doc.text(slogan, pageWidth / 2, margin + 50, { align: 'center' })

      // Descripción
      doc.setFontSize(11)
      doc.setTextColor(255, 255, 255)
      const textLines = doc.splitTextToSize(curiosidad.descripcion, pageWidth - margin * 2)
      let cursorY = margin + 65
      textLines.forEach(line => {
        doc.text(line, margin, cursorY)
        cursorY += 7
      })

      doc.save(`curiosidad_${curiosidad.id}.pdf`)
    }
    img.onerror = () => {
      console.warn('No se pudo cargar el logo en el PDF')
      // Generar PDF sin logo en caso de error...
      doc.setFontSize(22)
      doc.setTextColor(255, 255, 255)
      doc.text(curiosidad.titulo, pageWidth / 2, margin + 40, { align: 'center' })
      doc.setFontSize(12)
      doc.setTextColor(200)
      doc.text(slogan, pageWidth / 2, margin + 50, { align: 'center' })
      doc.setFontSize(11)
      doc.setTextColor(255, 255, 255)
      const textLines = doc.splitTextToSize(curiosidad.descripcion, pageWidth - margin * 2)
      let cursorY = margin + 65
      textLines.forEach(line => {
        doc.text(line, margin, cursorY)
        cursorY += 7
      })
      doc.save(`curiosidad_${curiosidad.id}.pdf`)
    }
  }

  if (!curiosidad) {
    return <p className="text-white text-center mt-5">Curiosidad no encontrada</p>
  }

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vw-100 min-vh-100 text-white"
      style={{ backgroundColor: '#121212' }}
    >
      <Card
        className="p-4 shadow-lg"
        style={{ maxWidth: '500px', width: '90%', borderRadius: '1.5rem', backgroundColor: '#1e1e2f' }}
      >
        <Card.Body>
          {/* Logo de encriptación */}
          <img
            src={logoUrl}
            alt="Logo Encriptación"
            style={{ display: 'block', width: '50px', margin: '0 auto 1rem' }}
          />

          <Card.Title as="h2" className="text-white text-center mb-3">
            {curiosidad.titulo}
          </Card.Title>
          <Card.Text className="text-white" style={{ textAlign: 'justify' }}>
            {curiosidad.descripcion}
          </Card.Text>

          <div className="d-grid mt-3">
            <Button onClick={exportarPDF} variant="light" className="fw-bold text-dark">
              Exportar a PDF
            </Button>
            <Button
              onClick={() => navigate('/dashboard')}
              variant="light"
              className="fw-bold text-dark mt-2"
            >
              Regresar al Dashboard
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}
