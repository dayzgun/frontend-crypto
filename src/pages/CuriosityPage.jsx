// src/pages/CuriosityPage.jsx
import React from 'react'
import { useParams } from 'react-router-dom'
import curiosidades from '../utils/curiosidadesCrypto'
import { Button, Card } from 'react-bootstrap'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default function CuriosityPage() {
  const { id } = useParams()
  const curiosidad = curiosidades.find(c => c.id === parseInt(id))

  const exportarPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text(curiosidad.titulo, 14, 22)
    autoTable(doc, {
      startY: 30,
      head: [['Campo', 'Contenido']],
      body: [
        ['ID', curiosidad.id],
        ['Título', curiosidad.titulo],
        ['Descripción', curiosidad.descripcion]
      ]
    })
    doc.save(`curiosidad_${curiosidad.id}.pdf`)
  }

  if (!curiosidad) {
    return <p className="text-white text-center mt-5">Curiosidad no encontrada</p>
  }

  return (
    <div className="d-flex justify-content-center align-items-center vw-100 min-vh-100 text-white" style={{ backgroundColor: '#121212' }}>
      <Card className="p-4 shadow-lg" style={{ maxWidth: '500px', width: '90%', borderRadius: '1.5rem', backgroundColor: '#1e1e2f' }}>
        <h2 className="text-white text-center mb-3">{curiosidad.titulo}</h2>
        <p>{curiosidad.descripcion}</p>
        <div className="d-grid mt-3">
          <Button onClick={exportarPDF} variant="light" className="fw-bold text-dark">
            Exportar a PDF
          </Button>
        </div>
      </Card>
    </div>
  )
}
