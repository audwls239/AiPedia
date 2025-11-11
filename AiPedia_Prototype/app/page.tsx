"use client"

import { useState, useMemo } from "react"
import WikiHeader from "@/components/wiki-header"
import SearchBar from "@/components/search-bar"
import WikiGrid from "@/components/wiki-grid"
import WikiHome from "@/components/wiki-home"
import { wikiData } from "@/lib/wiki-data"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isHome, setIsHome] = useState(true)

  const filteredArticles = useMemo(() => {
    return wikiData.articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = !selectedCategory || article.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const categories = Array.from(new Set(wikiData.articles.map((a) => a.category)))

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setIsHome(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <WikiHeader
        onLogoClick={() => {
          setIsHome(true)
          setSearchQuery("")
          setSelectedCategory(null)
        }}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isHome ? (
          <WikiHome onSearch={handleSearch} />
        ) : (
          <div className="space-y-8">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearch}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            {searchQuery || selectedCategory ? (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {searchQuery ? `"${searchQuery}" 검색 결과` : `${selectedCategory}`}
                </h2>
                {filteredArticles.length > 0 ? (
                  <WikiGrid articles={filteredArticles} />
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">검색 결과가 없습니다.</p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">추천 문서</h2>
                <WikiGrid articles={wikiData.articles.slice(0, 6)} />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
