'use client'

import { Card } from '@/components/ui/card'
import { AlertCircle, CheckCircle2, Lightbulb, TrendingUp } from 'lucide-react'

interface SEOAuditData {
  performance: {
    score: number
    improvements: string[]
  }
  accessibility: {
    score: number
    issues: string[]
  }
  seo: {
    score: number
    improvements: string[]
  }
  bestPractices: {
    score: number
    issues: string[]
  }
  links: {
    internal: number
    external: number
    recommendedInternal: number
    recommendedExternal: number
  }
  images: {
    total: number
    withoutAltText: number
  }
}

export function RecommendationsSection({ data }: { data: SEOAuditData }) {
  const allRecommendations = [
    {
      priority: 'high',
      category: 'SEO',
      title: 'Optimize Meta Tags',
      description: 'Update meta titles and descriptions to be more concise and include target keywords.',
      items: data.seo.improvements.slice(0, 2),
    },
    {
      priority: 'high',
      category: 'Performance',
      title: 'Improve Page Speed',
      description: 'Implement performance optimizations to increase your score from 78 to 90+.',
      items: data.performance.improvements.slice(0, 2),
    },
    {
      priority: 'medium',
      category: 'Images',
      title: 'Add Missing Alt Text',
      description: `${data.images.withoutAltText} image(s) found without alt text. Add descriptive alt text to improve accessibility and SEO.`,
      items: [],
    },
    {
      priority: 'medium',
      category: 'Links',
      title: 'Increase Internal Links',
      description: `Add ${Math.max(0, data.links.recommendedInternal - data.links.internal)} more internal links to improve site structure.`,
      items: [],
    },
    {
      priority: 'medium',
      category: 'Accessibility',
      title: 'Fix Accessibility Issues',
      description: 'Improve accessibility score to ensure all users can access your content.',
      items: data.accessibility.issues.slice(0, 2),
    },
    {
      priority: 'low',
      category: 'Best Practices',
      title: 'General Best Practices',
      description: 'Your best practices score is strong. Continue following web standards.',
      items: [],
    },
  ]

  const priorityColor = {
    high: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800',
    medium: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800',
    low: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
  }

  const priorityIcon = {
    high: <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />,
    medium: <TrendingUp className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />,
    low: <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />,
  }

  const priorityText = {
    high: 'text-red-700 dark:text-red-300',
    medium: 'text-yellow-700 dark:text-yellow-300',
    low: 'text-green-700 dark:text-green-300',
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
          <p className="text-xs text-muted-foreground font-medium mb-2">HIGH PRIORITY</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {allRecommendations.filter((r) => r.priority === 'high').length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Issues to fix first</p>
        </Card>
        <Card className="p-4 bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
          <p className="text-xs text-muted-foreground font-medium mb-2">MEDIUM PRIORITY</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {allRecommendations.filter((r) => r.priority === 'medium').length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Important improvements</p>
        </Card>
        <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <p className="text-xs text-muted-foreground font-medium mb-2">LOW PRIORITY</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {allRecommendations.filter((r) => r.priority === 'low').length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Nice to improve</p>
        </Card>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {allRecommendations.map((rec, idx) => (
          <Card key={idx} className={`p-6 border ${priorityColor[rec.priority as keyof typeof priorityColor]}`}>
            <div className="flex items-start gap-3 mb-3">
              {priorityIcon[rec.priority as keyof typeof priorityIcon]}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-foreground">{rec.title}</h3>
                  <span className={`text-xs font-medium uppercase ${priorityText[rec.priority as keyof typeof priorityText]}`}>
                    {rec.priority} Priority
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{rec.category}</p>
              </div>
            </div>

            <p className="text-sm text-foreground mb-4">{rec.description}</p>

            {rec.items.length > 0 && (
              <div className="bg-background/50 p-3 rounded border border-border">
                <p className="text-xs font-medium text-muted-foreground mb-2">Action Items:</p>
                <ul className="space-y-1">
                  {rec.items.map((item, i) => (
                    <li key={i} className="text-xs text-foreground flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Implementation Timeline */}
      <Card className="p-6 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Implementation Timeline
        </h3>
        <div className="space-y-4">
          <div>
            <p className="font-medium text-foreground mb-2 text-sm">Week 1-2: High Priority</p>
            <p className="text-sm text-foreground">
              Focus on fixing performance issues and SEO meta tags. These will have the biggest impact on search rankings.
            </p>
          </div>
          <div className="border-t border-blue-200 dark:border-blue-800 pt-4">
            <p className="font-medium text-foreground mb-2 text-sm">Week 3-4: Medium Priority</p>
            <p className="text-sm text-foreground">
              Add missing alt text, improve internal linking structure, and fix accessibility issues. These improve user experience and SEO.
            </p>
          </div>
          <div className="border-t border-blue-200 dark:border-blue-800 pt-4">
            <p className="font-medium text-foreground mb-2 text-sm">Week 5+: Ongoing</p>
            <p className="text-sm text-foreground">
              Monitor your progress using this report monthly. Continue implementing best practices as you add new content.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
