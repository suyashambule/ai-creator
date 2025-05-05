"use client";

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function GuestModeIndicator() {
  const router = useRouter();

  const handleExitGuestMode = () => {
    // Remove guest mode cookie
    deleteCookie('guestMode');
    // Redirect to home page
    router.push('/');
  };

  const handleSignUp = () => {
    // Remove guest mode cookie before redirecting to sign up
    deleteCookie('guestMode');
    // Redirect to sign up page
    router.push('/sign-up');
  };

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-medium text-amber-800">You're browsing in Guest Mode</h3>
          <p className="text-sm text-amber-700 mt-1">
            Your content and preferences won't be saved after this session.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90"
              onClick={handleSignUp}
            >
              Create Account
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-amber-700 border-amber-300 hover:bg-amber-100"
              onClick={handleExitGuestMode}
            >
              Exit Guest Mode
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 