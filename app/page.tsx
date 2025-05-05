"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export default function Home() {
  const router = useRouter();

  const handleGuestMode = () => {
    // Set cookie for guest mode
    setCookie('guestMode', 'true', { maxAge: 60 * 60 * 24 }); // 24 hours
    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.svg"
            alt="Creator AI Logo"
            width={120}
            height={120}
            className="h-auto w-auto"
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to Creator AI
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Your platform for creating amazing AI-powered content
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-y-4 sm:gap-x-6">
          <Link href="/sign-in">
            <Button className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90">
              Sign In
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm border-primary text-primary hover:bg-primary/10"
            onClick={handleGuestMode}
          >
            Continue as Guest
          </Button>
        </div>
        <div className="mt-6">
          <Link
            href="/sign-up"
            className="text-sm font-semibold leading-6 text-primary hover:text-primary/90"
          >
            Create an account <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
