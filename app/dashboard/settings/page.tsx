"use client";

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useUser } from "@clerk/nextjs";
import { loadPreferences, savePreferences, UserPreferences } from "@/lib/preferences";
import { useToast } from "@/components/ui/use-toast";
import { getCookie } from "cookies-next";

export default function SettingsPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [apiKey, setApiKey] = useState("sk-*****************************");
  
  // Form state
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [preferences, setPreferences] = useState<UserPreferences>({
    notificationsEnabled: true,
    darkMode: false,
    language: 'en'
  });

  // Load saved preferences on mount
  useEffect(() => {
    const savedPreferences = loadPreferences();
    setPreferences(savedPreferences);
    
    // Check if in guest mode
    const guestMode = getCookie('guestMode') === 'true';
    setIsGuestMode(guestMode);

    // Set initial name and bio
    if (user) {
      setName(user.fullName || "");
      // Bio would typically be loaded from your database
    }
  }, [user]);

  const handlePreferenceChange = <K extends keyof UserPreferences>(
    key: K, 
    value: UserPreferences[K]
  ) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveProfile = () => {
    // In a real app, you would save to your database
    if (isGuestMode) {
      toast({
        title: "Guest Mode Active",
        description: "Profile changes cannot be saved in guest mode. Create an account to save changes.",
        variant: "destructive"
      });
      return;
    }

    // Save to user profile via Clerk or your backend
    toast({
      title: "Profile Saved",
      description: "Your profile information has been updated.",
      variant: "default"
    });
  };

  const handleSavePreferences = () => {
    if (isGuestMode) {
      toast({
        title: "Guest Mode Active",
        description: "Preferences will be saved for this session only. Create an account for permanent settings.",
        variant: "default"
      });
    }
    
    // Save preferences to localStorage
    savePreferences(preferences);
    
    toast({
      title: "Preferences Saved",
      description: "Your preferences have been updated successfully.",
      variant: "default"
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-1">Settings</h1>
      <p className="text-gray-500 mb-6">Manage your account settings and preferences</p>
      
      {isGuestMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-amber-800">You're in Guest Mode</h3>
          <p className="text-sm text-amber-700 mt-1">
            Settings will only be saved for this session. Create an account to save permanently.
          </p>
        </div>
      )}
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile details here</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user?.primaryEmailAddress?.emailAddress || "guest@example.com"} readOnly />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell us about yourself" 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={handleSaveProfile}
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* API Keys Tab */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">Your API Key</Label>
                <div className="flex space-x-2">
                  <Input id="api-key" value={apiKey} readOnly className="flex-1" />
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setApiKey("sk-" + Math.random().toString(36).substring(2, 15));
                      toast({
                        title: "API Key Regenerated",
                        description: "Your new API key has been generated.",
                        variant: "default"
                      });
                    }}
                  >
                    Regenerate
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigator.clipboard.writeText(apiKey);
                      toast({
                        title: "Copied",
                        description: "API key copied to clipboard",
                        variant: "default"
                      });
                    }}
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">Keep this key secret! It provides full access to your account.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive email notifications about your account</p>
                </div>
                <Switch 
                  checked={preferences.notificationsEnabled} 
                  onCheckedChange={(checked) => handlePreferenceChange('notificationsEnabled', checked)} 
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-gray-500">Toggle between light and dark themes</p>
                </div>
                <Switch 
                  checked={preferences.darkMode}
                  onCheckedChange={(checked) => handlePreferenceChange('darkMode', checked)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <select 
                  id="language" 
                  className="w-full p-2 border rounded-md bg-white"
                  value={preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={handleSavePreferences}
              >
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 