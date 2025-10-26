import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

interface PageTemplateProps {
  title: string
  description?: string
  icon?: React.ReactNode
  badge?: {
    text: string
    variant?: "default" | "secondary" | "destructive" | "outline"
  }
  backHref?: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export default function PageTemplate({
  title,
  description,
  icon,
  badge,
  backHref,
  children,
  actions
}: PageTemplateProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {backHref && (
            <Link href={backHref}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </Link>
          )}
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                {icon}
              </div>
            )}
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                {badge && (
                  <Badge variant={badge.variant || "default"}>
                    {badge.text}
                  </Badge>
                )}
              </div>
              {description && (
                <p className="text-muted-foreground mt-1">{description}</p>
              )}
            </div>
          </div>
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  )
}

// Template untuk halaman dengan status cards
export function StatusCardsTemplate({
  title,
  description,
  icon,
  cards,
  children
}: {
  title: string
  description?: string
  icon?: React.ReactNode
  cards: Array<{
    title: string
    value: string | number
    description?: string
    trend?: string
    icon?: React.ReactNode
    color?: string
  }>
  children?: React.ReactNode
}) {
  return (
    <PageTemplate title={title} description={description} icon={icon}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <Card key={index} className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              {card.icon && (
                <div className={`p-2 rounded-full ${card.color || 'bg-blue-100 dark:bg-blue-900'}`}>
                  {card.icon}
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              {card.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {card.description}
                </p>
              )}
              {card.trend && (
                <p className="text-xs text-green-600 font-medium mt-1">
                  {card.trend}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {children}
    </PageTemplate>
  )
}

// Template untuk halaman dengan tabel
export function TablePageTemplate({
  title,
  description,
  icon,
  tableTitle,
  tableDescription,
  children
}: {
  title: string
  description?: string
  icon?: React.ReactNode
  tableTitle: string
  tableDescription?: string
  children: React.ReactNode
}) {
  return (
    <PageTemplate
      title={title}
      description={description}
      icon={icon}
      actions={
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Data
        </Button>
      }
    >
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>{tableTitle}</CardTitle>
          {tableDescription && (
            <CardDescription>{tableDescription}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </PageTemplate>
  )
}

