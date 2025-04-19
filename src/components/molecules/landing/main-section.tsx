'use client'

import { Globe, Shield, Users } from 'lucide-react';

// https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-1.2.1&auto=format&fit=crop&w=2378&q=80
export function MainSection(): React.JSX.Element {
    return (
        <>
            {/* Overview Section */}
            <section className="py-20 px-6 md:px-12 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Overview</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Unlock the power of digital identity management with our platform, offering individuals and businesses complete control over their personal data, online presence, and digital interactions. Unlike traditional identity solutions, our decentralised approach empowers you to securely manage your identity without relying on intermediaries.
                    </p>
                </div>
            </section>

            {/* Key Benefits Section */}
            <section className="py-20 px-6 md:px-12 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Key Benefits</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Empowerment */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <Users className="w-12 h-12 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Empowerment</h3>
                            <p className="text-gray-600 leading-relaxed">
                                You have complete control over your digital identity, enabling you to manage and share your personal information without relying on third-party intermediaries.
                            </p>
                        </div>

                        {/* Privacy */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <Shield className="w-12 h-12 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Privacy</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Enhance your online privacy by selectively disclosing your personal information, protecting your data from potential breaches or misuse.
                            </p>
                        </div>

                        {/* Portability */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <Globe className="w-12 h-12 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Portability</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Your digital identity is portable and accessible across different devices and platforms, making it easier to engage in the digital world.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}