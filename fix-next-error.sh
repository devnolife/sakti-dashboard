#!/bin/bash
# Script untuk mengatasi masalah __nextjs_original-stack-frames
# Jalankan: bash fix-next-error.sh

echo ""
echo "========================================"
echo "Fix Next.js Stack Frames Error"
echo "========================================"
echo ""

# Step 1: Stop any running Next.js server
echo "[1/4] Mencoba stop development server yang sedang berjalan..."
pkill -f "next dev" 2>/dev/null && echo "  ✓ Server dihentikan" || echo "  ℹ Tidak ada server yang berjalan"

# Step 2: Clean .next folder
echo ""
echo "[2/4] Menghapus folder .next dan cache..."
if [ -d ".next" ]; then
    rm -rf .next
    echo "  ✓ Folder .next dihapus"
else
    echo "  ℹ Folder .next tidak ditemukan"
fi

# Step 3: Clean node_modules/.cache
echo ""
echo "[3/4] Menghapus cache node_modules..."
if [ -d "node_modules/.cache" ]; then
    rm -rf node_modules/.cache
    echo "  ✓ Cache dihapus"
else
    echo "  ℹ Cache tidak ditemukan"
fi

# Step 4: Instructions
echo ""
echo "[4/4] Cleanup selesai!"
echo ""
echo "========================================"
echo "Langkah selanjutnya:"
echo "========================================"
echo ""
echo "1. Jalankan development server:"
echo "   pnpm dev"
echo ""
echo "2. Buka browser dan clear cache:"
echo "   - Tekan Ctrl+Shift+Delete"
echo "   - Atau gunakan Incognito/Private mode"
echo ""
echo "3. Jika masih ada error, restart browser"
echo ""
echo "========================================"
echo ""

# Optional: Auto restart server
read -p "Restart development server sekarang? (Y/N): " restart
if [ "$restart" = "Y" ] || [ "$restart" = "y" ]; then
    echo ""
    echo "Memulai development server..."
    pnpm dev
fi


