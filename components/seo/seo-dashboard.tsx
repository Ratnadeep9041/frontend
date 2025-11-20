'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TechnicalSEOMetrics } from './technical-seo-metrics'
import { PerformanceScores } from './performance-score'
import { LinksAndImagesAnalysis } from './links-and-images'
import { AlertCircle } from 'lucide-react'

export interface SEOAuditData {
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
      currentSchema: string[]
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

export function SEODashboard() {
  const [data, setData] = useState<SEOAuditData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [urlInput, setUrlInput] = useState('')
  const [showDialog, setShowDialog] = useState(true)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const fetchAuditData = async (url: string) => {
    try {
      setIsLoading(true)
      setError(null)
      setSubmitError(null)
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/audit?url=${encodeURIComponent(url)}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch audit data: ${response.statusText}`)
      }
      
      const auditData = await response.json()
      console.log({auditData})
      setData(auditData)
      setShowDialog(false)
    } catch (err) {
      console.error('[v0] Fetch error:', err)
      setError(err instanceof Error ? err.message : 'Failed to load SEO audit data')
      setSubmitError(err instanceof Error ? err.message : 'Failed to load SEO audit data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitUrl = (e: React.FormEvent) => {
    e.preventDefault()
    if (!urlInput.trim()) {
      setSubmitError('Please enter a valid URL')
      return
    }
    fetchAuditData(urlInput)
  }

  if (showDialog) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">SEO Audit</h1>
          <p className="text-muted-foreground text-sm mb-6">Enter a URL to analyze its SEO performance</p>
          
          <form onSubmit={handleSubmitUrl} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-foreground mb-2">
                Website URL
              </label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full"
              />
            </div>
            
            {submitError && (
              <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-sm text-destructive">{submitError}</p>
              </div>
            )}
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Analyzing...' : 'Analyze URL'}
            </Button>
          </form>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading SEO Audit...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-4" />
          <p className="text-foreground font-medium">{error || 'Failed to load SEO data'}</p>
        </div>
      </div>
    )
  }

  const scoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400'
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">SEO Audit Report</h1>
              <p className="text-muted-foreground">{data.url}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="mt-1">
                {new Date(data.timestamp).toLocaleDateString()}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowDialog(true)
                  setUrlInput('')
                  setData(null)
                }}
              >
                New Audit
              </Button>
            </div>
          </div>

          {/* Quick Score Overview */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
            <Card className="p-4">
              <p className="text-xs text-muted-foreground font-medium mb-2">PERFORMANCE</p>
              <p className={`text-2xl font-bold ${scoreColor(data.performance.score)}`}>
                {data.performance.score}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground font-medium mb-2">ACCESSIBILITY</p>
              <p className={`text-2xl font-bold ${scoreColor(data.accessibility.score)}`}>
                {data.accessibility.score}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground font-medium mb-2">SEO</p>
              <p className={`text-2xl font-bold ${scoreColor(data.seo.score)}`}>
                {data.seo.score}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground font-medium mb-2">BEST PRACTICES</p>
              <p className={`text-2xl font-bold ${scoreColor(data.bestPractices.score)}`}>
                {data.bestPractices.score}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground font-medium mb-2">OVERALL</p>
              <p className={`text-2xl font-bold ${scoreColor(Math.round((data.performance.score + data.accessibility.score + data.seo.score + data.bestPractices.score) / 4))}`}>
                {Math.round((data.performance.score + data.accessibility.score + data.seo.score + data.bestPractices.score) / 4)}
              </p>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="technical" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="links">Links & Images</TabsTrigger>
          </TabsList>

          <TabsContent value="technical" className="space-y-6">
            <TechnicalSEOMetrics data={data} />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceScores data={data} />
          </TabsContent>

          <TabsContent value="links" className="space-y-6">
            <LinksAndImagesAnalysis data={data} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
