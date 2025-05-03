"use client"
import React, { use } from "react"; // Add 'use' import
import templatesList from "@/app/(data)/Template";
import FormSection from "../_components/FormSection";
import { TEMPLATE } from "../../_components/TemplateListsection";
import Template from "@/app/(data)/Template";
import OutputSection from "../_components/OutputSection";
import { ArrowLeft } from 'lucide-react'; // Import the back arrow icon
import Link from 'next/link'; // Import Link for navigation
import { Button } from "@/components/ui/button"; // Import your Button component

interface PROPS {
    params: Promise<{ // Change to Promise type
        'template-slug': string
    }>
}

export default function Page({ params }: PROPS) {
    // Unwrap the params promise
    const unwrappedParams = use(params);
    
    const selectedTemplate = Template.find(
        (item) => item.slug === unwrappedParams['template-slug'] // Use unwrapped params
    );
    const GeneratedAIcontent=(formData:any)=>{
        
    }

    return (
        <div>
            <div>
            <Link href="/dashboard" className="inline-block">
                <Button variant="ghost" size="sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Templates
                </Button>
            </Link>
            </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
    
            
            <FormSection selectedTemplate={selectedTemplate} userFormInput={(v:any)=>console.log(v)} />
            <div className="col-span-2">
                <OutputSection />
            </div>
        </div>
        </div>
    );
}