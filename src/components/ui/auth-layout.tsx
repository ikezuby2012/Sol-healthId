'use client';

import { ReactNode } from 'react'
import { Flower } from 'lucide-react';

export function AuthLayout({ children }: { children: ReactNode; }) {
    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <div className="absolute inset-0 bg-blue-600/10"></div>
                </div>
                <div className="relative z-10 w-full flex flex-col justify-between p-12 text-white">
                    <div className="flex items-center space-x-2">
                        <Flower className="h-8 w-8 text-black" />
                        <span className="text-2xl font-bold text-gray-600">HealthID</span>
                    </div>
                    <div className='text-white'>
                        <blockquote className="text-xl font-medium">
                            "The future of healthcare data information starts here. Simple, secure, and seamless."
                        </blockquote>
                        <p className="mt-6">Dr. Sarah Chen</p>
                        <p className="text-sm opacity-80">Chief of Digital Health, Metro General</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Content */}
            <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 bg-gray-100">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="lg:hidden flex items-center justify-center mb-8">
                        <Flower className="h-8 w-8 text-blue-600" />
                        <span className="text-2xl font-bold ml-2">HealthID</span>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}