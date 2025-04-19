import { DashboardLayout } from '@/components/ui/dashboard-layout'

export const metadata = {
  title: 'HealthID',
  description: 'Create Medical record',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
        {children}
    </DashboardLayout>
  )
}