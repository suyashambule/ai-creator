import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
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
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/sign-in">
            <Button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign In
            </Button>
          </Link>
          <Link href="/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
            Dashboard <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
