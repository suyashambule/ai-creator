"use client"

import React, { useState, useEffect } from 'react'
import Header from './_components/Header'
import Sidenav from './_components/Sidenav';

function Layout({
    children,
    }: Readonly<{
    children: React.ReactNode;
}>) {
    // Default to true on larger screens, false on mobile
    const [sidebarVisible, setSidebarVisible] = useState(false);

    // Initialize sidebar state based on screen size when component mounts
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setSidebarVisible(true);
            } else {
                setSidebarVisible(false);
            }
        };

        // Set initial state
        handleResize();

        // Listen for window resize events
        window.addEventListener('resize', handleResize);
        
        // Clean up event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setSidebarVisible(prevState => !prevState);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div 
            >
                <Sidenav/>
            </div>
            
            {/* Main content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header  />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {children}
                </main>
            </div>
            
            {/* Overlay for mobile */}
            {sidebarVisible && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </div>
    )
}

export default Layout;
