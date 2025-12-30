"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function Home() {
  const [keyword, setKeyword] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (keyword.trim()) {
      router.push(`/${encodeURIComponent(keyword.trim())}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-primary mb-2 text-balance">Ai Pedia</h1>
          <p className="text-muted-foreground text-lg">AI 기반 지식 백과사전</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="w-full">
          <div className="flex gap-2">
            <Input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="검색어를 입력하세요..."
              className="h-14 text-lg px-6 bg-card border-2 focus-visible:ring-primary"
            />
            <Button
              type="submit"
              size="lg"
              className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Search className="w-5 h-5 mr-2" />
              검색
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
