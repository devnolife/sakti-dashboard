#!/usr/bin/env pwsh
# Clear Next.js cache and restart

Write-Host "Clearing Next.js cache..." -ForegroundColor Yellow

# Remove .next directory
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "✓ Cleared .next directory" -ForegroundColor Green
}

# Remove node_modules/.cache
if (Test-Path "node_modules/.cache") {
    Remove-Item -Recurse -Force "node_modules/.cache"
    Write-Host "✓ Cleared node_modules cache" -ForegroundColor Green
}

Write-Host "`nCache cleared! Ready to restart dev server." -ForegroundColor Cyan
Write-Host "Run: npm run dev" -ForegroundColor Cyan
