'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Mail, MapPin, Phone, Send, CheckCircle2, Loader2, Calendar } from 'lucide-react'
import { toast } from 'sonner'
import { z } from 'zod'
import { motion } from 'framer-motion'

const contactFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un correo electrónico válido'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })

  const validateField = (field: keyof ContactFormData, value: string) => {
    const fieldSchema = contactFormSchema.shape[field]
    const result = fieldSchema.safeParse(value)
    if (!result.success) {
      setErrors(prev => ({ ...prev, [field]: result.error.errors[0]?.message }))
    } else {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (value) validateField(field, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = contactFormSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {}
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof ContactFormData
        fieldErrors[field] = error.message
      })
      setErrors(fieldErrors)
      toast.error('Por favor corrige los errores del formulario')
      return
    }

    setIsSubmitting(true)
    setErrors({})
    
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    toast.success('¡Mensaje enviado correctamente!', {
      description: 'Nos pondremos en contacto contigo pronto.',
      icon: <CheckCircle2 className="h-5 w-5 text-success" />,
    })
    
    setFormData({ name: '', email: '', phone: '', company: '', message: '' })
    setIsSubmitting(false)
  }

  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-50" />
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-chart-2/5 rounded-full blur-[100px]" />
          
          <div className="container max-w-7xl mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                Cont<span className="text-gradient">áctanos</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                ¿Tienes un proyecto en mente? Estamos aquí para ayudarte a convertir tu visión en realidad.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="h-full p-8 glass-card hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-semibold font-heading mb-6">
                    Envíanos un Mensaje
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo *</Label>
                        <Input
                          id="name"
                          placeholder="Juan Pérez"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          onBlur={(e) => validateField('name', e.target.value)}
                          className={errors.name ? 'border-destructive focus:ring-destructive' : ''}
                        />
                        {errors.name && (
                          <p className="text-xs text-destructive">{errors.name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="juan@empresa.com"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          onBlur={(e) => validateField('email', e.target.value)}
                          className={errors.email ? 'border-destructive focus:ring-destructive' : ''}
                        />
                        {errors.email && (
                          <p className="text-xs text-destructive">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+52 (55) 1234 5678"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Empresa</Label>
                        <Input
                          id="company"
                          placeholder="Nombre de tu empresa"
                          value={formData.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Mensaje *</Label>
                      <Textarea
                        id="message"
                        placeholder="Cuéntanos sobre tu proyecto, objetivos y requerimientos..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        onBlur={(e) => validateField('message', e.target.value)}
                        className={errors.message ? 'border-destructive focus:ring-destructive' : ''}
                      />
                      {errors.message && (
                        <p className="text-xs text-destructive">{errors.message}</p>
                      )}
                    </div>
                    
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full shadow-lg shadow-primary/20" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando mensaje...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Enviar Mensaje
                        </>
                      )}
                    </Button>
                  </form>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <Card className="p-8 glass-card">
                  <h3 className="text-xl font-semibold font-heading mb-6">
                    Información de Contacto
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Dirección</h4>
                        <p className="text-muted-foreground text-sm mt-1">
                          Av. Tecnológico 123<br />
                          Ciudad de México, CP 06000<br />
                          México
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Teléfono</h4>
                        <p className="text-muted-foreground text-sm mt-1">
                          +52 (55) 1234 5678<br />
                          +52 (55) 9876 5432
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p className="text-muted-foreground text-sm mt-1">
                          hola@novatec.mx<br />
                          proyectos@novatec.mx
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-8 bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20">
                  <h3 className="text-xl font-semibold font-heading mb-4">
                    ¿Necesitas una Reunión?
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Agenda una llamada de 30 minutos con nuestro equipo de expertos para discutir tu proyecto.
                  </p>
                  <Button className="w-full shadow-lg" asChild>
                    <a href="https://calendly.com/novatec" target="_blank" rel="noopener noreferrer">
                      <Calendar className="mr-2 h-4 w-4" />
                      Agendar Reunión
                    </a>
                  </Button>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
