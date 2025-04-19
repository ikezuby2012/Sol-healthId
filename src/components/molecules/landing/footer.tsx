'use client'

import { useState } from 'react';
import { Flower } from 'lucide-react';


// https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-1.2.1&auto=format&fit=crop&w=2378&q=80
export function Footer(): React.JSX.Element {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle subscription logic here
        console.log('Subscribing email:', email);
        setEmail('');
    };

    return (
        <footer className="bg-white">
            <div className="py-16 px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    {/* Logo and Newsletter */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center space-x-2 mb-8">
                            <Flower className="h-8 w-8 text-blue-600" />
                            <span className="text-2xl font-bold text-gray-900">HealthID</span>
                        </div>
                        <div className="max-w-md mx-auto">
                            <h3 className="text-xl font-semibold mb-4">Subscribe to our newsletter</h3>
                            <form onSubmit={handleSubscribe} className="flex gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#0A344f] text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
                            <ul className="space-y-2">
                                <li><a href="#features" className="text-gray-600 hover:text-gray-900">Features</a></li>
                                <li><a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li><a href="#blog" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                                <li><a href="#guides" className="text-gray-600 hover:text-gray-900">User guides</a></li>
                                <li><a href="#webinars" className="text-gray-600 hover:text-gray-900">Webinars</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                            <ul className="space-y-2">
                                <li><a href="#about" className="text-gray-600 hover:text-gray-900">About us</a></li>
                                <li><a href="#contact" className="text-gray-600 hover:text-gray-900">Contact us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Plans & Pricing</h4>
                            <ul className="space-y-2">
                                <li><a href="#personal" className="text-gray-600 hover:text-gray-900">Personal</a></li>
                                <li><a href="#startup" className="text-gray-600 hover:text-gray-900">Start up</a></li>
                                <li><a href="#organization" className="text-gray-600 hover:text-gray-900">Organization</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-gray-200">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <div className="flex items-center space-x-4">
                                <select className="px-3 py-1 border border-gray-300 rounded-lg bg-white">
                                    <option value="en">English</option>
                                    <option value="es">Español</option>
                                    <option value="fr">Français</option>
                                </select>
                                <span className="text-gray-600">© HealthID, Inc.</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <a href="#privacy" className="text-gray-600 hover:text-gray-900">Privacy</a>
                                <a href="#terms" className="text-gray-600 hover:text-gray-900">Terms</a>
                                <a href="#sitemap" className="text-gray-600 hover:text-gray-900">Sitemap</a>
                            </div>
                            <div className="flex items-center space-x-4">
                                <a href="#twitter" className="text-gray-600 hover:text-blue-600">
                                    <span className="sr-only">Twitter</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                                <a href="#facebook" className="text-gray-600 hover:text-blue-600">
                                    <span className="sr-only">Facebook</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="#linkedin" className="text-gray-600 hover:text-blue-600">
                                    <span className="sr-only">LinkedIn</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="#youtube" className="text-gray-600 hover:text-red-600">
                                    <span className="sr-only">YouTube</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <aside className='footer footer-center p-4 bg-base-300 text-base-content'>
                <p>
                    @ {new Date().getFullYear()} healthID
                </p>
            </aside>
        </footer>
    );
}