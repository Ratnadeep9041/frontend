"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface Schema {
  [key: string]: any
}

interface SchemaFullViewProps {
  data: string[]
}

export function SchemaFullView({ data }: SchemaFullViewProps) {
  let schemas: Schema[] = []
  let parseError: string | null = null
  console.log({data})  
  try {
    data.forEach(item => {
      let parsed = typeof item === "string" ? JSON.parse(item) : item;
      if (Array.isArray(parsed["@graph"])) {
        schemas.push(...parsed["@graph"]);
      } else if (typeof parsed === "object") {
        schemas.push(parsed);
      }
    });
  } catch (error) {
    parseError = "Invalid JSON format"
  }

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (parseError) {
    return (
      <div className="flex flex-col  bg-white">     
          <p className="text-gray-300 text-sm">{parseError}</p>     
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-white">
      {/* Schemas */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-4">
          {schemas.map((schema, index) => (
            <SchemaAccordion
              key={index}
              schema={schema}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface SchemaAccordionProps {
  schema: Schema
  index: number
  isOpen: boolean
  onToggle: () => void
}

function SchemaAccordion({ schema, index, isOpen, onToggle }: SchemaAccordionProps) {
  const schemaType = schema["@type"] || `Schema ${index + 1}`

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Accordion Header */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between border-b border-gray-300 transition-colors"
      >
        <h2 className="text-xl font-semibold text-black">{schemaType}</h2>
        <ChevronDown className={`h-5 w-5 text-black transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="px-6 py-6 bg-white">
          <div className="space-y-6">
            {Object.entries(schema)
              .filter(([key]) => !key.startsWith("@"))
              .map(([key, value], idx) => (
                <PropertyRow key={idx} propertyKey={key} value={value} />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface PropertyRowProps {
  propertyKey: string
  value: any
  depth?: number
}

function PropertyRow({ propertyKey, value, depth = 0 }: PropertyRowProps) {
  const isComplex = typeof value === "object" && value !== null
  const paddingClass = depth > 0 ? "pl-6" : ""

  return (
    <div className={paddingClass}>
      <div className="flex gap-8">
        <div className="min-w-48">
          <code className="text-sm font-mono font-semibold text-black break-words">{propertyKey}</code>
        </div>
        <div className="flex-1">
          {isComplex ? (
            <div className="space-y-3">
              {Array.isArray(value) ? (
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">Array ({value.length} items)</p>
                  <div className="space-y-4 bg-gray-50 p-4 rounded border border-gray-300">
                    {value.map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        {typeof item === "object" && item !== null ? (
                          <div className="space-y-2">
                            {Object.entries(item).map(([k, v]) => (
                              <div key={k} className="flex gap-4">
                                <code className="text-xs font-mono text-gray-700 min-w-32">{k}:</code>
                                <span className="text-sm text-gray-800">{formatDisplayValue(v)}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-800">{formatDisplayValue(item)}</p>
                        )}
                        {idx < value.length - 1 && <hr className="border-gray-300" />}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded border border-gray-300 space-y-2">
                  {Object.entries(value).map(([k, v]) => (
                    <div key={k} className="flex gap-4">
                      <code className="text-xs font-mono text-gray-700 min-w-32">{k}:</code>
                      <span className="text-sm text-gray-800 break-words">{formatDisplayValue(v)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-800 break-words">{formatDisplayValue(value)}</p>
          )}
        </div>
      </div>
      <hr className="border-gray-300 mt-6" />
    </div>
  )
}

function formatDisplayValue(value: any): string {
  if (value === null) return "null"
  if (value === undefined) return "undefined"
  if (typeof value === "string") return value
  if (typeof value === "number") return value.toString()
  if (typeof value === "boolean") return value ? "true" : "false"
  if (Array.isArray(value)) {
    return `[${value.join(", ")}]`
  }
  if (typeof value === "object") {
    return JSON.stringify(value, null, 2)
  }
  return String(value)
}
