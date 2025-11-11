"use client"

import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"
import { wikiData } from "@/lib/wiki-data"
import WikiGrid from "./wiki-grid"

interface WikiHomeProps {
  onSearch: (query: string) => void
}

export default function WikiHome({ onSearch }: WikiHomeProps) {
  const [searchInput, setSearchInput] = useState("")

  const categories = Array.from(new Set(wikiData.articles.map((a) => a.category)))

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      onSearch(searchInput)
    }
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-16 border-b-2 border-accent">
        <h1 className="text-5xl font-bold text-foreground mb-4">AI Pedia</h1>
        <p className="text-xl text-muted-foreground mb-8">다양한 주제를 소개하는 종합 정보 위키</p>
        <form onSubmit={handleSearchSubmit} className="flex max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="주제를 검색해보세요..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full px-6 py-3 bg-card border-2 border-accent rounded-l-lg focus:outline-none focus:border-accent/80 text-foreground placeholder-muted-foreground"
            />
          </div>
          <button
            type="submit"
            className="bg-accent hover:bg-accent/90 px-6 py-3 rounded-r-lg font-semibold transition-colors flex items-center gap-2 text-accent-foreground"
          >
            <Search size={20} />
            검색
          </button>
        </form>
      </div>

      {/* Categories Section */}
      {/*
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">주요 분야</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category}
              className="bg-card rounded-lg p-6 border border-border hover:border-accent transition-colors cursor-pointer text-center"
              onClick={() => onSearch(category)}
            >
              <h3 className="text-lg font-semibold text-accent">{category}</h3>
              <p className="text-sm text-muted-foreground mt-2">탐색</p>
            </div>
          ))}
        </div>
      </div>
      */}

      {/* Recommended Documents Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">추천 문서</h2>
        <WikiGrid articles={wikiData.articles.slice(0, 6)} />
      </div>
    </div>
  )
}
