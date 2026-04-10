import { z } from 'zod'

// Schemas de validación reutilizables
export const emailSchema = z.string().email('Email inválido').toLowerCase()
export const phoneSchema = z.string().regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Teléfono inválido')
export const urlSchema = z.string().url('URL inválida').optional().or(z.literal(''))

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: emailSchema,
  phone: phoneSchema.optional(),
  subject: z.string().min(5, 'El asunto debe tener al menos 5 caracteres'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres').max(5000, 'El mensaje no puede exceder 5000 caracteres'),
  company: z.string().optional(),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>

// Newsletter Form Schema
export const newsletterFormSchema = z.object({
  email: emailSchema,
})

export type NewsletterFormInput = z.infer<typeof newsletterFormSchema>

// Quotation Request Schema
export const quotationFormSchema = z.object({
  projectName: z.string().min(3, 'El nombre del proyecto es requerido'),
  description: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  clientName: z.string().min(3, 'El nombre es requerido'),
  clientEmail: emailSchema,
  clientPhone: phoneSchema,
})

export type QuotationFormInput = z.infer<typeof quotationFormSchema>

// Login Schema
export const loginFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  rememberMe: z.boolean().optional(),
})

export type LoginFormInput = z.infer<typeof loginFormSchema>

// Register Schema
export const registerFormSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: emailSchema,
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, 'Debes aceptar los términos'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
})

export type RegisterFormInput = z.infer<typeof registerFormSchema>

// Password Reset Schema
export const resetPasswordSchema = z.object({
  email: emailSchema,
})

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>

// New Password Schema
export const newPasswordSchema = z.object({
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
})

export type NewPasswordInput = z.infer<typeof newPasswordSchema>
