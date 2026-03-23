'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Code2, ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function RecuperarPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setEmailSent(true)
    setIsLoading(false)
    
    toast.success('Correo enviado', {
      description: 'Revisa tu bandeja de entrada para restablecer tu contraseña.',
    })
  }

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 noise-overlay" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md text-center"
        >
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative bg-gradient-to-r from-indigo-500 to-violet-500 p-2 rounded-lg">
                  <Code2 className="h-8 w-8 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold font-heading">
                Nova<span className="text-primary">Tec</span>
              </span>
            </Link>
          </div>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Correo Enviado</CardTitle>
              <CardDescription>
               Hemos enviado un enlace de recuperación a <strong>{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col gap-4">
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver a Iniciar Sesión
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative bg-gradient-to-r from-indigo-500 to-violet-500 p-2 rounded-lg">
                <Code2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold font-heading">
              Nova<span className="text-primary">Tec</span>
            </span>
          </Link>
        </div>

        <Card className="glass">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-heading">Recuperar Contraseña</CardTitle>
            <CardDescription>
              Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar Enlace'
                )}
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                <Link href="/login" className="text-primary hover:underline inline-flex items-center">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Volver a Iniciar Sesión
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
