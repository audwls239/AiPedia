"use client"

import { X } from "lucide-react"
import type { Article } from "@/lib/wiki-data"

interface WikiModalProps {
  article: Article
  onClose: () => void
}

export default function WikiModal({ article, onClose }: WikiModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-start justify-between">
          <div className="flex-1">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-accent bg-accent/10 rounded-full mb-3">
              {article.category}
            </span>
            <h2 className="text-3xl font-bold text-foreground">{article.title}</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Updated {new Date(article.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <button onClick={onClose} className="ml-4 p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 wiki-content">
          {article.content.split("\n").map((paragraph, idx) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={idx} className="text-2xl font-bold text-foreground mt-6 mb-3">
                  {paragraph.slice(3)}
                </h2>
              )
            }
            if (paragraph.startsWith("### ")) {
              return (
                <h3 key={idx} className="text-xl font-semibold text-foreground mt-4 mb-2">
                  {paragraph.slice(4)}
                </h3>
              )
            }
            if (paragraph.trim()) {
              return (
                <p key={idx} className="text-base leading-relaxed mb-4 text-foreground">
                  {paragraph}
                </p>
              )
            }
            return null
          })}

          {/* Tags 
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs font-semibold text-accent bg-accent/10 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>*/}
        </div>
      </div>
    </div>
  )
}
