'use client'

import { Card } from '@/components/ui/card'
import { CheckCircle2, XCircle } from 'lucide-react'

interface SEOAuditData {
  url: string
  technical: {
    sitemapPresent: boolean
    robotsTextPresent: boolean
    statusCodes: {
      code4xx: number
      code3xx: number
    }
  }
  url_improvements: {
    original: string
  }
  meta: {
    original: {
      title: string
      description: string
    }
    improved: {
      title: string
      description: string
    }
  }
}

export function TechnicalSEOMetrics({ data }: { data: SEOAuditData }) {
  const StatusIcon = ({ present }: { present: boolean }) => {
    return present ? (
      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
    ) : (
      <XCircle className="w-5 h-5 text-destructive" />
    )
  }

  return (
    <div className="space-y-6">
      {/* Sitemap & Robots */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Sitemap.xml</h3>
              <p className="text-sm text-muted-foreground">XML sitemap presence</p>
            </div>
            <StatusIcon present={data.technical.sitemapPresent} />
          </div>
          <p className="text-xs text-muted-foreground">
            {data.technical.sitemapPresent
              ? 'Sitemap found. Search engines can easily discover all pages.'
              : 'No sitemap found. Create one to help search engines crawl your site.'}
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Robots.txt</h3>
              <p className="text-sm text-muted-foreground">Crawler instructions</p>
            </div>
            <StatusIcon present={data.technical.robotsTextPresent} />
          </div>
          <p className="text-xs text-muted-foreground">
            {data.technical.robotsTextPresent
              ? 'Robots.txt allows crawler access. Properly configured.'
              : 'No robots.txt found. Add one to control crawler access.'}
          </p>
        </Card>
      </div>

      {/* Meta Tags */}
      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Meta Tags</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Title Tag</h4>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Current</p>
                <p className="text-sm text-foreground line-clamp-2">
                  {data.meta.original.title}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">
                  ✓ Improved
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {data.meta.improved.title}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h4 className="text-sm font-medium text-foreground mb-3">Meta Description</h4>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Current</p>
                <p className="text-sm text-foreground line-clamp-2">
                  {data.meta.original.description}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">
                  ✓ Improved
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {data.meta.improved.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Status Codes */}
      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">HTTP Status Codes</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">4xx Client Errors</p>
            <p className="text-3xl font-bold text-foreground">{data.technical.statusCodes.code4xx}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {data.technical.statusCodes.code4xx === 0
                ? 'No client errors found'
                : `Found ${data.technical.statusCodes.code4xx} broken links`}
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">3xx Redirects</p>
            <p className="text-3xl font-bold text-foreground">{data.technical.statusCodes.code3xx}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {data.technical.statusCodes.code3xx === 0
                ? 'No redirects found'
                : `Found ${data.technical.statusCodes.code3xx} redirects`}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}