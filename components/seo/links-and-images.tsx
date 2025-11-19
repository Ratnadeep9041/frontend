'use client'

import { Card } from '@/components/ui/card'
import { AlertCircle, CheckCircle2, Info, Image } from 'lucide-react'

interface SEOAuditData {
  links: {
    internal: number
    external: number
  }
  images: {
    total: number
    withoutAltText: number
    locations: { src: string; alt?: string }[]
  }
}

export function LinksAndImagesAnalysis({ data }: { data: SEOAuditData }) {
  const internalLinkStatus = data.links.internal > 0
  const externalLinkStatus = data.links.external > 0

  return (
    <div className="space-y-6">
      {/* Links Overview */}
      <Card className="p-6">
        <h3 className="font-semibold text-foreground text-lg mb-4">Links</h3>
        
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {/* Internal Links */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-medium text-foreground">Internal Links</p>
                <p className="text-xs text-muted-foreground">Links to other pages on your domain</p>
              </div>
              {internalLinkStatus ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              )}
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-3xl font-bold text-foreground">{data.links.internal}</p>
              <p className="text-xs text-muted-foreground mt-1">links found</p>
            </div>
          </div>

          {/* External Links */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-medium text-foreground">External Links</p>
                <p className="text-xs text-muted-foreground">Links to authoritative external sites</p>
              </div>
              {externalLinkStatus ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              )}
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-3xl font-bold text-foreground">{data.links.external}</p>
              <p className="text-xs text-muted-foreground mt-1">links found</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
          <p className="text-sm text-foreground">
            {internalLinkStatus && externalLinkStatus
              ? '✓ Good! Your linking structure is healthy. Keep linking related content together and to authoritative sources.'
              : 'Improve your link structure by connecting related content and linking to authoritative external sources.'}
          </p>
        </div>
      </Card>

      {/* Images Analysis */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground text-lg mb-1">Images & Alt Text</h3>
            <p className="text-sm text-muted-foreground">Image optimization and accessibility</p>
          </div>
          {data.images.withoutAltText === 0 ? (
            <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
          ) : (
            <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          )}
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-xs text-muted-foreground font-medium mb-1">TOTAL IMAGES</p>
            <p className="text-3xl font-bold text-foreground">{data.images.total}</p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-xs text-muted-foreground font-medium mb-1">WITH ALT TEXT</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {data.images.total - data.images.withoutAltText}
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-xs text-muted-foreground font-medium mb-1">MISSING ALT TEXT</p>
            <p
              className={`text-3xl font-bold ${data.images.withoutAltText === 0 ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}
            >
              {data.images.withoutAltText}
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-4">
          <div className="w-full bg-border rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-green-600 dark:bg-green-400"
              style={{
                width: `${((data.images.total - data.images.withoutAltText) / data.images.total) * 100}%`,
              }}
            ></div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
            <p className="text-sm text-foreground">
              {data.images.withoutAltText === 0
                ? '✓ Perfect! All images have alt text. Great for SEO and accessibility!'
                : `${data.images.withoutAltText} image(s) missing alt text. Add descriptive alt text to all images for better SEO and accessibility.`}
            </p>
          </div>
        </div>

        {/* Image Details */}
        {data.images.locations.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Image className="w-4 h-4" />
              Image Details
            </p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {data.images.locations.map((image, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border ${
                    image.alt
                      ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                      : 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800'
                  }`}
                >
                  <p className="text-xs font-mono text-muted-foreground truncate mb-1">{image.src}</p>
                  <p className="text-sm text-foreground">
                    {image.alt ? (
                      <>
                        <span className="text-green-600 dark:text-green-400 font-semibold">✓</span> {image.alt}
                      </>
                    ) : (
                      <>
                        <span className="text-yellow-600 dark:text-yellow-400 font-semibold">!</span> No alt text
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}