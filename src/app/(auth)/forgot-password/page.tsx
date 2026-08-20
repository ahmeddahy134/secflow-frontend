'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MailCheck } from 'lucide-react';
import { SlideUp } from '@/components/ui/MotionWrapper';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { toast } from '@/store/toast-store';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast({
      variant: 'success',
      title: 'Reset link sent',
      description: `Check ${email || 'your inbox'} for password reset instructions.`,
    });
  };

  return (
    <AuthLayout backHref="/sign-in" backLabel="Back to sign in">
        <SlideUp delay={0.1}>
          <div className="rounded-2xl border border-[#1E2235] bg-[#12141C]/80 backdrop-blur-xl p-8 shadow-2xl shadow-black/20">
            {!sent ? (
              <>
                <div className="mb-8 text-center">
                  <h1 className="text-2xl font-bold text-white mb-2">Reset your password</h1>
                  <p className="text-sm text-slate-400">Enter the email associated with your account and we&apos;ll send a reset link.</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email address</label>
                    <Input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>

                  <Button type="submit" className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white mt-2 shadow-lg shadow-blue-500/20">
                    Send reset link
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <MailCheck className="h-6 w-6 text-emerald-400" />
                </div>
                <h1 className="text-xl font-bold text-white mb-2">Check your email</h1>
                <p className="text-sm text-slate-400 leading-relaxed">
                  We&apos;ve sent password reset instructions to <span className="text-slate-200">{email || 'your email address'}</span>.
                </p>
              </div>
            )}
            <p className="mt-6 pt-6 border-t border-[#1E2235] text-center text-sm text-slate-400">
              Remembered your password?{' '}
              <Link href="/sign-in" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </SlideUp>
    </AuthLayout>
  );
}
