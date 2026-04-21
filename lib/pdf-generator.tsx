// PDF generation for quotations using @react-pdf/renderer
import { Document, Page, Text, View, StyleSheet, pdf, Font } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page:        { padding: 48, fontFamily: 'Helvetica', backgroundColor: '#ffffff' },
  header:      { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  logo:        { fontSize: 22, fontFamily: 'Helvetica-Bold', color: '#6366f1' },
  logoSub:     { fontSize: 10, color: '#64748b', marginTop: 2 },
  badge:       { backgroundColor: '#f1f5f9', borderRadius: 6, padding: '6 12', alignSelf: 'flex-start' },
  badgeText:   { fontSize: 9, color: '#64748b', fontFamily: 'Helvetica-Bold', letterSpacing: 1 },
  title:       { fontSize: 28, fontFamily: 'Helvetica-Bold', color: '#0f172a', marginBottom: 4 },
  subtitle:    { fontSize: 11, color: '#64748b', marginBottom: 32 },
  section:     { marginBottom: 24 },
  sectionTitle:{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#6366f1', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 },
  row:         { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label:       { fontSize: 10, color: '#64748b' },
  value:       { fontSize: 10, color: '#0f172a', fontFamily: 'Helvetica-Bold' },
  divider:     { borderBottom: '1 solid #e2e8f0', marginVertical: 16 },
  table:       { borderRadius: 8, overflow: 'hidden' },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f8fafc', padding: '10 12' },
  tableRow:    { flexDirection: 'row', padding: '10 12', borderBottom: '1 solid #f1f5f9' },
  tableCell:   { fontSize: 10, color: '#0f172a' },
  tableCellMuted: { fontSize: 10, color: '#64748b' },
  totalBox:    { backgroundColor: '#6366f1', borderRadius: 8, padding: '16 20', marginTop: 16 },
  totalLabel:  { fontSize: 11, color: 'rgba(255,255,255,0.8)' },
  totalValue:  { fontSize: 24, fontFamily: 'Helvetica-Bold', color: '#ffffff', marginTop: 4 },
  footer:      { position: 'absolute', bottom: 32, left: 48, right: 48 },
  footerText:  { fontSize: 9, color: '#94a3b8', textAlign: 'center' },
  notes:       { backgroundColor: '#f8fafc', borderRadius: 8, padding: 16, marginTop: 8 },
  notesText:   { fontSize: 10, color: '#475569', lineHeight: 1.6 },
})

const fmt = (n: number) =>
  new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', maximumFractionDigits: 0 }).format(n)

interface QuotationPDFProps {
  numero: string
  cliente: string
  email?: string
  fecha: string
  validaHasta?: string
  items?: { descripcion: string; cantidad: number; precio: number; total: number }[]
  subtotal: number
  impuesto: number
  total: number
  notas?: string
  terminos?: string
}

function QuotationDocument({
  numero, cliente, email, fecha, validaHasta,
  items = [], subtotal, impuesto, total, notas, terminos,
}: QuotationPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>NovaTec</Text>
            <Text style={styles.logoSub}>Desarrollo de Software Premium</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>COTIZACIÓN</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>{numero}</Text>
        <Text style={styles.subtitle}>Propuesta comercial generada el {fecha}</Text>

        <View style={styles.divider} />

        {/* Client info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos del cliente</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Cliente</Text>
            <Text style={styles.value}>{cliente}</Text>
          </View>
          {email && (
            <View style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{email}</Text>
            </View>
          )}
          {validaHasta && (
            <View style={styles.row}>
              <Text style={styles.label}>Válida hasta</Text>
              <Text style={styles.value}>{validaHasta}</Text>
            </View>
          )}
        </View>

        {/* Items table */}
        {items.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Detalle de servicios</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCellMuted, { flex: 3 }]}>Descripción</Text>
                <Text style={[styles.tableCellMuted, { flex: 1, textAlign: 'center' }]}>Cant.</Text>
                <Text style={[styles.tableCellMuted, { flex: 1.5, textAlign: 'right' }]}>Precio</Text>
                <Text style={[styles.tableCellMuted, { flex: 1.5, textAlign: 'right' }]}>Total</Text>
              </View>
              {items.map((item, i) => (
                <View key={i} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { flex: 3 }]}>{item.descripcion}</Text>
                  <Text style={[styles.tableCell, { flex: 1, textAlign: 'center' }]}>{item.cantidad}</Text>
                  <Text style={[styles.tableCell, { flex: 1.5, textAlign: 'right' }]}>{fmt(item.precio)}</Text>
                  <Text style={[styles.tableCell, { flex: 1.5, textAlign: 'right' }]}>{fmt(item.total)}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Totals */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.value}>{fmt(subtotal)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>IGV (18%)</Text>
            <Text style={styles.value}>{fmt(impuesto)}</Text>
          </View>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>TOTAL A PAGAR</Text>
            <Text style={styles.totalValue}>{fmt(total)}</Text>
          </View>
        </View>

        {/* Notes */}
        {notas && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notas</Text>
            <View style={styles.notes}>
              <Text style={styles.notesText}>{notas}</Text>
            </View>
          </View>
        )}

        {/* Terms */}
        {terminos && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Términos de pago</Text>
            <View style={styles.notes}>
              <Text style={styles.notesText}>{terminos}</Text>
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            NovaTec · Senati Cajamarca, Perú · NovaTec.Empresarial@gmail.com · +51 918 146 783
          </Text>
        </View>
      </Page>
    </Document>
  )
}

export async function generateQuotationPDF(props: QuotationPDFProps): Promise<Blob> {
  const blob = await pdf(<QuotationDocument {...props} />).toBlob()
  return blob
}

export async function downloadQuotationPDF(props: QuotationPDFProps) {
  const blob = await generateQuotationPDF(props)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${props.numero}.pdf`
  a.click()
  URL.revokeObjectURL(url)
}
