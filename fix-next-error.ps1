# Script untuk mengatasi masalah __nextjs_original-stack-frames
# Jalankan: .\fix-next-error.ps1

Write-Host "`n========================================" -ForegroundColor Yellow
Write-Host "Fix Next.js Stack Frames Error" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Yellow

# Step 1: Stop any running Next.js server
Write-Host "[1/4] Mencoba stop development server yang sedang berjalan..." -ForegroundColor Cyan
$nextProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*next*" }
if ($nextProcesses) {
    $nextProcesses | Stop-Process -Force
    Write-Host "  ✓ Server dihentikan" -ForegroundColor Green
} else {
    Write-Host "  ℹ Tidak ada server yang berjalan" -ForegroundColor Gray
}

# Step 2: Clean .next folder
Write-Host "`n[2/4] Menghapus folder .next dan cache..." -ForegroundColor Cyan
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "  ✓ Folder .next dihapus" -ForegroundColor Green
} else {
    Write-Host "  ℹ Folder .next tidak ditemukan" -ForegroundColor Gray
}

# Step 3: Clean node_modules/.cache
Write-Host "`n[3/4] Menghapus cache node_modules..." -ForegroundColor Cyan
if (Test-Path "node_modules/.cache") {
    Remove-Item -Recurse -Force "node_modules/.cache"
    Write-Host "  ✓ Cache dihapus" -ForegroundColor Green
} else {
    Write-Host "  ℹ Cache tidak ditemukan" -ForegroundColor Gray
}

# Step 4: Instructions
Write-Host "`n[4/4] Cleanup selesai!" -ForegroundColor Green
Write-Host "`n========================================" -ForegroundColor Yellow
Write-Host "Langkah selanjutnya:" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Yellow
Write-Host "1. Jalankan development server:" -ForegroundColor White
Write-Host "   pnpm dev" -ForegroundColor Cyan
Write-Host "`n2. Buka browser dan clear cache:" -ForegroundColor White
Write-Host "   - Tekan Ctrl+Shift+Delete" -ForegroundColor Cyan
Write-Host "   - Atau gunakan Incognito/Private mode" -ForegroundColor Cyan
Write-Host "`n3. Jika masih ada error, restart browser" -ForegroundColor White
Write-Host "`n========================================`n" -ForegroundColor Yellow

# Optional: Auto restart server
$restart = Read-Host "Restart development server sekarang? (Y/N)"
if ($restart -eq "Y" -or $restart -eq "y") {
    Write-Host "`nMemulai development server..." -ForegroundColor Cyan
    pnpm dev
}


