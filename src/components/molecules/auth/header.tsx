'use client';

import React from "react";

interface Props {
    text: string;
    step: number;
}
/// Create your healthcare identity
export default function AuthHeader({ step = 1, text }: Props) {
    const totalSteps = 4;

    return (
        <> 
            <h2 className="text-2xl font-bold text-gray-900">{text}</h2>

            {/* Progress Steps */}
            <div className="mt-6 mb-8">
                <div className="flex items-center">
                    {Array.from({ length: totalSteps }, (_, i) => (
                        <React.Fragment key={i}>
                            {i > 0 && (
                                <div className={`h-0.5 w-full ${i < step ? 'bg-[#0A344f]' : 'bg-gray-200'}`} />
                            )}
                            <div className="relative flex items-center justify-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${i + 1 <= step ? 'bg-[#0A344f] text-white' : 'bg-gray-200 text-gray-600'
                                        }`}
                                >
                                    {i + 1}
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <div className="mt-2 flex justify-between text-sm text-gray-600">
                    <span>Step {step} of {totalSteps}</span>
                    <span>{step === 1 ? 'Personal Information' : `Step ${step}`}</span>
                </div>
            </div>
        </>
    )
}