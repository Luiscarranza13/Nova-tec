'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from 'lucide-react'
import { Button } from './button'
import { Input } from './input'

interface Column<T> {
  key: string
  header: string
  cell?: (row: T) => React.ReactNode
  sortable?: boolean
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchable?: boolean
  searchPlaceholder?: string
  searchKeys?: (keyof T)[]
  pageSize?: number
  onRowClick?: (row: T) => void
  loading?: boolean
  emptyMessage?: string
  className?: string
}

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = 'Buscar...',
  searchKeys = [],
  pageSize = 10,
  onRowClick,
  loading = false,
  emptyMessage = 'No hay datos para mostrar',
  className,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc')

  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data
    
    return data.filter((item) => 
      searchKeys.some((key) => {
        const value = item[key]
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      })
    )
  }, [data, searchTerm, searchKeys])

  const sortedData = React.useMemo(() => {
    if (!sortKey) return filteredData
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey as keyof T]
      const bValue = b[sortKey as keyof T]
      
      if (aValue === bValue) return 0
      if (aValue === null || aValue === undefined) return 1
      if (bValue === null || bValue === undefined) return -1
      
      const comparison = aValue < bValue ? -1 : 1
      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [filteredData, sortKey, sortDirection])

  const totalPages = Math.ceil(sortedData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize)

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  return (
    <div className={cn('space-y-4', className)}>
      {searchable && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      'px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider',
                      column.sortable && 'cursor-pointer hover:text-foreground transition-colors',
                      column.className
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      {column.header}
                      {column.sortable && sortKey === column.key && (
                        <span className="text-primary">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b last:border-0">
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3">
                        <div className="h-4 bg-muted/60 rounded animate-pulse w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <>
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length} className="px-4 py-12 text-center">
                        <p className="text-muted-foreground">{emptyMessage}</p>
                      </td>
                    </tr>
                  ) : (
                    paginatedData.map((row, index) => (
                      <tr
                        key={row.id || index}
                        className={cn(
                          'border-b last:border-0 transition-colors',
                          onRowClick && 'cursor-pointer hover:bg-muted/50'
                        )}
                        onClick={() => onRowClick?.(row)}
                      >
                        {columns.map((column) => (
                          <td
                            key={column.key}
                            className={cn('px-4 py-3 text-sm', column.className)}
                          >
                            {column.cell 
                              ? column.cell(row)
                              : String(row[column.key as keyof T] ?? '')
                            }
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20">
            <p className="text-sm text-muted-foreground">
              Mostrando {startIndex + 1} - {Math.min(startIndex + pageSize, sortedData.length)} de {sortedData.length}
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="px-3 text-sm">
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
