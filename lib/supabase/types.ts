export type Profile = {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: 'admin' | 'user'
  phone: string | null
  created_at: string
  updated_at: string
}

export type Client = {
  id: string
  name: string
  email: string
  company: string | null
  phone: string | null
  notes: string | null
  created_by: string | null
  created_at: string
  updated_at: string
}

export type ProjectStatus = 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled'

export type Project = {
  id: string
  name: string
  description: string | null
  client_id: string | null
  client?: Client
  status: ProjectStatus
  budget: number | null
  progress: number
  start_date: string | null
  end_date: string | null
  created_by: string | null
  created_at: string
  updated_at: string
}

export type Service = {
  id: string
  name: string
  description: string | null
  category: string | null
  price: number | null
  icon: string | null
  order_index: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export type QuotationStatus = 'draft' | 'sent' | 'accepted' | 'rejected'

export type Quotation = {
  id: string
  client_id: string | null
  client?: Client
  status: QuotationStatus
  subtotal: number
  tax: number
  total: number
  notes: string | null
  valid_until: string | null
  created_by: string | null
  created_at: string
  updated_at: string
  items?: QuotationItem[]
}

export type QuotationItem = {
  id: string
  quotation_id: string
  service_id: string | null
  service?: Service
  description: string | null
  quantity: number
  unit_price: number
  total: number
}

export type Testimonial = {
  id: string
  client_name: string
  client_company: string | null
  client_avatar: string | null
  quote: string
  rating: number
  is_featured: boolean
  created_at: string
}

export type ContactMessage = {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  is_read: boolean
  is_resolved: boolean
  created_at: string
}

export type SiteSetting = {
  id: string
  key: string
  value: string | null
  updated_at: string
}
