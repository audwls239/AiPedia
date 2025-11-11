"use client"

import { Tag, ChevronRight } from "lucide-react"
import type { Article } from "@/lib/wiki-data"

interface WikiArticleProps {
  article: Article
}

export default function WikiArticle({ article }: WikiArticleProps) {
  return (
    <div className="text-left p-5 rounded-lg border border-border bg-card hover:bg-secondary hover:border-accent transition-all duration-200 group cursor-pointer">
      <div className="space-y-3">
        <div>
          {/*<span className="inline-block px-3 py-1 text-xs font-semibold text-accent bg-accent/10 rounded-full mb-2">
            {article.category}
          </span>*/}
          <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
            {article.title}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{article.content.substring(0, 100)}...</p>

        {/*<div className="flex flex-wrap gap-1">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>*/}

        <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
          <span>{/*{new Date(article.updatedAt).toLocaleDateString()}*/}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  )
}
