#!/usr/bin/env pwsh
# Script to replace all Prisma imports with TODO comments in action files

$files = @(
    "course-actions.ts",
    "grade-actions.ts",
    "laboratory-actions.ts",
    "library-actions.ts",
    "schedule-actions.ts"
)

foreach ($file in $files) {
    $path = "d:\devnolife\apps-ft\dashboard\app\actions\$file"
    if (Test-Path $path) {
        Write-Host "Processing $file..." -ForegroundColor Yellow
        $content = Get-Content $path -Raw
        $content = $content -replace "import { prisma } from '@/lib/prisma'", "// TODO: Replace with GraphQL queries`n// import { prisma } from '@/lib/prisma'"
        $content = $content -replace 'import { prisma } from "@/lib/prisma"', '// TODO: Replace with GraphQL queries`n// import { prisma } from "@/lib/prisma"'
        Set-Content $path $content -NoNewline
        Write-Host "✓ Updated $file" -ForegroundColor Green
    }
}

Write-Host "`nDone! All files updated." -ForegroundColor Cyan
