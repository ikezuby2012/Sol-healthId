"use client";

import { useState } from "react";
import { Key, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
    onNextClick?(): void;
    secretKey: string;
}

export default function CreateSecretKeyPage({ onNextClick, secretKey }: Props) {
    const [formData, setFormData] = useState({ secureKey: '' });
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateKey = async () => {
        setIsGenerating(true);
        // Simulate key generation
        await new Promise(resolve => setTimeout(resolve, 2000));
        setFormData(prev => ({
            ...prev,
            secureKey: secretKey
        }));
        setIsGenerating(false);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Create Secure Key</h2>
            <p className="mt-2 text-gray-600">
                Your healthcare identity is protected with a cryptographic key. This key is created when you register and can be regenerated whenever you create a new backup code.
            </p>

            <div className="mt-8">
                {!formData.secureKey ? (
                    <button
                        onClick={handleGenerateKey}
                        disabled={isGenerating}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#0A344f] text-white rounded-lg hover:bg-[#0a354fe1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Generating key...</span>
                            </>
                        ) : (
                            <>
                                <Key className="h-5 w-5" />
                                <span>Generate cryptographic key</span>
                            </>
                        )}
                    </button>
                ) : (
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">Your secure key</span>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(secretKey)
                                            .then(() => toast.success("Copied!"))
                                            .catch(() => toast.error("Copy failed"));
                                    }}
                                    className="text-sm bg-[#0A344f] hover:bg-[#0a354fe1]"
                                >
                                    Copy
                                </button>
                            </div>
                            <div className="mt-2 font-mono text-lg text-gray-900">
                                {formData.secureKey}
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">
                            Store this key in a safe place. You'll need it to recover your account if you lose access.
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-8">
                <button
                    type="button"
                    onClick={onNextClick}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Continue
                </button>
            </div>
        </div>
    )
}