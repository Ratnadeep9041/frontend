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

     
    </div>
  )
}