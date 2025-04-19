'use client'

import * as React from 'react'
import { ReactNode, Suspense, useEffect, useRef } from 'react'
import { Flower } from 'lucide-react';
import { WalletButton } from '@/components/solana/solana-provider';
import { useWallet } from '@solana/wallet-adapter-react'
import Link from 'next/link';

// https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-1.2.1&auto=format&fit=crop&w=2378&q=80
export function HeroApp({
  title,
  subtitle, }: {
    title: ReactNode
    subtitle: ReactNode
  }): React.JSX.Element {
  const { connected } = useWallet();

  return <div className="relative min-h-screen">
    {/* Background Image with Overlay */}
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: 'url("https://res.cloudinary.com/dilvag5dx/image/upload/v1743709100/maxime-OMZ9K6YjFaY-unsplash_s55ki3.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
    </div>

    {/* Navigation */}
    <nav className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12">
      <div className="flex items-center space-x-2">
        <Flower className="h-6 w-6 text-white" />
        <span className="text-xl font-bold text-white">HealthID</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex space-x-6">
          {/* <a href="#features" className="text-white hover:text-gray-200">Features</a>
          <a href="#pricing" className="text-white hover:text-gray-200">Pricing</a>
          <a href="#about" className="text-white hover:text-gray-200">About Us</a>
          <a href="#contact" className="text-white hover:text-gray-200">Contact Us</a>
          <a href="#help" className="text-white hover:text-gray-200">Help Center</a> */}
        </div>

        {connected && (
          <>
            <Link href={"/auth/login"} className="px-4 py-2 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white hover:bg-[#0A344f] bg-white rounded-lg">
              Login
            </Link>
            <Link href={"/auth/register-user"} className="px-4 py-2 text-sm font-medium transition-all duration-200 text-gray-100 bg-[#0A344f] border border-gray-600 hover:text-black rounded-lg hover:bg-gray-100">
              Register
            </Link>
          </>
        )}

        <WalletButton />
      </div>
    </nav>

    {/* Hero Content */}
    <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="text-center px-6 md:px-0">
        {typeof title === 'string' ? <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
          {title}
        </h1> : title}
        {typeof subtitle === 'string' ? <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p> : subtitle}
        {connected && <Link className="px-8 py-4 text-lg font-medium text-white bg-[#0A344f] rounded-lg hover:bg-green-800 transition-colors" href={"/auth/register-user"}>
          Try It Now
        </Link>}
      </div>
    </main>
  </div>
}