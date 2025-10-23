# Implementasi Role Configuration Dinamis

## Overview
Sistem ini memungkinkan konfigurasi role disimpan di database dan dapat dikelola oleh admin secara dinamis.

## Langkah Implementasi

### 1. Generate Prisma Client
Setelah menambahkan model `role_configurations` ke schema, jalankan:

```bash
npx prisma generate
npx prisma migrate dev --name add_role_configurations
```

### 2. Jalankan Seed Data
```bash
npx tsx prisma/seed-all.ts
```

Ini akan mengisi tabel `role_configurations` dengan data default untuk semua role.

### 3. Struktur Tabel role_configurations

```prisma
model role_configurations {
  id          String   @id
  role        Role     @unique
  title       String
  subtitle    String
  icon_name   String
  description String?
  is_active   Boolean  @default(true)
  created_at  DateTime @default(now())
  updated_at  DateTime
}
```

### 4. API Endpoints

#### GET /api/role-configurations
Mengambil semua role configurations yang aktif.

**Response:**
```json
[
  {
    "id": "role-config-001",
    "role": "admin",
    "title": "Administrator",
    "subtitle": "System Management",
    "icon_name": "Shield",
    "description": "Full system access and management",
    "is_active": true,
    "created_at": "2025-10-21T...",
    "updated_at": "2025-10-21T..."
  }
]
```

#### POST /api/role-configurations
Membuat role configuration baru.

**Request Body:**
```json
{
  "role": "new_role",
  "title": "New Role",
  "subtitle": "Role Subtitle",
  "icon_name": "Shield",
  "description": "Role description"
}
```

#### PUT /api/role-configurations
Update role configuration yang ada.

**Request Body:**
```json
{
  "id": "role-config-001",
  "title": "Updated Title",
  "subtitle": "Updated Subtitle",
  "icon_name": "Shield",
  "description": "Updated description",
  "is_active": true
}
```

### 5. Cara Menggunakan di Component

#### Option A: Fetch di Server Component (Recommended)
```tsx
// app/dashboard/page.tsx
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const roleConfigs = await prisma.role_configurations.findMany({
    where: { is_active: true }
  });

  // Transform to needed format
  const configs = roleConfigs.reduce((acc, config) => {
    acc[config.role] = {
      headerConfig: {
        title: config.title,
        subtitle: config.subtitle,
        iconName: config.icon_name
      },
      user: {
        name: config.title,
        email: `${config.role}@university.edu`,
        avatar: ""
      }
    };
    return acc;
  }, {});

  return <YourComponent configs={configs} />;
}
```

#### Option B: Fetch di Client Component
```tsx
'use client';

import { useEffect, useState } from 'react';

export function YourComponent() {
  const [roleConfigs, setRoleConfigs] = useState({});

  useEffect(() => {
    fetch('/api/role-configurations')
      .then(res => res.json())
      .then(data => {
        const configs = data.reduce((acc, config) => {
          acc[config.role] = {
            headerConfig: {
              title: config.title,
              subtitle: config.subtitle,
              iconName: config.icon_name
            },
            user: {
              name: config.title,
              email: `${config.role}@university.edu`,
              avatar: ""
            }
          };
          return acc;
        }, {});
        setRoleConfigs(configs);
      });
  }, []);

  // Use roleConfigs
}
```

### 6. Update Layout untuk Menggunakan Database

Edit `components/shared/layout.tsx`:

```tsx
import { prisma } from '@/lib/prisma';
import { iconMap, defaultRoleConfigs } from '@/config/role-configs';

export async function AppLayout({ role, children }) {
  // Fetch from database
  let config;
  
  try {
    const dbConfig = await prisma.role_configurations.findUnique({
      where: { role, is_active: true }
    });

    if (dbConfig) {
      config = {
        headerConfig: {
          title: dbConfig.title,
          subtitle: dbConfig.subtitle,
          iconName: dbConfig.icon_name as IconName
        },
        user: {
          name: dbConfig.title,
          email: `${dbConfig.role}@university.edu`,
          avatar: ""
        }
      };
    }
  } catch (error) {
    console.error('Error fetching role config:', error);
  }

  // Fallback to default if not found
  if (!config) {
    config = defaultRoleConfigs[role];
  }

  if (!config) {
    throw new Error(`Role configuration not found for: ${role}`);
  }

  return (
    // Your layout JSX
  );
}
```

### 7. Membuat Admin Panel untuk Mengelola Role Configurations

Buat halaman admin di `app/admin/role-configurations/page.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RoleConfigurationsPage() {
  const [configs, setConfigs] = useState([]);
  const [editingConfig, setEditingConfig] = useState(null);

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    const response = await fetch('/api/role-configurations');
    const data = await response.json();
    setConfigs(data);
  };

  const handleUpdate = async (config) => {
    await fetch('/api/role-configurations', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
    fetchConfigs();
  };

  return (
    <div>
      <h1>Role Configurations</h1>
      <div className="grid gap-4">
        {configs.map(config => (
          <div key={config.id} className="border p-4 rounded">
            <h3>{config.title}</h3>
            <p>{config.subtitle}</p>
            <p>Icon: {config.icon_name}</p>
            <Button onClick={() => setEditingConfig(config)}>
              Edit
            </Button>
          </div>
        ))}
      </div>

      {/* Add edit modal/form here */}
    </div>
  );
}
```

## Benefits

1. **Flexibility**: Admin dapat mengubah konfigurasi role tanpa deploy ulang
2. **Centralized**: Semua konfigurasi tersimpan di satu tempat (database)
3. **Auditable**: Dapat tracking perubahan dengan timestamp
4. **Scalable**: Mudah menambah role baru tanpa mengubah kode
5. **Dynamic**: Perubahan langsung terlihat tanpa restart aplikasi

## Migration Path

Untuk existing code:
1. Jalankan migration untuk membuat tabel
2. Run seed untuk populate data
3. Gradually update components untuk fetch dari database
4. Keep `role-configs.tsx` sebagai fallback
5. Setelah semua stabil, hapus hard-coded configs

## Available Icons

- Shield
- Building2
- GraduationCap
- BookOpen
- Users
- DollarSign
- ClipboardList
- UserCheck
- FlaskConical
- BookMarked
- Microscope
- Archive
- School

Untuk menambah icon baru, update `iconMap` di `role-configs.tsx`.
