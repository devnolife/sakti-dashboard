/**
 * Contoh Penggunaan Multi-Bahasa (i18n) dalam Komponen
 * 
 * File ini menunjukkan berbagai cara menggunakan fitur multi-bahasa
 * di aplikasi SINTEKMu Dashboard
 */

'use client'

import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LanguageSwitcher } from '@/components/language-switcher'

/**
 * Contoh 1: Basic Usage
 * Penggunaan dasar hook useI18n
 */
export function BasicExample() {
  const { t } = useI18n()

  return (
    <div className="space-y-4">
      <h1>{t('admin.dashboard')}</h1>
      <p>{t('admin.welcome')}</p>
      <Button>{t('common.save')}</Button>
    </div>
  )
}

/**
 * Contoh 2: Parameter Interpolation
 * Menggunakan parameter dinamis dalam translation
 */
export function ParameterExample() {
  const { t } = useI18n()
  const userName = "Ahmad Fauzi"
  const studentId = "2021001"

  return (
    <div className="space-y-4">
      {/* Parameter tunggal */}
      <p>{t('student.welcome', { name: userName })}</p>

      {/* Multiple parameters */}
      <p>{t('student.gpa_increase', { amount: '0.15' })}</p>
    </div>
  )
}

/**
 * Contoh 3: Conditional Rendering
 * Render berbeda berdasarkan bahasa
 */
export function ConditionalExample() {
  const { t, locale } = useI18n()

  return (
    <div className="space-y-4">
      <h2>{t('common.language')}: {locale === 'id' ? '🇮🇩' : '🇺🇸'}</h2>

      {/* Format tanggal berbeda per bahasa */}
      <p>
        {locale === 'id'
          ? new Date().toLocaleDateString('id-ID')
          : new Date().toLocaleDateString('en-US')
        }
      </p>
    </div>
  )
}

/**
 * Contoh 4: Form dengan i18n
 * Form fields dan validations dengan multi-bahasa
 */
export function FormExample() {
  const { t } = useI18n()

  return (
    <form className="space-y-4">
      <div>
        <label>{t('auth.username')}</label>
        <input
          type="text"
          placeholder={t('auth.username')}
          className="input"
        />
      </div>

      <div>
        <label>{t('auth.password')}</label>
        <input
          type="password"
          placeholder={t('auth.password')}
          className="input"
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit">{t('common.submit')}</Button>
        <Button type="button" variant="outline">
          {t('common.cancel')}
        </Button>
      </div>
    </form>
  )
}

/**
 * Contoh 5: Cards dengan Statistics
 * Dashboard cards dengan translation
 */
export function StatisticsExample() {
  const { t } = useI18n()

  const stats = [
    {
      title: t('admin.total_users'),
      value: '1,234',
      icon: '👥'
    },
    {
      title: t('admin.active_students'),
      value: '856',
      icon: '🎓'
    },
    {
      title: t('admin.total_courses'),
      value: '42',
      icon: '📚'
    },
    {
      title: t('admin.pending_requests'),
      value: '15',
      icon: '⏳'
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              {stat.icon} {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

/**
 * Contoh 6: Table dengan i18n
 * Table headers dan content dengan translation
 */
export function TableExample() {
  const { t } = useI18n()

  const students = [
    { id: '2021001', name: 'Ahmad', gpa: 3.85, status: 'active' },
    { id: '2021002', name: 'Siti', gpa: 3.92, status: 'active' },
    { id: '2021003', name: 'Budi', gpa: 3.45, status: 'inactive' },
  ]

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>{t('common.name')}</th>
          <th>{t('student.gpa')}</th>
          <th>{t('common.status')}</th>
          <th>{t('common.action')}</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.gpa}</td>
            <td>
              <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                {student.status === 'active' ? t('admin.workflow.active') : t('admin.workflow.inactive')}
              </Badge>
            </td>
            <td>
              <Button size="sm" variant="ghost">
                {t('common.view')}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/**
 * Contoh 7: Tabs dengan i18n
 * Tab navigation dengan translation
 */
export function TabsExample() {
  const { t } = useI18n()

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b">
        <button className="px-4 py-2 border-b-2 border-primary">
          {t('student.overview')}
        </button>
        <button className="px-4 py-2">
          {t('student.courses')}
        </button>
        <button className="px-4 py-2">
          {t('student.schedule')}
        </button>
        <button className="px-4 py-2">
          {t('payment.history')}
        </button>
      </div>

      <div className="p-4">
        {/* Tab content */}
      </div>
    </div>
  )
}

/**
 * Contoh 8: Notifications dengan i18n
 * Notification messages dengan translation
 */
export function NotificationExample() {
  const { t } = useI18n()

  const notifications = [
    {
      type: 'success',
      message: t('common.success'),
      description: 'Data berhasil disimpan'
    },
    {
      type: 'error',
      message: t('common.error'),
      description: 'Gagal menyimpan data'
    },
    {
      type: 'warning',
      message: t('common.warning'),
      description: 'Perhatian: Data akan dihapus'
    },
    {
      type: 'info',
      message: t('common.info'),
      description: 'Ada pembaruan tersedia'
    }
  ]

  return (
    <div className="space-y-2">
      {notifications.map((notif, index) => (
        <Card key={index} className="p-4">
          <h4 className="font-semibold">{notif.message}</h4>
          <p className="text-sm text-muted-foreground">{notif.description}</p>
        </Card>
      ))}
    </div>
  )
}

/**
 * Contoh 9: Navigation Menu dengan i18n
 * Menu items dengan translation
 */
export function NavigationExample() {
  const { t } = useI18n()

  const menuItems = [
    { icon: '📊', label: t('common.dashboard'), href: '/dashboard' },
    { icon: '👥', label: t('admin.users'), href: '/users' },
    { icon: '📚', label: t('library.title'), href: '/library' },
    { icon: '🧪', label: t('lab.title'), href: '/lab' },
    { icon: '📝', label: t('exam.title'), href: '/exam' },
    { icon: '✉️', label: t('correspondence.title'), href: '/correspondence' },
  ]

  return (
    <nav className="space-y-2">
      {menuItems.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent"
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  )
}

/**
 * Contoh 10: Complete Dashboard Example
 * Contoh lengkap halaman dashboard dengan i18n
 */
export function CompleteDashboardExample() {
  const { t, locale } = useI18n()

  return (
    <div className="p-6 space-y-6">
      {/* Header dengan Language Switcher */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            {t('admin.dashboard')}
          </h1>
          <p className="text-muted-foreground">
            {t('admin.welcome')}
          </p>
        </div>
        <LanguageSwitcher />
      </div>

      {/* Statistics Cards */}
      <StatisticsExample />

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.recent_activities')}</CardTitle>
          <CardDescription>
            {locale === 'id'
              ? 'Aktivitas terbaru dalam sistem'
              : 'Recent activities in the system'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button>{t('admin.add_new')}</Button>
            <Button variant="outline">{t('admin.export')}</Button>
            <Button variant="outline">{t('common.refresh')}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.students')}</CardTitle>
        </CardHeader>
        <CardContent>
          <TableExample />
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * Export semua contoh
 */
export const I18nExamples = {
  BasicExample,
  ParameterExample,
  ConditionalExample,
  FormExample,
  StatisticsExample,
  TableExample,
  TabsExample,
  NotificationExample,
  NavigationExample,
  CompleteDashboardExample
}

export default CompleteDashboardExample

