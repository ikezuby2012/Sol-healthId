'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { ReactNode, Suspense, useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export function AppLayout({ children, links }: { children: ReactNode; links: { label: string; path: string }[] }) {
    const pathname = usePathname()

    return (
        <div>
            <Suspense
                fallback={
                    <div className="text-center my-32">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                }
            >
                {children}
            </Suspense>
            <Toaster position="bottom-right" />
          
        </div>
    );
};

