"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ClinicLogo from '../../../public/clinicLogo.png';
import Image from 'next/image';
import Link from 'next/link';
import { SignIn } from '../DataFunction/Other';
import { initialDoctors } from '@/lib/data';
import { FaUserMd, FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaKey, FaSignInAlt } from 'react-icons/fa';

export default function SignInPage() {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Pre-fetch Doctor route for instant transition
  useEffect(() => {
    router.prefetch('/Doctor');
  }, [router]);

  const handleInstantSignIn = async (user: string, pass: string) => {
    setUserName(user);
    setPassword(pass);
    setError(null);
    setIsLoading(true);

    try {
      const res = await SignIn({ userName: user, password: pass });
      if (res && res.result === 1) {
        localStorage.setItem('user', JSON.stringify(res.user));
        router.push('/Doctor');
      } else {
        setError(res?.message || 'Login failed');
        setIsLoading(false);
      }
    } catch {
      setError('Authentication error');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !password.trim()) {
      setError('Please provide both username and password');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await SignIn({ userName, password });
      if (res && res.result === 1) {
        localStorage.setItem('user', JSON.stringify(res.user));
        router.push('/Doctor');
      } else {
        setError(res?.message || 'Invalid physician username or password');
        setIsLoading(false);
      }
    } catch {
      setError('Authentication service error. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50/50 to-indigo-100/40 flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-4xl flex flex-col items-center gap-8">
        {/* Main Login Card */}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-8 flex flex-col items-center">
          {/* Back Link */}
          <div className="w-full flex justify-start mb-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <FaArrowLeft />
              <span>Back to Clinic Home</span>
            </Link>
          </div>

          {/* Logo & Portal Title */}
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 p-2 flex items-center justify-center shadow-xs mb-3">
            <Image src={ClinicLogo} alt="AY-Clinic" width={48} height={48} className="object-contain" priority />
          </div>

          <h1 className="text-2xl font-black text-slate-900 tracking-tight text-center">
            Physician Portal Login
          </h1>
          <p className="text-xs text-slate-500 text-center mt-1">
            Sign in to view patient queue, manage appointments & schedules.
          </p>

          {/* Error Alert */}
          {error && (
            <div className="w-full mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center animate-in fade-in duration-200">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full mt-6 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FaUserMd className="text-blue-500" />
                <span>Doctor Username</span>
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. dr.sarah, dr.alex, dr.elena"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FaLock className="text-blue-500" />
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Entering Portal...' : 'Sign In to Portal →'}
            </button>
          </form>
        </div>

        {/* All 6 Doctors Sign-In Credentials Grid */}
        <div className="w-full bg-white rounded-3xl shadow-lg border border-slate-200/80 p-6 sm:p-8 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <FaKey className="text-amber-500 text-base" />
                <span>All Clinic Doctors — Instant Access & Credentials</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Click any physician below to immediately sign in and view their active patient queue.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200 self-start sm:self-center">
              Password for all: <code className="font-mono font-black">password123</code>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {initialDoctors.map((doc) => {
              const sName = typeof doc.service === 'object' ? doc.service.name : 'Specialist';
              return (
                <div
                  key={doc._id}
                  className="bg-slate-50/80 hover:bg-blue-50/50 rounded-2xl p-4 border border-slate-200/80 flex flex-col justify-between gap-3 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-white shadow-xs"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-sm truncate">{doc.name}</h3>
                      <p className="text-xs font-semibold text-blue-600 truncate">{sName}</p>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                        <span>User: <strong className="text-slate-800">{doc.userName}</strong></span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleInstantSignIn(doc.userName, 'password123')}
                    className="w-full py-2 px-3 bg-white hover:bg-blue-600 hover:text-white text-blue-700 font-bold text-xs rounded-xl border border-blue-200 hover:border-blue-600 shadow-2xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <FaSignInAlt className="text-xs" />
                    <span>Sign In as {doc.name.split(' ')[1]}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
