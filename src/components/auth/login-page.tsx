"use client";

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/app");
        }
        if (status == "loading") {
            setIsLoading(true);
        }
    }, [status, router]);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        await signIn("google", { callbackUrl: "/app" });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-gray-600">
                Sign in to your healthcare account
            </p>

            <div className="mt-8 mb-8">
                <div className="w-full flex justify-center">
                    <DotLottieReact
                        // src="https://lottie.host/138dc246-e9ec-4e4c-9d6e-8ba418142bdb/cCeErW1tZN.lottie"
                        src="https://lottie.host/ef460e66-1bf4-43e7-91f4-86225239bdcf/tAmMcVSz3i.lottie"
                        loop
                        autoplay
                    />
                </div>
            </div>

            <form className="space-y-6">
                <div>
                    {/* <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Sign in
                    </button> */}
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-100 text-gray-500">continue with</span>
                    </div>
                </div>

                <div>
                    {isLoading ? (
                        <div className='mt-8 flex justify-center items-center space-x-4'>
                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                            <span>Processing...</span>
                        </div>
                    ) : <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <img
                            className="h-5 w-5 mr-2"
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google logo"
                        />
                        Sign in with Google
                    </button>}

                </div>

                <p className="mt-2 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/auth/register-user" className="font-medium text-blue-600 hover:text-blue-500">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    )
}