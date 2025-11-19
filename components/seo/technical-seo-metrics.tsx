'use client'

import { Card } from '@/components/ui/card'
import { CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react'

interface SEOAuditData {
  url: string
  timestamp: string
  technical: {
    sitemapPresent: boolean
    robotsTextPresent: boolean
    canonicalTagPresent: boolean
    schemaMarkup: string[]
    schemaValidation: {
      valid: boolean
      errors: number
      warnings: number
      currentSchema: string
      improvements: string[]
    } | null
    statusCodes: {
      code4xx: number
      code3xx: number
    }
  }
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
    locations: { src: string, alt?: string }[]
  }
  url_improvements: {
    original: string
    improved: string
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
  html: string
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
      {/* Sitemap, Robots & Canonical */}
      <div className="grid md:grid-cols-3 gap-4">
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

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Canonical Tag</h3>
              <p className="text-sm text-muted-foreground">Duplicate prevention</p>
            </div>
            <StatusIcon present={data.technical.canonicalTagPresent} />
          </div>
          <p className="text-xs text-muted-foreground">
            {data.technical.canonicalTagPresent
              ? 'Canonical tag present. Prevents duplicate content issues.'
              : 'No canonical tag found. Add one to specify the preferred URL.'}
          </p>
        </Card>
      </div>

      {/* Schema Markup */}
      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Schema.org Markup</h3>
        <div className="space-y-4">
          {/* Schema Status Overview */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Types Found</p>
              <p className="text-2xl font-bold text-foreground">
                {data.technical.schemaMarkup.length}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {data.technical.schemaMarkup.length === 0
                  ? 'No schema markup detected'
                  : data.technical.schemaMarkup.join(', ')}
              </p>
            </div>

            {data.technical.schemaValidation && (
              <>
                <div
                  className={`p-4 rounded-lg ${
                    data.technical.schemaValidation.errors === 0
                      ? 'bg-green-50 dark:bg-green-950'
                      : 'bg-red-50 dark:bg-red-950'
                  }`}
                >
                  <p className="text-sm text-muted-foreground mb-1">Validation Errors</p>
                  <p
                    className={`text-2xl font-bold ${
                      data.technical.schemaValidation.errors === 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {data.technical.schemaValidation.errors}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {data.technical.schemaValidation.errors === 0
                      ? 'No validation errors'
                      : 'Fix these errors immediately'}
                  </p>
                </div>

                <div
                  className={`p-4 rounded-lg ${
                    data.technical.schemaValidation.warnings === 0
                      ? 'bg-blue-50 dark:bg-blue-950'
                      : 'bg-yellow-50 dark:bg-yellow-950'
                  }`}
                >
                  <p className="text-sm text-muted-foreground mb-1">Warnings</p>
                  <p
                    className={`text-2xl font-bold ${
                      data.technical.schemaValidation.warnings === 0
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-yellow-600 dark:text-yellow-400'
                    }`}
                  >
                    {data.technical.schemaValidation.warnings}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {data.technical.schemaValidation.warnings === 0
                      ? 'No warnings'
                      : 'Consider addressing these'}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Schema Improvements */}
          {data.technical.schemaValidation?.improvements &&
            data.technical.schemaValidation.improvements.length > 0 && (
              <div className="space-y-3 border-t border-border pt-6">
                <h4 className="text-sm font-medium text-foreground">Improvements</h4>
                {data.technical.schemaValidation.improvements.map(
                  (improvement, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800 p-4 rounded"
                    >
                      <p className="text-sm text-foreground">{improvement}</p>
                    </div>
                  )
                )}
              </div>
            )}

          {/* Current Schema */}
          {data.technical.schemaValidation?.currentSchema && (
            <div className="border-t border-border pt-6">
              <h4 className="text-sm font-medium text-foreground mb-3">
                Current Schema Markup
              </h4>
              <pre className="bg-muted p-4 rounded text-xs overflow-x-auto text-foreground max-h-96">
                <code>{data.technical.schemaValidation.currentSchema}</code>
              </pre>
            </div>
          )}
        </div>
      </Card>

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
            <p className="text-3xl font-bold text-foreground">
              {data.technical.statusCodes.code4xx}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {data.technical.statusCodes.code4xx === 0
                ? 'No client errors found'
                : `Found ${data.technical.statusCodes.code4xx} broken links`}
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">3xx Redirects</p>
            <p className="text-3xl font-bold text-foreground">
              {data.technical.statusCodes.code3xx}
            </p>
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