"use client"

import React, { useState } from 'react'
import SearchComponent from './_components/SearchComponent'
import TemplateListSection from './_components/TemplateListsection'

export default function Dashboard() {
  const [searchInput, setSearchInput] = useState("");
  
  const handleSearch = (value: string) => {
    setSearchInput(value);
  };
  
  return (
    <div>
      {/* Empty dashboard */}
      <SearchComponent onSearchInput={handleSearch} />
      <TemplateListSection userSearchInput={searchInput} />
    </div>
  )
}
