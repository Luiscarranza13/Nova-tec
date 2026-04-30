import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acceso al Panel',
  description: 'Acceso al panel de administración de NovaTec.',
  robots: { index: false, follow: false },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
