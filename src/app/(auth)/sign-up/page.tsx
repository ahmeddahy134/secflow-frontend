'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SlideUp } from '@/components/ui/MotionWrapper';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { toast } from '@/store/toast-store';

export default function SignUpPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const simulateSignUp = (method: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    toast({ variant: 'info', title: `Continuing with ${method}...` });
    setTimeout(() => {
      toast({ variant: 'success', title: 'Account created', description: 'Welcome to SECFlow — let\'s connect your first repository.' });
      router.push('/dashboard');
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    simulateSignUp('email');
  };

  return (
    <AuthLayout backHref="/" backLabel="Back to home">
        <SlideUp delay={0.1}>
          <div className="rounded-2xl border border-[#1E2235] bg-[#12141C]/80 backdrop-blur-xl p-8 shadow-2xl shadow-black/20">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-white mb-2">Create an account</h1>
              <p className="text-sm text-slate-400">Get started with SECFlow for free</p>
            </div>

            {/* OAuth Button */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full bg-[#1A1D2B] border-[#1E2235] hover:bg-[#2A2F45] hover:border-[#3A3F55] hover:shadow-lg hover:shadow-black/10 text-white py-6 transition-all duration-200 group" onClick={() => simulateSignUp('GitHub')} disabled={isSubmitting}>
                <div className="flex items-center justify-center gap-3 w-full">
                  <svg className="h-5 w-5 group-hover:text-white text-slate-400 transition-colors" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor"/>
                  </svg>
                  <span>Sign up with GitHub</span>
                </div>
              </Button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#1E2235]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#12141C] px-3 text-slate-500">Or continue with email</span>
              </div>
            </div>

            {/* Registration Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">First name</label>
                  <Input placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Last name</label>
                  <Input placeholder="Doe" required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Work Email</label>
                <Input type="email" placeholder="name@company.com" required />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
                <Input type="password" placeholder="••••••••" required minLength={8} />
                <p className="text-xs text-slate-500 mt-1">Must be at least 8 characters</p>
              </div>

              <Button type="submit" className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white mt-2 shadow-lg shadow-blue-500/20" disabled={isSubmitting}>
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-500 leading-relaxed px-2">
              By clicking &quot;Create Account&quot;, you agree to our{' '}
              <Link href="#" className="text-blue-400 hover:underline">Terms of Service</Link>{' '}
              and{' '}
              <Link href="#" className="text-blue-400 hover:underline">Privacy Policy</Link>.
            </p>

            {/* Integrated into the card footer, rather than floating below it */}
            <p className="mt-6 pt-6 border-t border-[#1E2235] text-center text-sm text-slate-400">
              Already have an account?{' '}
              <Link href="/sign-in" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </SlideUp>
    </AuthLayout>
  );
}
