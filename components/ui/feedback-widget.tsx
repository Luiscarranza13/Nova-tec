'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquarePlus, ThumbsUp, ThumbsDown, X, Send, CheckCircle2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'

export function FeedbackWidget() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<'rating' | 'comment' | 'done'>('rating')
  const [rating, setRating] = useState<'positive' | 'negative' | null>(null)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRating = (r: 'positive' | 'negative') => {
    setRating(r)
    setStep('comment')
  }

  const submit = async () => {
    setLoading(true)
    try {
      await supabase.from('page_views').insert({
        path: `feedback:${window.location.pathname}`,
        referrer: rating,
        user_agent: comment || null,
      })
      setStep('done')
    } catch { /* non-critical */ }
    setLoading(false)
  }

  const reset = () => { setOpen(false); setTimeout(() => { setStep('rating'); setRating(null); setComment('') }, 300) }

  return (
    <div className="fixed bottom-24 left-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 w-72 rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
              <p className="text-sm font-semibold">¿Cómo fue tu experiencia?</p>
              <button onClick={reset} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4">
              <AnimatePresence mode="wait">
                {step === 'rating' && (
                  <motion.div key="rating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex gap-3 justify-center py-2">
                    <button onClick={() => handleRating('positive')}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border/50 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group">
                      <ThumbsUp className="h-6 w-6 text-muted-foreground group-hover:text-emerald-500 transition-colors" />
                      <span className="text-xs text-muted-foreground">Buena</span>
                    </button>
                    <button onClick={() => handleRating('negative')}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border/50 hover:border-red-500/50 hover:bg-red-500/5 transition-all group">
                      <ThumbsDown className="h-6 w-6 text-muted-foreground group-hover:text-red-500 transition-colors" />
                      <span className="text-xs text-muted-foreground">Mejorable</span>
                    </button>
                  </motion.div>
                )}

                {step === 'comment' && (
                  <motion.div key="comment" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                    className="space-y-3">
                    <p className="text-xs text-muted-foreground">
                      {rating === 'positive' ? '¡Genial! ¿Algo que destacar?' : '¿Qué podríamos mejorar?'}
                    </p>
                    <textarea
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      placeholder="Escribe tu comentario (opcional)..."
                      rows={3}
                      className="w-full text-xs rounded-xl border border-border/50 bg-background/80 p-3 resize-none focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <button onClick={submit} disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60">
                      {loading ? 'Enviando...' : <><Send className="h-3.5 w-3.5" />Enviar feedback</>}
                    </button>
                  </motion.div>
                )}

                {step === 'done' && (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-2 py-4 text-center">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                    <p className="text-sm font-semibold">¡Gracias por tu feedback!</p>
                    <p className="text-xs text-muted-foreground">Nos ayuda a mejorar.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-11 h-11 rounded-full bg-card border border-border/60 shadow-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
        aria-label="Feedback"
      >
        <MessageSquarePlus className="h-5 w-5" />
      </motion.button>
    </div>
  )
}
