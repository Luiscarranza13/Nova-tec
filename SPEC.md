# NovaTec - Plataforma Web Corporativa

## 1. Project Overview

**Project Name:** NovaTec  
**Type:** Full-stack web application (Landing + Admin Dashboard)  
**Core Functionality:** Corporate website for a software development company with complete admin panel for business management  
**Target Users:** Potential clients seeking software development services, and internal admin staff managing the business

---

## 2. UI/UX Specification

### Layout Structure

**Public Pages:**
- Sticky navigation header (80px height)
- Full-width hero sections
- Content sections with max-width 1280px
- Comprehensive footer with sitemap

**Admin Dashboard:**
- Collapsible sidebar (280px expanded, 80px collapsed)
- Top header with user menu (64px height)
- Main content area with padding 24px
- Responsive: sidebar becomes drawer on mobile

**Responsive Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette (Dark Theme - Primary):**
```css
--background: #0a0a0f
--background-secondary: #12121a
--background-card: #16161f
--foreground: #fafafa
--foreground-muted: #a1a1aa
--primary: #6366f1 (Indigo)
--primary-hover: #818cf8
--primary-foreground: #ffffff
--secondary: #1e1e2e
--secondary-foreground: #fafafa
--accent: #22d3ee (Cyan)
--accent-secondary: #a78bfa (Violet)
--border: #27272a
--border-light: #3f3f46
--success: #22c55e
--warning: #f59e0b
--destructive: #ef4444
--ring: #6366f1
```

**Light Theme:**
```css
--background: #fafafa
--background-secondary: #f4f4f5
--background-card: #ffffff
--foreground: #18181b
--foreground-muted: #71717a
--primary: #4f46e5
--primary-hover: #4338ca
--border: #e4e4e7
```

**Typography:**
- Headings: "Outfit" (Google Font) - weights 500, 600, 700
- Body: "Plus Jakarta Sans" (Google Font) - weights 400, 500, 600
- Monospace: "JetBrains Mono" (for code)

**Font Sizes:**
- H1: 48px / 56px line-height
- H2: 36px / 44px line-height
- H3: 30px / 38px line-height
- H4: 24px / 32px line-height
- Body: 16px / 24px line-height
- Small: 14px / 20px line-height

**Spacing System:**
- Base unit: 4px
- Common: 8px, 12px, 16px, 24px, 32px, 48px, 64px

**Visual Effects:**
- Border radius: 8px (small), 12px (medium), 16px (large)
- Glassmorphism: backdrop-blur-xl bg-white/5
- Shadows: 
  - sm: 0 1px 2px rgba(0,0,0,0.3)
  - md: 0 4px 6px rgba(0,0,0,0.4)
  - lg: 0 10px 15px rgba(0,0,0,0.5)
  - glow: 0 0 40px rgba(99,102,241,0.3)

### Components

**Navigation:**
- Transparent on hero, solid on scroll
- Logo left, nav links center, CTA right
- Mobile: hamburger menu with slide-in drawer
- Active state: underline with primary color

**Buttons:**
- Primary: gradient from indigo to violet
- Secondary: outlined with border
- Ghost: text only with hover background
- Sizes: sm (32px), md (40px), lg (48px)
- Hover: scale(1.02) with shadow glow

**Cards:**
- Glass effect with subtle border
- Hover: lift with increased glow
- Transition: 200ms ease-out

**Forms:**
- Input fields with floating labels
- Focus: ring with primary color
- Error: red border with message below

**Tables:**
- Striped rows (alternating background)
- Hover highlight
- Sortable columns
- Pagination controls

**Modals:**
- Centered with backdrop blur
- Slide-up animation
- Close on escape and backdrop click

---

## 3. Functionality Specification

### Public Pages

**Home Page:**
- Hero section with animated gradient background
- Headline: "Transformamos Ideas en Software Excepcional"
- Subheadline describing services
- CTA buttons: "Ver Servicios" and "Contactar"
- Animated floating code elements
- Statistics counter (projects completed, clients, years, team size)

**Services Section:**
- 6 service cards in grid
- Icons for each service
- Brief description
- "Ver más" link

**Why Choose Us:**
- 4-6 value propositions
- Animated icons
- Comparison with competitors

**Process:**
- 5-step workflow visualization
- Timeline design
- Each step with icon and description

**Portfolio:**
- Project cards with images
- Client name, project type, tech stack
- Filter by category
- Lightbox for details

**Testimonials:**
- Carousel with quotes
- Client photo, name, company
- Star rating display

**Pricing/Plans:**
- 3 pricing tiers
- Feature lists
- CTA buttons
- "Most Popular" badge

**Contact:**
- Contact form with validation
- Map integration placeholder
- Contact information
- Schedule meeting button

**Footer:**
- Logo and description
- Quick links
- Services list
- Contact info
- Social media icons
- Copyright

### Authentication (Supabase)

**Login:**
- Email/password form
- "Remember me" checkbox
- Forgot password link
- Social login buttons (Google, GitHub)

**Register:**
- Name, email, password, confirm password
- Terms acceptance checkbox
- Email verification

**Password Recovery:**
- Email input
- Reset link email
- New password form

**Session Management:**
- JWT tokens
- Automatic refresh
- Protected routes
- Role-based access

### Admin Dashboard

**Dashboard Home:**
- Welcome message with user name
- KPI cards: Total Clients, Active Projects, Pending Quotations, Monthly Revenue
- Revenue chart (last 6 months)
- Recent projects list
- Quick actions

**Clients Management:**
- Table with: Name, Email, Company, Phone, Projects Count, Created Date
- Search and filter
- Add/Edit/Delete modals
- Detail view with project history

**Projects Management:**
- Table with: Name, Client, Status, Budget, Progress, Start/End Date
- Status: Pending, In Progress, Review, Completed, Cancelled
- Kanban view option
- Detail view with tasks

**Services Management:**
- List of services with: Name, Category, Price, Description, Active status
- Drag-and-drop reorder
- Toggle active/inactive

**Quotations:**
- Create quotation form
- Client selection
- Service/items selection
- Total calculation with tax
- PDF export
- Status: Draft, Sent, Accepted, Rejected

**Testimonials:**
- List with: Client name, Quote, Rating, Featured toggle
- Add/Edit/Delete
- Featured carousel

**Contact Messages:**
- Inbox view
- Read/Unread status
- Reply functionality
- Mark as resolved

**Settings:**
- Company information
- Social media links
- SEO settings
- Email templates

**User Profile:**
- Edit profile info
- Change password
- Theme preference

---

## 4. Technical Architecture

### Database Schema (Supabase)

```sql
-- profiles (extends auth.users)
- id: uuid (FK to auth.users)
- full_name: text
- avatar_url: text
- role: text (admin, user)
- phone: text
- created_at, updated_at

-- clients
- id: uuid (PK)
- name: text
- email: text
- company: text
- phone: text
- notes: text
- created_by: uuid (FK profiles)
- created_at, updated_at

-- projects
- id: uuid (PK)
- name: text
- description: text
- client_id: uuid (FK clients)
- status: text (pending, in_progress, review, completed, cancelled)
- budget: decimal
- progress: integer (0-100)
- start_date: date
- end_date: date
- created_by: uuid (FK profiles)
- created_at, updated_at

-- services
- id: uuid (PK)
- name: text
- description: text
- category: text
- price: decimal
- icon: text
- order_index: integer
- is_active: boolean
- created_at, updated_at

-- quotations
- id: uuid (PK)
- client_id: uuid (FK clients)
- status: text (draft, sent, accepted, rejected)
- subtotal: decimal
- tax: decimal
- total: decimal
- notes: text
- valid_until: date
- created_by: uuid (FK profiles)
- created_at, updated_at

-- quotation_items
- id: uuid (PK)
- quotation_id: uuid (FK quotations)
- service_id: uuid (FK services)
- description: text
- quantity: integer
- unit_price: decimal
- total: decimal

-- testimonials
- id: uuid (PK)
- client_name: text
- client_company: text
- client_avatar: text
- quote: text
- rating: integer (1-5)
- is_featured: boolean
- created_at

-- contact_messages
- id: uuid (PK)
- name: text
- email: text
- subject: text
- message: text
- is_read: boolean
- is_resolved: boolean
- created_at

-- site_settings
- id: uuid (PK)
- key: text (unique)
- value: text
- updated_at
```

### File Structure

```
/app
  /(public)
    /page.tsx (Home)
    /nosotros/page.tsx
    /servicios/page.tsx
    /portafolio/page.tsx
    /planes/page.tsx
    /testimonios/page.tsx
    /contacto/page.tsx
    /politicas/page.tsx
    /terminos/page.tsx
    /layout.tsx
  /(auth)
    /login/page.tsx
    /registro/page.tsx
    /recuperar-password/page.tsx
    /layout.tsx
  /(dashboard)
    /admin
      /page.tsx (Dashboard home)
      /clientes/page.tsx
      /proyectos/page.tsx
      /servicios/page.tsx
      /cotizaciones/page.tsx
      /testimonios/page.tsx
      /mensajes/page.tsx
      /configuracion/page.tsx
      /perfil/page.tsx
      /layout.tsx
  /api
    /auth/[...nextauth]/route.ts
  /layout.tsx
  /globals.css
  /favicon.ico

/components
  /ui (shadcn components)
  /layout
    /Header.tsx
    /Footer.tsx
    /Sidebar.tsx
  /home
    /Hero.tsx
    /Services.tsx
    /WhyUs.tsx
    /Process.tsx
    /Portfolio.tsx
    /Testimonials.tsx
    /Pricing.tsx
    /Contact.tsx
    /Stats.tsx
  /dashboard
    /KPICard.tsx
    /DataTable.tsx
    /StatChart.tsx
  /forms
    /ClientForm.tsx
    /ProjectForm.tsx
    /ServiceForm.tsx
    /QuotationForm.tsx
    /TestimonialForm.tsx
    /ContactForm.tsx

/lib
  /supabase
    /client.ts
    /server.ts
    /types.ts
  /utils.ts
  /constants.ts

/hooks
  /useAuth.ts
  /useDebounce.ts

/services
  /supabase
    /clients.ts
    /projects.ts
    /services.ts
    /quotations.ts
    /testimonials.ts
    /messages.ts

/types
  /index.ts

/public
  /images
```

---

## 5. Acceptance Criteria

### Visual Checkpoints
- [ ] Dark theme with gradient accents renders correctly
- [ ] Glassmorphism effects visible on cards
- [ ] Animations are smooth (60fps)
- [ ] Responsive design works on all breakpoints
- [ ] Typography is consistent throughout

### Functionality Checkpoints
- [ ] User can register and login
- [ ] Protected routes redirect to login
- [ ] CRUD operations work for all entities
- [ ] Search and filters function correctly
- [ ] Forms validate input properly
- [ ] Toast notifications appear on actions

### Performance Checkpoints
- [ ] First contentful paint < 1.5s
- [ ] No layout shifts after load
- [ ] Images are optimized
- [ ] Code is split appropriately

---

## 6. Stack & Dependencies

**Core:**
- next: 14.x (App Router)
- react: 18.x
- typescript: 5.x

**Styling:**
- tailwindcss: 3.x
- @radix-ui primitives
- class-variance-authority
- clsx
- tailwind-merge

**UI Components (shadcn):**
- button
- card
- input
- label
- textarea
- select
- dialog
- dropdown-menu
- table
- tabs
- badge
- avatar
- separator
- sheet
- skeleton
- toast
- switch
- checkbox
- form

**State & Data:**
- @supabase/supabase-js
- zustand (optional)
- @tanstack/react-query (optional)
- react-hook-form
- @hookform/resolvers
- zod

**Icons & Animation:**
- lucide-react
- framer-motion
- @radix-ui/react-icons

**Utilities:**
- sonner
- next-themes
- date-fns
- recharts

**Dev:**
- eslint
- prettier
- tailwindcss-animate
