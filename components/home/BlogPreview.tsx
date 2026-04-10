'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function BlogPreview() {
  const featured = BLOG_POSTS.filter(p => p.featured)

  return (
    <section id="blog" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-16"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-primary" />
              Blog
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-4">
              Artículos y Tips
              <br />
              <span className="text-gradient">para tu negocio</span>
            </h2>
          </div>

          <Link href="/blog">
            <Button variant="outline" className="gap-2">
              Ver Todo
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 p-6 h-full flex flex-col">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime} min
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold font-heading mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
                  {post.excerpt}
                </p>

                {/* Category */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                    <Tag className="h-3 w-3" />
                    {post.category}
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
