# SIMAK (Sistem Informasi Manajemen Akademik)

SIMAK adalah modul baru dalam dashboard SAKTI yang dirancang khusus untuk mengelola jadwal perkuliahan dan mata kuliah secara modern dan efisien.

## Fitur Utama

### 🎯 Dashboard Overview
- **Real-time Statistics**: Total program studi, mata kuliah, jadwal aktif, dan status sistem
- **System Health Monitoring**: Monitoring kesehatan database, API response, dan storage
- **Recent Activities**: Timeline aktivitas terbaru dalam sistem
- **Quick Actions**: Akses cepat ke fitur utama dengan navigasi yang mudah

### 📚 Manajemen Program Studi
- **Daftar Program Studi**: View lengkap semua program studi dengan statistik
- **CRUD Operations**: Tambah, edit, dan kelola program studi
- **Color Theming**: Setiap prodi memiliki color scheme khusus
- **Specialization Management**: Kelola spesialisasi untuk setiap program studi
- **Class Management**: Atur kelas reguler untuk setiap prodi

### 📖 Manajemen Mata Kuliah
- **Course Database**: Database lengkap mata kuliah dengan filtering canggih
- **Bulk Import**: Import mata kuliah dalam jumlah besar via file
- **Multi-filter Search**: Filter berdasarkan prodi, semester, kelas, dan tipe
- **Lecturer Assignment**: Assign dosen pengampu (dosen 1 dan dosen 2)
- **Regular vs Non-Regular**: Dukungan untuk kelas reguler dan non-reguler

### 🤖 AI-Powered Schedule Generation
- **Automatic Schedule Creation**: Generate jadwal otomatis dengan AI
- **Conflict Resolution**: Deteksi dan resolusi otomatis konflik jadwal
- **Custom Configuration**: Konfigurasi khusus untuk setiap generasi
- **Progress Tracking**: Real-time progress monitoring selama generasi
- **Generation History**: Riwayat lengkap generasi jadwal dengan status

### 📊 Export & Download
- **Multiple Formats**: Export dalam format Excel, PDF, dan JSON
- **Flexible Selection**: Export per prodi atau semua jadwal sekaligus
- **Download History**: Riwayat download dengan informasi detail
- **Quick Export**: Template quick export untuk kebutuhan umum

### ⚙️ System Configuration
- **Time Slots Management**: Konfigurasi slot waktu perkuliahan
- **Academic Settings**: Pengaturan tahun akademik dan semester default
- **System Health Dashboard**: Monitoring real-time status sistem
- **Config Backup**: Sistem backup otomatis untuk konfigurasi

## Integrasi API Backend

SIMAK terintegrasi penuh dengan **Jadwal Kuliah API** yang menyediakan:

### API Endpoints
- **System**: Health check, statistics, configuration
- **Prodis**: CRUD operations, statistics per prodi
- **Courses**: CRUD operations, bulk operations, filtering
- **Schedule Generation**: AI-powered generation, status tracking
- **File Management**: Upload, download, history
- **Export**: Multiple format export dengan parameter fleksibel

### API Features
- **RESTful Design**: API yang mengikuti standar REST
- **Pagination**: Dukungan pagination untuk dataset besar
- **Error Handling**: Error handling yang komprehensif
- **Rate Limiting**: Protection dari request berlebihan
- **Authentication**: (akan diimplementasi sesuai kebutuhan)

## Teknologi Stack

### Frontend
- **Next.js 14**: React framework dengan App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern component library
- **Lucide React**: Beautiful icons
- **Framer Motion**: Smooth animations

### Backend API
- **FastAPI**: High-performance Python web framework
- **SQLAlchemy**: SQL toolkit dan ORM
- **Pydantic**: Data validation dan serialization
- **Uvicorn**: ASGI server untuk production

### Styling & UX
- **Modern Design System**: Konsisten dengan SAKTI dashboard
- **Dark Mode Support**: Dukungan tema gelap
- **Responsive Design**: Mobile-friendly interface
- **Loading States**: Skeleton loading untuk UX yang smooth
- **Error Boundaries**: Graceful error handling

## Modern Features

### 🎨 Design Excellence
- **Gradient Backgrounds**: Beautiful gradient cards dan sections
- **Hover Effects**: Smooth hover animations
- **Card-based Layout**: Modern card-based interface
- **Color-coded Elements**: Visual differentiation dengan warna
- **Typography**: Hierarki teks yang jelas

### ⚡ Performance
- **Lazy Loading**: Component loading sesuai kebutuhan
- **API Caching**: Efficient data caching
- **Optimistic Updates**: UI updates sebelum API response
- **Debounced Search**: Efficient search implementation

### 🔧 Developer Experience
- **Type Safety**: Full TypeScript support
- **API Client**: Centralized API client dengan error handling
- **Component Reusability**: Highly reusable components
- **Clean Architecture**: Separation of concerns

## Cara Menggunakan

### 1. Akses SIMAK
- Login ke dashboard SAKTI
- Pilih role "SIMAK" dari role selector
- Dashboard SIMAK akan terbuka dengan overview lengkap

### 2. Manajemen Program Studi
- Klik "Manajemen Prodi" di sidebar
- Gunakan tombol "Tambah Prodi" untuk menambah program studi baru
- Edit existing prodi dengan tombol "Edit"
- View statistik dengan tombol "Stats"

### 3. Manajemen Mata Kuliah
- Navigasi ke "Manajemen Mata Kuliah"
- Gunakan filter untuk mencari mata kuliah spesifik
- Tambah mata kuliah baru atau import secara bulk
- Edit/delete mata kuliah existing

### 4. Generate Jadwal
- Masuk ke "Pembuat Jadwal"
- Pilih konfigurasi yang diinginkan
- Klik "Generate Jadwal" dan tunggu prosesnya
- Monitor progress dalam real-time
- Download hasil jadwal setelah selesai

### 5. Export Data
- Buka halaman "Download & Export"
- Pilih tipe data yang ingin di-export
- Pilih format (Excel, PDF, atau JSON)
- Klik "Export Data" dan download file

## API Configuration

Untuk menghubungkan dengan backend API, set environment variable:

```env
NEXT_PUBLIC_JADWAL_API_URL=http://localhost:8000
```

Default URL adalah `http://localhost:8000` jika tidak di-set.

## Future Enhancements

### Planned Features
- **Real-time Notifications**: WebSocket untuk notifikasi real-time
- **Advanced Analytics**: Dashboard analitik yang lebih mendalam
- **Template System**: System template untuk berbagai kebutuhan
- **Integration Hub**: Integrasi dengan sistem akademik lainnya
- **Mobile App**: Native mobile app untuk akses mobile
- **Approval Workflow**: System approval untuk perubahan jadwal

### API Improvements
- **GraphQL Support**: Alternative query language
- **Webhook Support**: Event-driven architecture
- **Advanced Caching**: Redis caching untuk performance
- **Audit Logging**: Comprehensive audit trail
- **Multi-tenant**: Support untuk multiple institutions

## Support & Documentation

Untuk bantuan teknis dan dokumentasi lebih lanjut:
- **API Documentation**: Available at `/docs` endpoint
- **Postman Collection**: Import collection untuk testing
- **Issue Tracking**: GitHub issues untuk bug reports
- **Feature Requests**: GitHub discussions untuk feature requests

---

**SIMAK** - Modern Academic Information Management System
*Developed with ❤️ for better academic management*
