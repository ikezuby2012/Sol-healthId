import './globals.css'
import { ClusterProvider } from '@/components/cluster/cluster-data-access'
import { SolanaProvider } from '@/components/solana/solana-provider'
import { ReactQueryProvider } from './react-query-provider'
import { AppLayout } from '@/components/ui/app-layout'
import SessionProviders from '@/components/app-pages/session-provider'

export const metadata = {
  title: 'HealthID',
  description: 'secure management of digital identities in healthcare',
}

const links: { label: string; path: string }[] = [
  { label: 'Account', path: '/account' },
  { label: 'Clusters', path: '/clusters' },
  { label: 'Solhealth Program', path: '/solhealth' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              <SessionProviders>
                <AppLayout links={links}>{children}</AppLayout>
              </SessionProviders>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
