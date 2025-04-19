
import { AuthLayout } from "@/components/ui/auth-layout";

export const metadata = {
    title: 'HealthID',
    description: 'Login account',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthLayout>{children}</AuthLayout>
    )
}
