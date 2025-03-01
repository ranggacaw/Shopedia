'use client';

import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <>
        <footer className="py-10 border-t-slate-200 border-t text-base-content mt-3">
            <div className="container px-4 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {/* Left Side: Logo & Description */}
                <div>
                    <h2 className="text-2xl font-bold">Shopedia </h2>
                    <p className="mt-2 text-sm text-gray-600">Bringing you the best products with quality and trust.</p>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Categories</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/category/food" className="hover:text-primary">Food</Link></li>
                        <li><Link href="/category/clothing" className="hover:text-primary">Clothing</Link></li>
                        <li><Link href="/category/electronics" className="hover:text-primary">Electronics</Link></li>
                        <li><Link href="/category/home" className="hover:text-primary">Home & Living</Link></li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                        <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
                        <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
                        <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                    </ul>
                </div>

                {/* Contact Us */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                    <p className="text-sm">East Bekasi, Indonesia</p>
                    <p className="text-sm">Phone: (+62) 812 0000 111</p>
                    <p className="text-sm">Email: support@shopedia.com</p>
                    <div className="flex space-x-3 mt-2">
                        <Link href="https://facebook.com" className="text-gray-600 hover:text-primary">
                            <FaFacebook size={20} />
                        </Link>
                        <Link href="https://instagram.com" className="text-gray-600 hover:text-primary">
                            <FaInstagram size={20} />
                        </Link>
                            <Link href="https://twitter.com" className="text-gray-600 hover:text-primary">
                            <FaTwitter size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
        <div className="w-full mx-auto text-center mt-5 py-5 bg-gray-100">
            <p>© 2025 Shopedia. No prophet. No god.</p>
        </div>
    </>
  );
}
