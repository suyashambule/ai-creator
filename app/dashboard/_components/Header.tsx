"use client";

import { UserButton, useUser } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

function Header() {
  const { isLoaded, user } = useUser();
  const [isGuestMode, setIsGuestMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for guest mode cookie on client side
    const guestMode = getCookie('guestMode') === 'true';
    setIsGuestMode(guestMode);
  }, []);

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
    <div className='p-5 shadow-sm border-b-2 bg-white flex justify-between items-center'>
      <div className='flex gap-2 items-center
       p-2 border rounded-md max-w-lg bg-white'>
        <Search/>
        <input type='text' placeholder='Search...'
        className='outline-none'
        />
      </div>
      <div className='flex gap-5 items-center'>
        {isGuestMode ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="/guest-avatar.png" alt="Guest" />
                <AvatarFallback>GU</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Guest User</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignUp}>
                Create Account
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExitGuestMode}>
                Exit Guest Mode
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <UserButton />
        )}
      </div>
    </div>
  )
}

export default Header