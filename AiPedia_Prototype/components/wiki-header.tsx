"use client"

interface WikiHeaderProps {
  onLogoClick?: () => void
}

export default function WikiHeader({ onLogoClick }: WikiHeaderProps) {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button onClick={onLogoClick} className="inline-block hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Pedia</h1>
              {/*<p className="text-sm text-muted-foreground">University Departments Portal</p>*/}
            </div>
          </div>
        </button>
      </div>
    </header>
  )
}
