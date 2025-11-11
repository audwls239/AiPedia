"use client"

import Link from "next/link"
import WikiArticle from "./wiki-article"
import type { Article } from "@/lib/wiki-data"

interface WikiGridProps {
  articles: Article[]
}

export default function WikiGrid({ articles }: WikiGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Link key={article.id} href={`/article/${article.id}`}>
          <WikiArticle article={article} />
        </Link>
      ))}
    </div>
  )
}
