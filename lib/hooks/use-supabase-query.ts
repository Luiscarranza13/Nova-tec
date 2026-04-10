'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'

// Generic hook for Supabase table queries
export function useSupabaseQuery<T>(
  table: string,
  queryKey: string[],
  options?: {
    select?: string
    filter?: Record<string, unknown>
    order?: { column: string; ascending?: boolean }
    limit?: number
    enabled?: boolean
  }
) {
  return useQuery<T[]>({
    queryKey,
    enabled: options?.enabled !== false,
    queryFn: async () => {
      let query = supabase.from(table).select(options?.select || '*')
      if (options?.filter) {
        Object.entries(options.filter).forEach(([k, v]) => { query = query.eq(k, v) })
      }
      if (options?.order) {
        query = query.order(options.order.column, { ascending: options.order.ascending ?? false })
      }
      if (options?.limit) query = query.limit(options.limit)
      const { data, error } = await query
      if (error) throw error
      return (data || []) as T[]
    },
  })
}

// Generic upsert mutation
export function useSupabaseUpsert(table: string, queryKey: string[]) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const { error } = await supabase.from(table).upsert(payload)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey }) },
    onError: (err: Error) => toast.error(err.message),
  })
}

// Generic delete mutation
export function useSupabaseDelete(table: string, queryKey: string[]) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table).delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey }) },
    onError: (err: Error) => toast.error(err.message),
  })
}
