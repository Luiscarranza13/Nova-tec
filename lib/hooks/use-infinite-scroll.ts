import { useEffect, useRef, useState, useCallback } from 'react'

export function useInfiniteScroll<T>(
  fetcher: (page: number) => Promise<T[]>,
  pageSize = 9
) {
  const [items, setItems] = useState<T[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)
    try {
      const data = await fetcher(page)
      setItems(prev => [...prev, ...data])
      setHasMore(data.length === pageSize)
      setPage(p => p + 1)
    } finally {
      setLoading(false)
    }
  }, [page, loading, hasMore, fetcher, pageSize])

  useEffect(() => {
    loadMore()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!sentinelRef.current) return
    observerRef.current = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore() },
      { threshold: 0.1 }
    )
    observerRef.current.observe(sentinelRef.current)
    return () => observerRef.current?.disconnect()
  }, [loadMore])

  const reset = useCallback(() => {
    setItems([])
    setPage(0)
    setHasMore(true)
  }, [])

  return { items, loading, hasMore, sentinelRef, reset }
}
