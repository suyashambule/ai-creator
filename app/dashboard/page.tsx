"use client"
import { ArrowLeft } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import SearchComponent from './_components/SearchComponent'
import TemplateListSection from './_components/TemplateListsection'
import { Button } from '@/components/ui/button'
import GuestModeIndicator from './_components/GuestModeIndicator'
import { getCookie } from 'cookies-next'

export default function Dashboard() {
  const [searchInput, setSearchInput] = useState("");
  const [isGuestMode, setIsGuestMode] = useState(false);
  
  useEffect(() => {
    // Check for guest mode cookie on client side
    const guestMode = getCookie('guestMode') === 'true';
    setIsGuestMode(guestMode);
  }, []);
  
  const handleSearch = (value: string) => {
    setSearchInput(value);
  };
  
  return (
    <div className="p-4">
      <Link href="/" className="inline-block mb-4">
        <Button size="sm" variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </Link>
      
      {isGuestMode && <GuestModeIndicator />}
      
      <SearchComponent onSearchInput={handleSearch} />
      <TemplateListSection userSearchInput={searchInput} />
    </div>
  )
}