"use client";

import {
    LayoutDashboard,
    LogOut,
    Settings,
    Shield,
    Users
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from "next-auth/react";

const navItems = [
    {
        title: 'Dashboard',
        icon: LayoutDashboard,
        href: '/app'
    },
    {
        title: 'Access Records',
        icon: Shield,
        href: '/app/access-control'
    },
    {
        title: 'Providers',
        icon: Users,
        href: '/app/provider'
    },
    // {
    //     title: 'Reports',
    //     icon: FileText,
    //     href: '/app/reports'
    // },
    // {
    //     title: 'Activity Log',
    //     icon: Activity,
    //     href: '/dashboard/activity'
    // },
    {
        title: 'Settings',
        icon: Settings,
        href: '/app/settings'
    }
];

export function DashboardNav() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col h-[calc(100vh-4rem)] justify-between py-4">
            <div className="space-y-1 px-3">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 ${pathname === item.href ? 'bg-blue-50 text-blue-600' : ''
                            }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                ))}
            </div>

            <div className="px-3">
                <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-gray-700 hover:bg-gray-100">
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Log out</span>
                </button>
            </div>
        </nav>
    );
}