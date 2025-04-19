'use client'

import { useWallet } from '@solana/wallet-adapter-react';
import { Bell, ChevronDown, Menu, Search, Settings } from 'lucide-react';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode, Suspense, useMemo } from 'react';
import { DashboardNav } from '../dashboard/dashboard-nav';
import { usePatientRecordProgram } from '../healthId/healthId-data-access';
import { ErrorPage } from '../molecules/Error/error-page';
import { WalletErrorPage } from '../molecules/Error/wallet-error-page';

export function DashboardLayout({ children }: { children: ReactNode }) {
    const { publicKey, connected } = useWallet();
    const { accounts, getProgramAccount } = usePatientRecordProgram();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/auth/login");
        },
    });

    const allAccounts = useMemo(() => {
        if (!accounts.data || accounts.data.length === 0) return undefined;

        return accounts.data.some((account: any) => {
            return account.account.owner.toString() === publicKey?.toString();
        });
    }, [accounts]);

    if (!connected) {
        return (
            <WalletErrorPage />
        )
    }

    if (getProgramAccount.isLoading || status === "loading") {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-50">
                <div className="animate-spin rounded-full grid place-items-center h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!getProgramAccount.data?.value) {
        return (
            <div className="flex justify-center alert alert-info">
                <span>
                    Program account not found. Make sure you have deployed the program and
                    are on the correct cluster.
                </span>
            </div>
        );
    }

    if (accounts.isError || accounts.data?.length == 0) {
        return (
            <ErrorPage
                title="Data Not Found"
                message="try to register your account"
                showHome={false}
            />
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-30">
                <div className="flex items-center h-16 px-6 border-b border-gray-200">
                    <span className="text-xl font-semibold text-blue-600">HealthID</span>
                </div>
                <DashboardNav />
            </aside>

            {/* Main Content */}
            <div className="pl-64">
                {/* Top Navigation */}
                <header className="h-16 bg-white border-b border-gray-200">
                    <div className="flex items-center justify-between h-full px-6">
                        <div className="flex items-center gap-4">
                            <button className="p-1.5 rounded-lg hover:bg-gray-100">
                                <Menu className="w-5 h-5 text-gray-500" />
                            </button>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 w-64 rounded-lg border bg-gray-100 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="p-1.5 rounded-lg hover:bg-gray-100 relative">
                                <Bell className="w-5 h-5 text-gray-500" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-gray-100">
                                <Settings className="w-5 h-5 text-gray-500" />
                            </button>
                            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                                {session?.user?.image && (
                                    <img
                                        src={session.user.image}//"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt="User avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                )}

                                <div className="flex items-center gap-2">
                                    <div>
                                        <p className="text-sm font-medium">{session?.user?.name}!</p>
                                        <p className="text-xs text-gray-500">User</p>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    <Suspense
                        fallback={
                            <div className="text-center my-32">
                                <span className="loading loading-spinner loading-lg"></span>
                            </div>
                        }
                    >
                        {children}
                    </Suspense>
                </main>
            </div>
        </div>
    );
};

