"use client"
import { ArrowLeft } from 'lucide-react'
import React, { useState } from 'react'
import Link from 'next/link'
import SearchComponent from './_components/SearchComponent'
import TemplateListSection from './_components/TemplateListsection'
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  const [searchInput, setSearchInput] = useState("");
  
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
      
      <SearchComponent onSearchInput={handleSearch} />
      <TemplateListSection userSearchInput={searchInput} />
    </div>
  )
}