'use client'

import { Card } from '@/components/ui/card'
import { CheckCircle2, AlertCircle } from 'lucide-react'

interface SEOAuditData {
  performance: {
    improvements: string[]
  }
  accessibility: {
    issues: string[]
  }
  seo: {
    improvements: string[]
  }
  bestPractices: {
    issues: string[]
  }
}

export function PerformanceScores({ data }: { data: SEOAuditData }) {
  const IssueCard = ({ title, items }: { title: string; items: string[] }) => {
    return (
      <Card className="p-6">
        <h3 className="font-semibold text-foreground text-lg mb-4">{title}</h3>

        {items.length > 0 ? (
          <ul className="space-y-3">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-600 dark:text-yellow-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
            All checks passed!
          </p>
        )}
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <IssueCard title="Performance" items={data.performance.improvements} />
        <IssueCard title="Accessibility" items={data.accessibility.issues} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <IssueCard title="SEO" items={data.seo.improvements} />
        <IssueCard title="Best Practices" items={data.bestPractices.issues} />
      </div>

      {/* Detailed Improvement Guide */}
      <Card className="p-6 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          How to Improve
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Performance Tips</h4>
            <ul className="space-y-1.5 text-sm text-foreground">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">→</span>
                <span>Compress and optimize all images (use WebP format)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">→</span>
                <span>Minify and defer non-critical JavaScript</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">→</span>
                <span>Enable GZIP compression on server</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">→</span>
                <span>Implement lazy loading for images and content</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}