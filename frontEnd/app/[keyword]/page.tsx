"use client"

import type React from "react"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface PageProps {
  params: Promise<{
    keyword: string
  }>
}

interface ContentData {
  keyword: string
  contents: string
}

export default function KeywordPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const keyword = decodeURIComponent(resolvedParams.keyword)
  const router = useRouter()

  const [searchKeyword, setSearchKeyword] = useState("")
  const [content, setContent] = useState<ContentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/contents?keyword=${encodeURIComponent(keyword)}`)

        if (!response.ok) {
          throw new Error("컨텐츠를 불러오는데 실패했습니다.")
        }

        const data: ContentData = await response.json()
        setContent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.")
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [keyword])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchKeyword.trim()) {
      router.push(`/${encodeURIComponent(searchKeyword.trim())}`)
      setSearchKeyword("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Search */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              Ai피디아
            </button>
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="검색어를 입력하세요..."
                  className="bg-background border"
                />
                <Button type="submit" size="sm" variant="default">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {loading ? (
          <Card className="p-12">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <p className="text-lg text-muted-foreground">컨텐츠 생성중입니다.</p>
            </div>
          </Card>
        ) : error ? (
          <Card className="p-8 border-destructive">
            <div className="text-center">
              <p className="text-destructive font-semibold mb-2">오류 발생</p>
              <p className="text-muted-foreground">{error}</p>
            </div>
          </Card>
        ) : content ? (
          <div className="space-y-6">
            {/* Keyword Title */}
            <div className="border-b pb-4">
              <h1 className="text-4xl font-bold text-foreground text-balance">{content.keyword}</h1>
            </div>

            {/* Markdown Content */}
            <Card className="p-8">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => <h1 className="text-3xl font-bold mt-6 mb-4 text-foreground">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3 text-foreground">{children}</h2>,
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">{children}</h3>
                    ),
                    p: ({ children }) => <p className="mb-4 leading-relaxed text-foreground">{children}</p>,
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-4 space-y-2 text-foreground">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground">{children}</ol>
                    ),
                    li: ({ children }) => <li className="leading-relaxed text-foreground">{children}</li>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children }) => (
                      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>
                    ),
                    a: ({ href, children }) => (
                      <a href={href} className="text-primary hover:underline">
                        {children}
                      </a>
                    ),
                  }}
                >
                  {content.contents}
                </ReactMarkdown>
              </div>
            </Card>
          </div>
        ) : null}
      </main>
    </div>
  )
}
