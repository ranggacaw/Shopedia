"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { BiCart } from 'react-icons/bi';
import { CgSearch } from 'react-icons/cg';
import { FaBars } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className="shadow-md border-b">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold font-logo">Pelerpedia</div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/dashboard" className="hover:text-primary">Home</Link>
          <Link href="/shop" className="hover:text-primary">Shop</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          <FaBars className="text-xl" />
        </button>

        {/* Search, Cart, and Avatar */}
        <div className="flex items-center space-x-4">
          <button className="btn btn-ghost hidden md:flex">
            <CgSearch />
          </button>
          <Link href={"/cart"} className="btn btn-ghost">
            <BiCart /> Cart
          </Link>

          {/* Avatar with Dropdown */}
          <div className="relative">
            <div
              className="avatar cursor-pointer"
              onClick={toggleDropdown}
            >
              <div className="w-10 rounded-full">
                <img src="https://placehold.co/100" alt="User Avatar" />
              </div>
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col space-y-2 p-4">
            <Link href="/dashboard" className="hover:text-primary" onClick={toggleMenu}>Home</Link>
            <Link href="/shop" className="hover:text-primary" onClick={toggleMenu}>Shop</Link>
            <Link href="/contact" className="hover:text-primary" onClick={toggleMenu}>Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
