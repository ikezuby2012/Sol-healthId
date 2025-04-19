import { ReactQueryProvider } from "@/app/react-query-provider";
import { ClusterProvider } from "@/components/cluster/cluster-data-access";
import { SolanaProvider } from "@/components/solana/solana-provider";
import { AuthLayout } from "@/components/ui/auth-layout";

export const metadata = {
    title: 'HealthID',
    description: 'Create your person identity',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthLayout>{children}</AuthLayout>
    )
}
