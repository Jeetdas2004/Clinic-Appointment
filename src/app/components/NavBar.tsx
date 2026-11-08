"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clinicLogo from '../../../public/clinicLogo.png';
import { useSelector, useDispatch } from 'react-redux';
import { navItemActions } from '@/redux/navItemSlice';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaUserMd, FaCalendarCheck } from 'react-icons/fa';

type Props = {
  children?: React.ReactNode;
  onBookClick?: () => void;
};

export const NavItem = ({ item, targetId }: { item: string; targetId?: string }) => {
  const dispatch = useDispatch();
  const itemName = useSelector((state: { navItem: { name: string } }) => state.navItem.name);
  const target = targetId || item.toLowerCase().replace(/\s+/g, '');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    dispatch(navItemActions.updateItem(item));
    const el = document.getElementById(target);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${target}`);
    }
  };

  return (
    <Link
      href={`/#${target}`}
      className={`text-sm font-semibold tracking-wide transition-colors duration-100 capitalize py-1 px-3 rounded-full ${
        itemName.toLowerCase() === item.toLowerCase()
          ? 'bg-blue-50 text-blue-600 font-bold shadow-xs'
          : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/70'
      }`}
      onClick={handleClick}
    >
      {item}
    </Link>
  );
};

const NavBar = ({ children, onBookClick }: Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center p-1.5 shadow-xs group-hover:scale-105 transition-transform duration-300">
            <Image
              src={clinicLogo}
              alt="AY-Clinic Logo"
              width={44}
              height={44}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AY-Clinic
            </span>
            <span className="text-[11px] font-medium text-slate-400 tracking-wider uppercase">
              Medical & Specialists
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60">
          {children || (
            <>
              <NavItem item="Home" targetId="home" />
              <NavItem item="Services" targetId="services" />
              <NavItem item="Doctors" targetId="doctors" />
              <NavItem item="About Us" targetId="about" />
              <NavItem item="Contact" targetId="contact" />
            </>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          {onBookClick && (
            <button
              onClick={onBookClick}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100/80 rounded-xl transition-colors cursor-pointer"
            >
              <FaCalendarCheck className="text-blue-600" />
              <span>Book Visit</span>
            </button>
          )}

          <Link
            href="/Patient"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 rounded-xl border border-emerald-200 transition-colors cursor-pointer"
          >
            <span>Patient Portal</span>
          </Link>

          <Link
            href="/SignIn"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <FaUserMd className="text-white text-sm" />
            <span>Doctor Portal</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
          className="md:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg focus:outline-none"
        >
          {mobileMenuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 flex flex-col gap-3 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            <Link
              href="/#home"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
            >
              Home
            </Link>
            <Link
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
            >
              Services
            </Link>
            <Link
              href="/#doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
            >
              Doctors
            </Link>
            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
            >
              About Us
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
            >
              Contact
            </Link>
          </div>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/Patient"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 font-bold text-xs text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200"
            >
              Patient Health Portal
            </Link>
            {onBookClick && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full text-center py-2.5 font-semibold text-blue-600 bg-blue-50 rounded-lg text-xs"
              >
                Book Visit
              </button>
            )}
            <Link
              href="/SignIn"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 font-semibold text-white bg-blue-600 rounded-lg text-xs"
            >
              Doctor Portal Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
