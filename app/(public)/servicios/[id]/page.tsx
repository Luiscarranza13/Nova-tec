import { redirect } from 'next/navigation'

// Redirige /servicios/[id] → /servicios#[id]
export default async function ServicioDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  redirect(`/servicios#${id}`)
}

export function generateStaticParams() {
  return [
    { id: 'desarrollo-web' },
    { id: 'desarrollo-mobile' },
    { id: 'desarrollo-software' },
    { id: 'ui-ux' },
    { id: 'cloud' },
    { id: 'consultoria' },
  ]
}
