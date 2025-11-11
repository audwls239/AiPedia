"use client"

import type React from "react"

import { ArrowLeft, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { wikiData } from "@/lib/wiki-data"
import WikiHeader from "@/components/wiki-header"

export default function DepartmentPage({ params }: { params: { id: string } }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof wikiData.articles>([])
  const [isSearching, setIsSearching] = useState(false)

  const article = wikiData.articles.find((a) => a.id === params.id)

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      const results = wikiData.articles.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
      setSearchResults(results)
      setIsSearching(true)
    }
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setIsSearching(false)
  }

  if (!article && !isSearching) {
    return (
      <div className="min-h-screen bg-background">
        <WikiHeader onLogoClick={() => {}} />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-muted-foreground text-lg">학과 정보를 찾을 수 없습니다.</p>
        </main>
      </div>
    )
  }

  if (isSearching) {
    return (
      <div className="min-h-screen bg-background">
        <WikiHeader onLogoClick={() => {}} />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Combined Back Button and Search Bar */}
          <div className="mb-8 flex gap-4 items-center">
            <button
              onClick={handleClearSearch}
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4" />
              돌아가기
            </button>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="학과명으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                autoFocus
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </div>

          {/* Search Results */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">검색 결과 ({searchResults.length}개)</h2>
            {searchResults.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">검색 결과가 없습니다.</p>
            ) : (
              <div className="grid gap-4">
                {searchResults.map((result) => (
                  <Link
                    key={result.id}
                    href={`/department/${result.id}`}
                    className="p-4 rounded-lg bg-card border border-border hover:border-accent transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-2">{result.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {result.content.split("\n")[1] || result.content.substring(0, 100)}...
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs bg-accent/10 text-accent rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <WikiHeader onLogoClick={() => {}} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Combined Back Button and Search Bar */}
        <div className="mb-8 flex gap-4 items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4" />
            돌아가기
          </Link>
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="학과명으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-accent bg-accent/10 rounded-full mb-3">
            {article.category}
          </span>
          <h1 className="text-4xl font-bold text-foreground mb-3">{article.title}</h1>
          <p className="text-sm text-muted-foreground">Updated {new Date(article.updatedAt).toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none space-y-6">
          {article.content.split("\n").map((paragraph, idx) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={idx} className="text-2xl font-bold text-foreground mt-8 mb-4">
                  {paragraph.slice(3)}
                </h2>
              )
            }
            if (paragraph.startsWith("### ")) {
              return (
                <h3 key={idx} className="text-xl font-semibold text-foreground mt-6 mb-3">
                  {paragraph.slice(4)}
                </h3>
              )
            }
            if (paragraph.trim()) {
              return (
                <p key={idx} className="text-base leading-relaxed text-foreground">
                  {paragraph}
                </p>
              )
            }
            return null
          })}

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs font-semibold text-accent bg-accent/10 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
