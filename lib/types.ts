// Types para toda la aplicación

export interface NavItem {
  label: string
  href: string
}

export interface Service {
  id: string
  name: string
  description: string
  icon: string
  features: string[]
}

export interface ProcessStep {
  step: number
  title: string
  description: string
  icon: string
}

export interface WhyUsItem {
  title: string
  description: string
  icon: string
}

export interface PricingPlan {
  name: string
  description: string
  price: number
  features: string[]
  cta: string
  popular?: boolean
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface ProjectStatus {
  value: string
  label: string
  color: string
}

export interface QuotationStatus {
  value: string
  label: string
  color: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'proyecto' | 'precio' | 'tecnico' | 'soporte' | 'empresa'
}

export interface CaseStudy {
  id: number
  title: string
  client: string
  industry: string
  challenge: string
  solution: string
  results: {
    metric: string
    description: string
  }[]
  technologies: string[]
  image: string
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  category: string
  publishedAt: string
  readTime: number
  featured: boolean
}

export interface Testimonial {
  id: number
  name: string
  position: string
  company: string
  quote: string
  rating: number
  avatar: string
  gradient: string
  result: string
}

export interface FeatureHighlight {
  title: string
  description: string
  icon: string
}

// Form types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  company?: string
}

export interface NewsletterFormData {
  email: string
}

export interface QuotationFormData {
  projectName: string
  description: string
  budget?: string
  timeline?: string
  clientName: string
  clientEmail: string
  clientPhone: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Table data types
export interface Client {
  id: string
  name: string
  email: string
  phone: string
  company?: string
  createdAt: Date
}

export interface Project {
  id: string
  name: string
  description: string
  status: string
  budget: number
  startDate: Date
  endDate?: Date
  clientId: string
}

export interface Message {
  id: string
  name: string
  subject: string
  message: string
  email: string
  createdAt: Date
  read: boolean
}

export interface Quotation {
  id: string
  projectName: string
  clientId: string
  amount: number
  createdAt: Date
  updatedAt: Date
  status: string
}
