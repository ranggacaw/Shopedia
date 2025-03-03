"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BiCart } from 'react-icons/bi';
import { FaBars } from 'react-icons/fa';

interface User {
    id: number;
    username: string;
    email: string;
}

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null); 
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
    
        if (token && storedUser) {
            setIsLoggedIn(true);
            setUser(JSON.parse(storedUser)); 
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        router.push('/');
    }

    return (
        <header className="shadow-md border-b sticky top-0 z-10 bg-gray-50">
            <div className="container mx-auto p-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold font-logo w-1/3 text-left">Shopedia</div>

                {/* Navigation Links - Desktop */}
                <nav className="hidden md:flex w-1/6 justify-center space-x-6">
                    <Link href="/" className="hover:text-primary text-center w-full">Home</Link>
                    <Link href="/shop" className="hover:text-primary text-center w-full">Shop</Link>
                    <Link href="/contact" className="hover:text-primary text-center w-full">Contact</Link>
                </nav>

                {/* Search, Cart, and Avatar */}
                <div className="flex items-center space-x-4 w-1/3 justify-end">
                    <Link href={"/cart"} className="btn btn-ghost">
                        <BiCart /> Cart
                    </Link>

                    {/* Avatar with Dropdown */}
                    <div className="relative">
                        <div className="avatar cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <div className="w-10 rounded-full">
                                <img src="https://placehold.co/100" alt="User Avatar" />
                            </div>
                        </div>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                                {isLoggedIn && user ? (
                                    <>
                                        <Link 
                                            href={`/profile/${user.id}`}
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Profile
                                        </Link>
                                        <button 
                                            onClick={handleLogout} 
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <Link href='/login' className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                        Login
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    <FaBars className="text-xl" />
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {menuOpen && (
                <div className="md:hidden border-t">
                    <nav className="flex flex-col space-y-2 p-4">
                        <Link href="/" className="hover:text-primary text-center" onClick={() => setMenuOpen(false)}>Home</Link>
                        <Link href="/shop" className="hover:text-primary text-center" onClick={() => setMenuOpen(false)}>Shop</Link>
                        <Link href="/contact" className="hover:text-primary text-center" onClick={() => setMenuOpen(false)}>Contact</Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
