import React from 'react';
import { WifiOff, Wallet } from 'lucide-react';
import { WalletButton } from '@/components/solana/solana-provider';


export function WalletErrorPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-orange-100 animate-pulse"></div>
            <WifiOff className="relative w-16 h-16 text-orange-500" />
          </div>
        </div>

        {/* Network Image */}
        <div className="relative w-64 h-64 mx-auto">
          <img
            src="https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-1.2.1&auto=format&fit=crop&w=2069&q=80"
            alt="Disconnected Network"
            className="w-full h-full object-cover rounded-lg opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </div>

        {/* Error Title */}
        <h1 className="text-3xl font-bold text-gray-900">Wallet Not Connected</h1>

        {/* Error Message */}
        <p className="text-gray-600 max-w-sm mx-auto">
          Please connect your wallet to access the healthcare records. This ensures secure and authenticated access to your medical data.
        </p>

        {/* Action Button */}
       <WalletButton />

        {/* Decorative Elements */}
        <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 pointer-events-none">
          <div className="blur-[106px] h-56 bg-gradient-to-br from-blue-600 to-purple-400"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300"></div>
        </div>
      </div>
    </div>
  );
}