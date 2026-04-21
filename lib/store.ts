import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  // Announcement banner
  bannerDismissed: boolean
  dismissBanner: () => void

  // Cookie consent
  cookiesAccepted: boolean | null
  acceptCookies: () => void
  rejectCookies: () => void

  // Recently viewed pages
  recentPages: { href: string; label: string; ts: number }[]
  addRecentPage: (href: string, label: string) => void

  // Sidebar collapsed (admin)
  sidebarCollapsed: boolean
  setSidebarCollapsed: (v: boolean) => void

  // Preferred contact method
  preferredContact: 'whatsapp' | 'email' | 'form'
  setPreferredContact: (v: 'whatsapp' | 'email' | 'form') => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      bannerDismissed: false,
      dismissBanner: () => set({ bannerDismissed: true }),

      cookiesAccepted: null,
      acceptCookies: () => set({ cookiesAccepted: true }),
      rejectCookies: () => set({ cookiesAccepted: false }),

      recentPages: [],
      addRecentPage: (href, label) => {
        const pages = get().recentPages.filter(p => p.href !== href)
        set({ recentPages: [{ href, label, ts: Date.now() }, ...pages].slice(0, 5) })
      },

      sidebarCollapsed: false,
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),

      preferredContact: 'whatsapp',
      setPreferredContact: (v) => set({ preferredContact: v }),
    }),
    {
      name: 'novatec-ui',
      partialize: (s) => ({
        bannerDismissed: s.bannerDismissed,
        cookiesAccepted: s.cookiesAccepted,
        recentPages: s.recentPages,
        sidebarCollapsed: s.sidebarCollapsed,
        preferredContact: s.preferredContact,
      }),
    }
  )
)
